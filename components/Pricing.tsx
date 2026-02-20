import PriceCard from "./PriceCard"
import CTAButton from "./CTAButton"
import { PriceCardTexts } from "~/constants/texts"

const Pricing = () => {
  return (
    <div className="pricing-content py-10 text-black">
        <h2 className="text-center text-[3rem] font-bold italic mb-5">PRICING & PACKAGES</h2>
        <div className="flex justify-center w-full mb-5">
          <div className="priceCardsScroll flex justify-start xl:justify-center w-[80%] gap-3 overflow-x-auto px-4">
            {PriceCardTexts.map((card: any, index: number) => (
                <PriceCard key={index} packageName={card.packageName} condition={card.condition} seasons={card.seasons} mainSeasonPrices={card.mainSeasonPrices} offSeasonPrices={card.offSeasonPrices} packageDesc={card.packageDesc} />
            ))}
          </div>
        </div>
        <h3 className="text-center font-semibold text-gray-800 uppercase italic text-[1.5rem]">The price includes round-trip transfer between Budapest and Balatonkenese!</h3>
        <div className="flex flex-col items-center mt-10">
            <h2 className="text-center text-[2rem] font-bold italic mb-5 w-[70%]">One Lake. One Day. Endless Memories. Discover Lake Balaton the way it deserves to be experienced.</h2>
            <CTAButton />
        </div>
    </div>
  )
}

export default Pricing