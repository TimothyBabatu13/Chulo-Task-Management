'use client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { db } from "@/config/firebaseConfig"
import { useAuthContextProvider } from "@/context/AuthContext"
import { addDoc, collection, onSnapshot, or, query, serverTimestamp, where } from "firebase/firestore"
import { FormEvent, useEffect, useState } from "react"


const Form = ({ id } : {
    id: string
}) => {
    const [recipientUrl, setRecipientURL] = useState<any>('')
    const [text, setText] = useState('');
    const { toast } = useToast();
    const userr = useAuthContextProvider();
    console.log(recipientUrl)
    useEffect(() => {
         const users = query(collection(db, 'users'), where('uid', '==', id)) 
        let isUnsubscribed = false;
        
        const unsub = onSnapshot(users, (result: any)=>{
            if (isUnsubscribed) return;
            
            const dataa = result.docs.map((item : any) => ({...item.data(), id: item.id}));
            setRecipientURL(dataa[0].photoURL)
        })  
        return () => {
            isUnsubscribed = true;
        }
    }, [])

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if(!text || !text.trim()){
            toast({
                description: 'Please input something',
                variant: 'destructive'
            })
            return;
        }
        const sendMessage = async () => {
            const docRef = await addDoc(collection(db, 'messages'), {
                text,
                senderId: userr.user?.uid,
                receiverId: id,
                senderURL: userr.user?.photoURL,
                receiverURL: recipientUrl,
                timestamp: serverTimestamp(),
              });
              if(docRef.id){
                setText('')
                console.log('successful')
              }
            }
            sendMessage()
    }
  return (
    <form onSubmit={handleSubmit} className="flex">
        <Input value={text} onChange={(e)=> setText(e.target.value)}/>
        <Button>Send</Button>
    </form>
  )
}

export default Form