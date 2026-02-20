const Info = ({title, content}:PracticalInfoProps) => {
  return (
    <div className="infoCard w-[80%] md:w-[30%]">
        <h2 className="text-center text-[1.5rem] font-bold italic mb-3">{title}</h2>
        <ul>
            {content.map((info:string, index:number) => (
                <li className="italic text-[1rem] text-gray-800 font-bold" key={index}>- {info}</li>
            ))}
        </ul>
    </div>
  )
}

export default Info