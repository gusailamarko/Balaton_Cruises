import { ItineraryTexts } from "~/constants/texts"
import ItineraryCard from "./ItineraryCard"

const RouteItinerary = () => {
  return (
    <div className="itinerary-content">
      <h2 className="text-center text-black text-[3rem] font-bold italic py-[2rem]">ROUTE & ITINERARY</h2>
      <div className="route">
        <img className="route-map" src="/images/Route.gif" alt="Route starting and ending at Balatonkenese"/>
        <p className="text-center text-black font-bold italic text-[0.7rem]">Balatonkenese - Tihany - Siófok - Balatonfüred - Balatonkenese</p>
      </div>
      <div className="itinerary mt-10 mb-10">
        {ItineraryTexts.map((part, index) => (
          <ItineraryCard key={index} timeAndActivity={part.timeAndActivity} details={part.details} background={part.background} when={part.when}/>
        ))}
      </div>
    </div>
  )
}

export default RouteItinerary