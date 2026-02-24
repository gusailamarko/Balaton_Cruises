// @deno-types="https://esm.sh/stripe@14.25.0/types/index.d.ts"
import Stripe from "stripe";
import { serve } from "std/http/server";
import { createClient } from "@supabase/supabase-js";

// Supabase client
const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, {
  apiVersion: "2023-10-16",
});

serve(async (req: Request) => {
  try {
    const payload = await req.text();
    const sig = req.headers.get("stripe-signature")!;
    const endpointSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET")!;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    } catch (err) {
      return new Response(`Webhook Error: ${(err as Error).message}`, { status: 400 });
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      // booking_id metadata’dan al
      const bookingId = session.metadata?.reservationId;

      if (bookingId) {
        await supabase
          .from("bookings")
          .update({
            stripe_session_id: session.id,
            stripe_payment_intent: session.payment_intent,
            status: "confirmed",
          })
          .eq("id", bookingId);
      }
    }

    return new Response(JSON.stringify({ received: true }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response("Internal error", { status: 500 });
  }
});