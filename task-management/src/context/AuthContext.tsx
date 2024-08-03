'use client';
import Loader from '@/components/components/Loader';
// import { useContextHook } from '@/utils/useContext';
// import Loader from '@/components/Loader';
import { app } from '@/config/firebaseConfig';
import { AuthContextType } from '@/types/types';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { createContext, useEffect, useState } from 'react'


const Context = createContext<AuthContextType | null >(null)

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
    <Context.Provider value={{id, setId, user}}>
        {children}
    </Context.Provider>
  )
}

export default AuthContext;


export const useAuthContextProvider : ()=>AuthContextType  = () => useContextHook(Context)