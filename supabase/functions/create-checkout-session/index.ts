// @deno-types="https://esm.sh/stripe@14.25.0/types/index.d.ts"
import Stripe from "stripe";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, {
  apiVersion: "2023-10-16",
});

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { amount, reservationId, customer_email } = body;
    const siteUrl = Deno.env.get("SITE_URL")!;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: customer_email,
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: "Boat Reservation",
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      success_url: `${siteUrl}/success`,
      cancel_url: `${siteUrl}/cancel`,
      metadata: {
        reservationId,
      },
    });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
  console.error("STRIPE ERROR:", err);

  return new Response(
    JSON.stringify({
      error: err instanceof Error ? err.message : String(err),
    }),
    {
      status: 500,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    }
  );
}
});