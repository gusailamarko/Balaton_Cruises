import { useState } from "react";
import { StopInfos } from "~/constants/texts";

const Stops = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const images = [
    { src: "/images/Tihany Peninsula.jpg", alt: "Tihany" },
    { src: "/images/Siófok.jpg", alt: "Siófok" },
    { src: "/images/Balatonfüred.webp", alt: "Balatonfüred" }
  ];

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const currentStop = StopInfos[currentIndex];

  return (
    <div className="carousel-content w-full py-[2rem]">
      <div className="carousel-container relative overflow-hidden">
        <h2 className="text-center text-black text-[3rem] font-bold italic mb-3">STOPS</h2>

        <img src={images[currentIndex].src} alt={images[currentIndex].alt} className="w-full h-full object-cover"/>
        
        <button onClick={goToPrevious} className="carousel-prevBtn text-white"
        >←</button>
        
        <button onClick={goToNext} className="carousel-nextBtn text-white"
        >→</button>

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full ${
                index === currentIndex ? "bg-white" : "bg-white bg-opacity-50"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="stop-info text-black px-[20px] mt-10 md:w-[50%]">
        <h2 className="text-[32px] font-bold">{currentIndex + 1}. {currentStop.stopName}</h2>
        <h3 className="text-[18px] md:text-[24px] text-gray-800">{currentStop.desc}</h3>
        <ul>
            {StopInfos[currentIndex].toDos.map((item, index) => (
                <li className="italic flex items-center gap-2 text-[14px]" key={index}>
                    <img src="/icons/Eyacht_list_icon.avif" className="w-5 h-5 shrink-0" alt="List item tag's symbol"/>
                    <span>{item}</span>
                </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Stops;