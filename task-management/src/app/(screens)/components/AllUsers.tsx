import IndividualUser from "./IndividualUser"

const AllUsers = () => {
  return (
    <div className="w-[250px] min-w-[250px] bg-[#fbfbfb] p-[30px]">
        <h1 className="text-[21.12px] font-bold text-[#444] mb-10">All Users</h1>
       <div>
        <IndividualUser 
                name="Drignet"
                isActive
                src="/n.jpg"
            />
             <IndividualUser 
                name="Drignet"
                isActive
                src="/n.jpg"
            />
             <IndividualUser 
                name="Drignet"
                isActive={false}
                src="/n.jpg"
            />
       </div>
    </div>
  )
}

export default AllUsers