import Image from "next/image"

const IndividualUser = ({ src, name, isActive } : {
    src: string,
    name: string,
    isActive: boolean
}) => {
  return (
    <div className="mb-3 flex items-center justify-center">
        {isActive && <div className="h-2.5 w-2.5 bg-green-600 rounded-full"/>}
        <h2 className="mx-2">{name}</h2>
        <Image 
            height={50}
            width={50}
            src={src}
            alt={`${name} image`}
            className="rounded-full"
        />
    </div>
  )
}

export default IndividualUser