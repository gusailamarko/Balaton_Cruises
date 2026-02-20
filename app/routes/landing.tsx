import { heroTexts, BoatText, InfoTexts } from "~/constants/texts";
import { Footer, Pricing, Info, Ship, Stops, RouteItinerary, Experience, Hero } from "../../components";
import { useEffect } from "react";
import { setMetaTag } from "~/lib/utils";

const landing = () => {
  useEffect(() => {
      setMetaTag("Balaton Cruises", "Discover Hungary’s most beautiful lake in one unforgettable day", "/icons/favicon.webp");
    }, []);

  return (
    <main>
        <Hero title={heroTexts.title} subtitle={heroTexts.subtitle}/>
        <Experience />
        <RouteItinerary/>
        <Stops />
        <Ship title={BoatText.title} subtitle={BoatText.subtitle} details={BoatText.details} motto={BoatText.motto}/>
        <div className="practicalInfo-section py-20">
            {InfoTexts.map((info, index) => (
              <Info key={index} title={info.title} content={info.content}></Info>
            ))}
        </div>
        <Pricing />
        <Footer />
    </main>
  )
}

export default landing