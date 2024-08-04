'use client';
import { useEffect, useState } from "react";
import Form from "./components/Form"
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import { formatDate } from "@/lib/formatDate";
import Image from "next/image";


const Page = ({ params } : {
    params: {
        id: string
    }
}) => {

    const [data, setData] = useState<any>(null)
    // console.log(data.dueDate)
    // console.log(formatDate(data.dueDate))
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
        <h1 className="text-[#444] text-[15.84px] font-bold">{data?.title}</h1>
        <h2>By: {data?.assignedBy.displayName}</h2>
        <h3 className="text-[#999] text-[15.84px]">Project due by {formatDate(data?.dueDate)}</h3>
       {/* <div className="mt-5 border-t border-t-[#eee] flex pt-5"> */}
        <h5>{data?.description}</h5>
       {/* </div> */}
       <h5>Project is assigned to:</h5>
       <h6>
        {data?.assignedTo.map((item: any, id: number) =>(
            <Image key={id} src={item.photoURL} height={50} width={50} alt=""/>
        ))}
       </h6>
    </div>
    <Form id={params.id}/>
    </div>
  )
}

export default Page