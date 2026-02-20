const PriceCard = ({packageName, condition, seasons, mainSeasonPrices, offSeasonPrices, packageDesc}:PriceCardProps) => {
  return (
    <div className="priceCard mb-5">
      <div className="flex flex-col items-center">
        <div className="priceCard-header text-center">
          <h2 className="text-[1.2rem] font-bold">{packageName}</h2>
          <h3 className="text-[0.65rem] font-semibold italic text-gray-800">{condition}</h3>
        </div>
        <hr className="w-full text-black mb-3"/>
        <div className="priceCard-mainseason w-full">
          <h4 className="font-semibold">{seasons[0]}:</h4>
          {Array.isArray(mainSeasonPrices) ? (
            <ul className="list-disc pl-5 space-y-1">
              {mainSeasonPrices.map((p: any, i: number) => (
                <li key={i} className="text-sm">{p}</li>
              ))}
            </ul>
          ) : (
            <p>{mainSeasonPrices}</p>
          )}
        </div>
        <div className="priceCard-offseason w-full text-left mb-2">
          <h4 className="font-semibold">{seasons[1]}:</h4>
          {Array.isArray(offSeasonPrices) ? (
            <ul className="list-disc pl-5 space-y-1">
              {offSeasonPrices.map((p: any, i: number) => (
                <li key={i} className="text-sm">{p}</li>
              ))}
            </ul>
          ) : (
            <p>{offSeasonPrices}</p>
          )}
        </div>
        <hr className="w-full text-black mb-3"/>
        <div className="priceCard-desc">
          <p className="text-[1rem] font-semibold italic text-gray-800">{packageDesc}</p>
        </div>
      </div>
    </div>
  )
}

export default PriceCard