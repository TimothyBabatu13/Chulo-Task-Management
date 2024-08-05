'use client';
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast";
import { app, db } from "@/config/firebaseConfig";
import { useAuthContextProvider } from "@/context/AuthContext";
import { getAuth, signOut } from "firebase/auth";
import { collection, doc, onSnapshot, query, updateDoc, where } from "firebase/firestore";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Header = () => {
  const navigate = useRouter();
  const userrr = useAuthContextProvider();
  const auth = getAuth(app)
  const { toast } = useToast()
  const [loading, setIsLoading] = useState(false);
  const handleClick = ()=> {
    setIsLoading(true);
    const updateDocument = async () => {
      const users = query(collection(db, 'users'), where("uid", '==', userrr.user?.uid)) 
      let isUnsubscribed = false;
      
      // const q = query(collection(db, "your-collection"), orderBy("timestamp"));
      const unsub = onSnapshot(users, async (result)=>{
          if (isUnsubscribed) return;
          const data = result.docs.map(item => item.id)[0];
          console.log(data)
          const docRef = doc(db, 'users', data);
          await updateDoc(docRef, {
            active: false
          }).then(res => {
            console.log('status changed');
            signOut(auth).then(res => {
              setIsLoading(false)
              toast({
                description: 'You have successfully signed out',
                variant: 'default'
              })
              navigate.push('/login')
            })
          }).catch(err => console.log(err))
      })
     
      return () => {
          isUnsubscribed = true;
          // unsubscrib();
      }
     
    }
    updateDocument()
  }
  return (
    <header className="flex items-center justify-between py-[30px] mb-20">
        <h1 className="text-[ 17.6px] font-bold text-[#444]">The Dojo</h1>
        <Button disabled={loading} onClick={handleClick} className="flex items-center text-[#8d69f1] bg-[#fff] border border-[#8d69f1] hover:bg-[#8d69f1] hover:text-[#fff] text-[17.6px] font-normal">{loading && <Loader2 className="h-4 w-4 mr-4 animate-spin"/>}{loading ? "Please wait" : "Log out"}</Button>
    </header>
  )
}

export default Header