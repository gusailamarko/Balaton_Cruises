import { GlanceCardContents } from "~/constants/texts"
import GlanceCard from "./GlanceCard"

const Experience = () => {
  return (
    <div className="w-full bg-white text-black pt-10 pb-10 flex flex-col items-center">
        <div className="experienceIntro mb-10">   
            <div className="expIntroText">
                <div className="mb-5">
                    <h2 className="text-center text-[3rem] font-bold italic">EXPERIENCE</h2>
                    <h3 className="text-center text-[2rem] text-gray-800 mb-2">AT GLANCE</h3>
                    <p className="text-justify leading-loose">Lake Balaton is more than just a lake.
                    It is history, nature, flavors, stories and unforgettable views.
                    Our <b>One-Day Lake Balaton Discovery Cruise</b> is designed for international travelers who want to truly understand and experience Hungary’s most iconic destination – comfortably, effortlessly, and in style.
                    This is not a crowded tour.
                    This is a <b>curated premium experience</b>.
                    </p>
                </div>
                <div className="flex flex-col gap-3 items-center justify-center">
                    <div>
                        <button className="infBtn">Duration: 8 AM - 8 PM</button>
                    </div>
                    <div>
                        <button className="infBtn">Departure & Return: Balatonkenese</button>
                    </div>
                </div>
            </div>
        </div>
        <div className="cardContainer">
            {GlanceCardContents.map((card, index) => (
                <GlanceCard key={index} img={card.img} alt={card.alt} caption={card.caption} />
            ))}
        </div>
    </div>
  )
}

export default Experience