import IndividualUser from "./IndividualUser"

const AllUsers = () => {
  return (
    <div className="w-[30%] bg-red-400">
        <h1>All Users</h1>
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