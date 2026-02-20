const Ship = ({title, subtitle, details, motto}:BoatProps) => {
  return (
    <div className="boat-content text-black py-10 w-full flex flex-col justify-center items-center md:flex-row">
      <div className="w-[90%] md:w-[50%]">
        <h2 className="text-center text-[3rem] font-bold italic">{title}</h2>
        <h3 className="text-center text-[2rem] text-gray-800 mb-2">{subtitle}</h3>
        <ul className="text-center">
          {details.map((detail:string, index:number) => (
            <li key={index}>{detail}</li>
          ))}
        </ul>
        <h3 className="text-center text-[2rem] text-gray-800 mt-2">{motto}</h3>
      </div>

      <div className="w-[90%] md:w-[50%] mt-5">
        <div className="carousel-container-boat relative overflow-hidden w-[100%] md:w-[90%]">
          <video className="h-auto md:h-[100%] object-contain md:object-cover" src="/other/Balaton_Cruises_Boat.mp4" autoPlay muted playsInline loop controls/>
        </div>
      </div>
    </div>
  )
}

export default Ship