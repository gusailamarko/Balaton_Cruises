import CTAButton from "./CTAButton"

const Hero = (heroTexts:HeroProps) => {
  return (
    <div className="heroBg">
        <div className="heroTexts bg-gray-200/70">
            <h1 className="text-center text-[1.5rem] italic uppercase font-bold mb-3">{heroTexts.title}</h1>
            <h2 className="text-center text-[0.7rem] italic uppercase md:text-base font-semibold text-gray-800 mb-2">{heroTexts.subtitle}</h2>
            <div className="h-[10rem] md:h-[20rem] video-content my-5">
              <video className="h-auto md:h-[100%] object-contain md:object-cover" src="/other/Balaton_Cruises_Trailer.mp4" autoPlay muted playsInline loop controls/>
            </div>
            <CTAButton />
        </div>
    </div>
  )
}

export default Hero