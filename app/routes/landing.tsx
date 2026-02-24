import { heroTexts, BoatText, InfoTexts } from "~/constants/texts";
import {
  Footer,
  Pricing,
  Info,
  Ship,
  Stops,
  RouteItinerary,
  Experience,
  Hero,
} from "../../components";
import { useEffect, useState } from "react";
import { setMetaTag } from "~/lib/utils";
import AdminLogin from "../../components/AdminLogin";
import AdminDashboard from "../../components/AdminDashboard";
import { supabase } from "~/lib/supabase";

const Landing = () => {
  // Metadata
  useEffect(() => {
    setMetaTag(
      "Balaton Cruises",
      "Discover Hungary’s most beautiful lake in one unforgettable day",
      "/icons/favicon.webp"
    );
  }, []);

  // Admin route ve auth state
  const [isAdminRoute, setIsAdminRoute] = useState<boolean>(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.pathname === "/admin") {
      setIsAdminRoute(true);

      supabase.auth.getUser().then(({ data }) => {
        if (data.user) {
          setIsAdminAuthenticated(true);
        }
      });
    }
  }, []);

  // Admin panel render
  if (isAdminRoute) {
    return isAdminAuthenticated ? (
      <AdminDashboard />
    ) : (
      <AdminLogin onLoginSuccess={() => setIsAdminAuthenticated(true)} />
    );
  }

  // Normal landing page render
  return (
    <main>
      <Hero title={heroTexts.title} subtitle={heroTexts.subtitle} />
      <Experience />
      <RouteItinerary />
      <Stops />
      <Ship
        title={BoatText.title}
        subtitle={BoatText.subtitle}
        details={BoatText.details}
        motto={BoatText.motto}
      />
      <div className="practicalInfo-section py-20">
        {InfoTexts.map((info, index) => (
          <Info key={index} title={info.title} content={info.content} />
        ))}
      </div>
      <Pricing />
      <Footer />
    </main>
  );
};

export default Landing;