'use client'
import Link from "next/link"
import InputWithLabel from "../components/InputWithLabel"
import { FormEvent, useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { createUserWithEmailAndPassword, getAuth, updateProfile } from "firebase/auth"
import { app, db } from "@/config/firebaseConfig"
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"
import { addDoc, collection } from "firebase/firestore"

interface valueProps {
  password: string,
  email: string,
  displayName: string,
  img: any
}

const page = () => {
  
    const { toast } = useToast();
    const auth = getAuth(app);
  
    const [value, setValue] = useState<valueProps>({
        password: '',
        email: '',
        displayName: '',
        img: ''
    })
    const [loading, setLoading] = useState(false);

    const handleChange = (e: any) => {
        setValue(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleChangeImage = (e: any) => {
        setValue(prev => ({
            ...prev,
            img: e.target.files[0]
        }))
    }
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if(!value.password.trim() || !value.img || !value.email.trim() || !value.displayName.trim()){
            toast({
                description: 'One entry is empty.',
                variant: 'destructive',
            })
            return;
        }
        setLoading(true)

        createUserWithEmailAndPassword(auth, value.email, value.password)
        .then((userCredential) => {
          const user = userCredential.user;
          const UploadFile = (URL: any) => {
  
            const storage = getStorage();
            const storageRef = ref(storage, URL);
            
            const uploadTask = uploadBytesResumable(storageRef, URL?.name);
            
            uploadTask.on('state_changed', 
              (snapshot) => {
            
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                  case 'paused':
                    console.log('Upload is paused');
                    break;
                  case 'running':
                    console.log('Upload is running');
                    break;
                }
              }, 
              (error) => {
                
              }, 
              () => {
                getDownloadURL(uploadTask.snapshot.ref)
                .then( (downloadURL: any) => {
                    updateProfile(userCredential.user, {
                      displayName: value.displayName,
                      photoURL: downloadURL
                    })
                    .then(
                      async ()=>{
                        const docRef = await addDoc(collection(db, 'users'), {
                          email: value.email,
                          displayName: value.displayName,
                          photoURL: downloadURL,
                          active: false,
                          uid: user.uid
                        });
                        if(docRef.id){
                          setLoading(false)
                          toast({
                            description: 'Account created successfully.',
                            variant: 'default',
                          })
                        }
                      
                      }
                    )
                });
              }
            );
            }

            UploadFile(value.img)

        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setLoading(false)
          toast({
            description: 'Please, sign up again',
            variant: 'destructive'
          })
        });
      }
  return (
    <div className="border shadow-md flex min-h-full flex-1 flex-col justify-center px-6 py-5 mt-5 lg:px-8 sm:mx-auto sm:w-full sm:max-w-sm">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Sign up
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
                    <div className="mb-3"/>
                    <InputWithLabel 
                        type="text"
                        onChange={handleChange}
                        labelText="Display name"
                        placeholder="Enter your name"
                        id="displayName"
                        value={value.displayName}
                        name="displayName"
                    />
                    <div className="mb-3"/>
                    <InputWithLabel 
                        type="file"
                        onChange={handleChangeImage}
                        labelText="Profile thumbnail"
                        placeholder=""
                        id="img"
                        // value={value.img}
                        name="img"
                        accept="image/*"
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
                    Sign up
                  </button>
                </div>
              </form>
    
              <p className="mt-10 text-center text-sm text-gray-500">
                Have an account?{' '}
                <Link href="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                  login here
                </Link>
              </p>
            </div>
          </div>
  )
}

export default page