'use client';
import { useEffect, useState } from "react"
import IndividualUser from "./IndividualUser"
import { db } from "@/config/firebaseConfig"
import { collection, onSnapshot, query, where } from "firebase/firestore"
import { useAuthContextProvider } from "@/context/AuthContext"

const AllUsers = () => {
  const myUid = useAuthContextProvider();
  const [data, setData] = useState<any[]>([]);
  // console.log(data)
  useEffect(()=>{
    const users = query(collection(db, 'users'), where('uid', '!=', myUid.user?.uid)) 
    let isUnsubscribed = false;
    
    const unsub = onSnapshot(users, (result)=>{
        if (isUnsubscribed) return;
        
        const dataa = result.docs.map(item => ({...item.data(), id: item.id}));
        // console.log(dataa)
        setData(dataa)
    })
    return () => {
        isUnsubscribed = true;
    }
  }, [])
  return (
    <div className=" bg-[#fbfbfb] p-[30px]">
        <h1 className="text-[21.12px] font-bold text-[#444] mb-10">All Users</h1>
       <div className="">
        {
          data?.map((person, id) => (
            <IndividualUser 
              key={id}
              name={person?.displayName}
              isActive={person?.active}
              src={person?.photoURL}
            />
          ))
        }
       </div>
    </div>
  )
}

export default AllUsers