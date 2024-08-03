'use client';
import Loader from '@/components/components/Loader';
import { app } from '@/config/firebaseConfig';
import { AuthContextType } from '@/types/types';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { Context, createContext, useContext, useEffect, useState } from 'react'


const Contextt = createContext<AuthContextType | null >(null)

const AuthContext = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {

    const auth = getAuth(app);
    const [id, setId] = useState<string|null>('');
    const [user, setUser] = useState<User | null>(null);

    useEffect(()=> {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            setUser(user)
            const uid = user.uid;
            // console.log(user)
            // console.log(uid);
            setId(uid);
          } else {
            setId(null)
            console.log("User does not exists")
          }
        });
      return ()=> unsubscribe();
    }, [auth])

    if(id === '') return <Loader />
  return (
    <Contextt.Provider value={{id, setId, user}}>
        {children}
    </Contextt.Provider>
  )
}

export default AuthContext;

export const useAuthContextProvider = () =>{
  const context = useContext(Contextt);
  if(context === null ) {
      throw new Error('using context hook outside it container');
  };
  // console.log(context)
  return context;
} 

