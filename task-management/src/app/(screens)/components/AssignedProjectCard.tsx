import Image from "next/image"

const AssignedProjectCard = ({ name, deadline, assignedTo} : {
    name: string,
    deadline: any,
    assignedTo: {
        img: string,
        name: string
    }[]

}) => {
  return (
    <div className="p-3 shadow-lg border m-2">
        <h1>{name}</h1>
        <h3>Due by: {deadline}</h3>
        <div className="h-[1px] w-full border-b border-b-black"/>
       <div className="flex py-5">
        {
                assignedTo.map((person, id) => (
                    <Image width={50} height={50} className="rounded-full" src={person.img} alt={person.name}/>
                ))
            }
       </div>
    </div>
  )
}

export default AssignedProjectCard