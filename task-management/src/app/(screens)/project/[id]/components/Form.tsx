import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { db } from "@/config/firebaseConfig"
import { useAuthContextProvider } from "@/context/AuthContext"
import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { FormEvent, useState } from "react"

const Form = ({ id } : {
    id: string
}) => {
    const user = useAuthContextProvider();
    const [comment, setComment] = useState<string>('');
    const { toast } = useToast()
    const handleChange = (e: any) => {
      setComment(e.target.value)
    }

    const handleSubmit = async (e: FormEvent) => {
      e.preventDefault()
      const docRef = await addDoc(collection(db, 'comments'), {
        postId: id,
        comment,
        posterName: user.user?.displayName,
        timestamp: serverTimestamp(),
      });
      if(docRef.id){
        toast({
          description: 'Comment added successfully',
          variant: 'default',
        })
      }
    }

  return (
    <form onSubmit={handleSubmit}>
        <label className="text-[17.6px]" htmlFor="comment">Add new comment:</label>
        <Textarea className="block" value={comment} onChange={handleChange} id="comment"/>
        <br />
        <Button className="block text-[#8d69f1] bg-[#fff] border border-[#8d69f1] hover:bg-[#8d69f1] hover:text-[#fff] text-[17.6px] font-normal">Add Comment</Button>
    </form>
  )
}

export default Form