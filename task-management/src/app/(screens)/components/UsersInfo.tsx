'use client';

import { useAuthContextProvider } from "@/context/AuthContext";
import Image from "next/image";

const UsersInfo = () => {

  const { user } = useAuthContextProvider();
  const img = user?.photoURL;
  const displayName = user?.displayName;

  console.log(img, displayName)
  return (
    <div className="flex flex-col items-center justify-center py-10">
        <Image 
            src={img || ''}
            height={100}
            width={100}
            alt="user"
            className="rounded-[50px] block"
        />
        <h1>Hey, {displayName}</h1>
    </div>
  )
}

export default UsersInfo