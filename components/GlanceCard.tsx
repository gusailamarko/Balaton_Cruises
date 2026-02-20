const GlanceCard = ({ img, alt, caption }: GlanceCardProps) => {
  return (
    <figure className="glanceCard">
        <div className="imgBox">
            <img src={img} alt={alt} />
        </div>
        <figcaption className="text-xs md:text-base text-center font-semibold py-2">{caption}</figcaption>
    </figure>
  )
}

export default GlanceCard