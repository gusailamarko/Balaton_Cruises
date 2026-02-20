const ItineraryCard = ({timeAndActivity, details, background, when}:ItineraryCardProps) => {
  return (
    <div className="itineraryCard w-[350px] md:w-[400px]" style={{backgroundImage: `url(${background})`}}>
        <div className="itineraryCard-content">
            <h3 className="text-center text-black text-[1.5rem] font-bold italic mb-2">{timeAndActivity}</h3>
            <hr className="text-black"/>
            <ul>
                {details.map((detail:any, index:number) => (
                    <li className="itinLI flex items-center gap-2 text-[14px] leading-loose" key={index}>
                        <img src="/icons/Activity.png" className="w-5 h-5 shrink-0" alt="List item tag's symbol"/>
                        <span className="mt-2 font-bold">{detail}</span>
                    </li>
                ))}
            </ul>
            <hr className="text-black my-3 w-full"/>
            <div>
                <p className="text-black font-semibold italic text-center">{when}</p>
            </div>  
        </div>    
    </div>
  )
}

export default ItineraryCard