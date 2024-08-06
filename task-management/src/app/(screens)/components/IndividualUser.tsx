import Image from "next/image"
import { useRouter } from "next/navigation"

const IndividualUser = ({ src, name, isActive, id } : {
    src: string,
    name: string,
    isActive: boolean,
    id: string
}) => {
  const navigate = useRouter();
  const handleClick = () => {
    navigate.push(`/chat/${id}`)
  }
  const handlePrefetch = () => {
    navigate.prefetch(`/chat/${id}`)
  }
  return (
    <div onMouseEnter={handlePrefetch} onClick={handleClick} className="mt-5 flex items-center cursor-pointer justify-center">
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