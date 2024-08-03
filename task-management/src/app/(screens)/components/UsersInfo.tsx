'use client';

import Image from "next/image";

const UsersInfo = () => {
  return (
    <div className="flex flex-col items-center justify-center py-10">
        <Image 
            src={''}
            height={100}
            width={100}
            alt="user"
            className="rounded-[50px] block"
        />
        <h1>Hey, Drignet</h1>
    </div>
  )
}

export default UsersInfo