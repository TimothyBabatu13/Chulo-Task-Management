import Image from "next/image"

const IndividualUser = ({ src, name, isActive } : {
    src: string,
    name: string,
    isActive: boolean
}) => {
  return (
    <div className="mt-5 flex items-center justify-center">
        <div className={`min-h-3 min-w-3 ${isActive ? "bg-[#0ebb50]" : "bg-gray-500"} rounded-full`}/>
        <h2 className="mx-2.5">{name}</h2>
        <Image 
            height={50}
            width={50}
            src={src}
            alt={`${name} image`}
            className="rounded-full w-[50px] h-[50px]"
        />
    </div>
  )
}

export default IndividualUser