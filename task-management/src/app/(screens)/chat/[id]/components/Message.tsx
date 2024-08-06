'use client'
import { db } from "@/config/firebaseConfig";
import { useAuthContextProvider } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import { and, collection, onSnapshot, or, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
// senderId: userr.user?.uid,
//                 receiverId: id,
//                 senderURL: userr.user?.photoURL,
//                 receiverURL
const Message = ({ id } : {
    id: string
}) => {
  const [messages, setMessages] = useState<any[]>([])
  const userrr = useAuthContextProvider();
    useEffect(()=>{
        const users = (collection(db, 'messages')) 
        let isUnsubscribed = false;
        
        const unsub = onSnapshot(users, (result: any)=>{
            if (isUnsubscribed) return;
            
            const dataa = result.docs.map((item : any) => ({...item.data(), id: item.id}));
            console.log(dataa)
            const filteredArray = dataa.filter((datum : any) => (datum.senderId === id && datum. receiverId === userrr.user?.uid) || (datum.senderId === userrr.user?.uid && datum. receiverId === id))
            // const arrOfTime = filteredArray.map((datum: any) => ({
            //   ...datum,
            //   timestamp: datum.timestamp.toDate()
            // }));
            const sortedArray = filteredArray.sort((a : any,b : any) => (a.timestamp - b.timestamp)) //sort array with timestamp
            console.log(sortedArray)
            setMessages(sortedArray)
            // setData(dataa)
        })        
}, [])
  return (
    <div className="overflow-y-auto relative">
        <div className="max-h-[454px] mt-[52px]">
            {messages?.map((message, key) =>(
                <div key={key} className={`flex justify-between mb-5 ${id === message.senderId ? '' : 'flex-row-reverse'}`}>
                  <div className={cn(`text-sm text-[#141414CC] font-normal leading-[22px] py-2.5 pr-2 px-[15px] ${id === message.senderId ? 'w-[259px] bg-[#F7F7F7] rounded-t-[12px] rounded-br-[12px]' : 'w-[315px] bg-[#FEEDE7] rounded-t-[12px] rounded-bl-[12px]'} ${key === messages.length - 1 && 'mb-5'} `)}>{message?.text} </div>
                    <div className="flex-shrink-0 w-[70px]"/>
                </div>
            ))}
            <div className="h-9" />
        </div>
    </div>
  )
}

export default Message