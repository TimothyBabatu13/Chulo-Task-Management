'use client';

import { useAuthContextProvider } from "@/context/AuthContext";
import Image from "next/image";

const UsersInfo = () => {

  const { user } = useAuthContextProvider();
  const img = user?.photoURL;
  const displayName = user?.displayName;

  return (
    <div className="flex flex-col items-center justify-center py-10 px-[30px] text-center">
        <Image 
            src={img || ''}
            height={70}
            width={70}
            alt="user"
            className="rounded-[50px] block mb-2.5"
        />
        <h1 className="text-[#fff] text-[17.6px] font-bold">Hey, {displayName}</h1>
    </div>
  )
}

export default UsersInfo