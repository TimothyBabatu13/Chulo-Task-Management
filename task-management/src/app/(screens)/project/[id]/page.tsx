'use client';
import { useEffect, useState } from "react";
import Form from "./components/Form"
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import { formatDate } from "@/lib/formatDate";
import Image from "next/image";
import GetComments from "./components/GetComments";
import { useAuthContextProvider } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";



const Page = ({ params } : {
    params: {
        id: string
    }
}) => {

    const [data, setData] = useState<any>(null)
    const userrr = useAuthContextProvider();
    // console.log(data?.dueDate)
    // console.log(formatDate(data?.dueDate))
    useEffect(()=>{
        const get = async () => {
            const docRef = doc(db, "projects", params.id);
            const docSnap = await getDoc(docRef)
            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
                setData(docSnap.data());
              } else {
                // docSnap.data() will be undefined in this case
                // console.log("No such document!");
              }
        }
        get()
    } , [])
  return (
    <div>
        <div style={{boxShadow: '3px 3px 5px rgba(0, 0, 0, .05)'}} className=" cursor-pointer p-4 bg-[#fff] rounded-[6px] border m-2">
        <h1 className="text-[#444] text-[17.65px] font-bold">{data?.title}</h1>
        <h2 className="text-[17.6px]">By: {data?.assignedBy.displayName}</h2>
        <h3 className="my-2.5 text-[15.84px]">Project due by {formatDate(data?.dueDate)}</h3>
       {/* <div className="mt-5 border-t border-t-[#eee] flex pt-5"> */}
        <h5 className="my-[30px] text-[15.84px] text-[#999]">{data?.description}</h5>
       {/* </div> */}
       <h5 className="text-[15.84px] font-bold text-[#999]">Project is assigned to:</h5>
       <h6>
        {data?.assignedTo.map((item: any, id: number) =>(
            <Image key={id} src={item.photoURL} className="w-[50px] h-[50px] rounded-full" height={50} width={50} alt=""/>
        ))}
       </h6>
       {data?.assignedBy.uid === userrr.user?.uid ? <Button>Mark as complete</Button>: ''}
    </div>
    <GetComments id={params.id}/>
    <Form id={params.id}/>
    </div>
  )
}

export default Page