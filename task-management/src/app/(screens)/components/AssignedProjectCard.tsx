import Image from "next/image"
import { useRouter } from "next/navigation"

const AssignedProjectCard = ({ name, deadline, assignedTo, id} : {
    name: string,
    id: string,
    deadline: any,
    assignedTo: {
      photoURL: string,
        displayName: string
    }[]

}) => {
  const navigate = useRouter();
  
  const handleNavigate = (id: string) => {
    navigate.push(`/project/${id}`)
  }
  const handleHover = (id: string) => {
    navigate.prefetch(`/project/${id}`);
  }
  return (
    <div onMouseOver={()=>handleHover(id)} onClick={()=>handleNavigate(id)} style={{boxShadow: '3px 3px 5px rgba(0, 0, 0, .05)'}} className=" cursor-pointer p-4 bg-[#fff] rounded-[6px] border m-2">
        <h1 className="text-[#444] text-[15.84px] font-bold">{name}</h1>
        <h3 className="text-[#999] text-[15.84px]">Due by: {deadline}</h3>
       <div className="mt-5 border-t border-t-[#eee] flex pt-5">
        {
                assignedTo.map((person, id) => (
                    <Image key={id} width={30} height={30} className="rounded-full mr-2.5" src={person.photoURL} alt={person.displayName}/>
                ))
            }
       </div>
    </div>
  )
}

export default AssignedProjectCard