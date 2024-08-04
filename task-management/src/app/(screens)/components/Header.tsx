'use client';
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast";
import { app, db } from "@/config/firebaseConfig";
import { useAuthContextProvider } from "@/context/AuthContext";
import { getAuth, signOut } from "firebase/auth";
import { collection, doc, onSnapshot, query, updateDoc, where } from "firebase/firestore";
import { useRouter } from "next/navigation";

const Header = () => {
  const navigate = useRouter();
  const userrr = useAuthContextProvider();
  const auth = getAuth(app)
  const { toast } = useToast()

  const handleClick = ()=> {
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
        <Button onClick={handleClick} className="block text-[#8d69f1] bg-[#fff] border border-[#8d69f1] hover:bg-[#8d69f1] hover:text-[#fff] text-[17.6px] font-normal">Log out</Button>
    </header>
  )
}

export default Header