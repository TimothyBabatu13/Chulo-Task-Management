'use client'
import Link from "next/link"
import InputWithLabel from "../components/InputWithLabel"
import { FormEvent, useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { app } from "@/config/firebaseConfig"
import { collection, doc, getFirestore, onSnapshot, query, updateDoc, where } from "firebase/firestore"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

const Page = () => {
    const [loading, setIsLoading] = useState(false)
    const auth = getAuth(app)
    const db = getFirestore(app)
    const navigate = useRouter()
    const { toast } = useToast();
    const [value, setValue] = useState({
        password: '',
        email: ''
    })

    const handleChange = (e: any) => {
        setValue(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if(!value.password.trim() ||  !value.email.trim()){
            toast({
                description: 'One entry is empty.',
                variant: 'destructive',
            })
            return;
        }

        setIsLoading(true);
        signInWithEmailAndPassword(auth, value.email, value.password)
        .then(user => {
          // console.log(user)
          setIsLoading(false)
          toast({
            description: 'Login successful',
            variant: 'default'
          })
          const updateDocument = async () => {
            const users = query(collection(db, 'users'), where("uid", '==', user.user.uid)) 
            let isUnsubscribed = false;
            
            // const q = query(collection(db, "your-collection"), orderBy("timestamp"));
            const unsub = onSnapshot(users, async (result)=>{
                if (isUnsubscribed) return;
                const data = result.docs.map(item => item.id)[0];
                console.log(data)
                const docRef = doc(db, 'users', data);
                await updateDoc(docRef, {
                  active: true
                }).then(res => {
                  console.log('status changed');
                  navigate.push('/');
                }).catch(err => console.log(err))
            })
           
            return () => {
                isUnsubscribed = true;
                // unsubscrib();
            }
           
          }
          updateDocument()
  //call the function here
    })
        .catch(err =>{
          console.log(err)
          setIsLoading(false)
          toast({
            description: err?.code,
            variant: 'destructive'
          })
        })
    }
  return (
    <div className="border shadow-md flex min-h-full flex-1 flex-col justify-center px-6 py-5 mt-5 lg:px-8 sm:mx-auto sm:w-full sm:max-w-sm">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Login
              </h2>
            </div>
    
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* <EmailInput Onchange={handleChange} value={userDetails.email}/> */}
                <div>
                  <div className="">
                    <InputWithLabel 
                        type="email"
                        onChange={handleChange}
                        labelText="Email"
                        placeholder="Enter your email"
                        id="email"
                        value={value.email}
                        name="email"
                    />
                    <div className="mb-3"/>
                    <InputWithLabel 
                        type="password"
                        onChange={handleChange}
                        labelText="Password"
                        placeholder="Enter your password"
                        id="password"
                        value={value.password}
                        name="password"
                    />
                  </div>
                  <div className="mt-2">
                   {/* <PasswordInput Onchange={handleChange} value={userDetails.password}/> */}
                  </div>
                </div>
    
                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className={`flex items-center w-full justify-center rounded-md  ${loading ? 'bg-indigo-500' : 'bg-indigo-600'} px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                  >
                    {loading && <Loader2 className='h-4 w-4 animate-spin mr-2'/>}
                    {loading ? "Please wait.." : 'Sign in'}
                  </button>
                </div>
              </form>
    
              <p className="mt-10 text-center text-sm text-gray-500">
                Not a member?{' '}
                <Link href="/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                  signup here
                </Link>
              </p>
            </div>
          </div>
  )
}

export default Page