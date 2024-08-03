'use client'
import Link from "next/link"
import InputWithLabel from "../components/InputWithLabel"
import { FormEvent, useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { app } from "@/config/firebaseConfig"

const Page = () => {
    const loading = false
    const auth = getAuth(app)
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

        signInWithEmailAndPassword(auth, value.email, value.password)
        .then(user => {
          console.log(user)
          toast({
            description: 'Login successful',
            variant: 'default'
          })
        })
        .catch(err =>{
          console.log(err)
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
                    disabled={false}
                    className={`flex w-full justify-center rounded-md  ${loading ? 'bg-indigo-500' : 'bg-indigo-600'} px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                  >
                    Sign in
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