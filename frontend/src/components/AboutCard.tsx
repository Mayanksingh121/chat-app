const AboutCard = ({data}: {data:IAboutCard}) => {
  return (
    <div className="p-4 flex flex-col gap-4 border backdrop-blur-4xl shadow-lg border-blue-100/10 rounded-lg bg-blue-500/10">
        <p className="text-white font-alt">{data.heading}</p>
        <p className="text-[#b3bcca] font-body tracking-wider">{data.content}</p>
    </div>
  )
}

export default AboutCard;