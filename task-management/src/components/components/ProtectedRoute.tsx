'use client';

import { useAuthContextProvider } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loader from "./Loader";


const ProtectedRoute = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>)=> {
    const route = useRouter();
    const { id } = useAuthContextProvider();

    useEffect(() => {
      if(id === null) route.push('/signup')
    } , [id, route])
      
    if(id === null) return <Loader />
  return (
    <section>
      {children}
    </section>
  )
}

export default ProtectedRoute