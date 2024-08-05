'use client'
import { cn } from "@/lib/utils"
import { LayoutDashboard, PlusIcon } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LinkHTMLAttributes, useEffect, useState } from "react"

const LinkWithIcon = ({ classMame, children, href } : {
    classMame?: string,
    children: React.ReactNode,
    href: string
}) => {
    
    return (
        <Link href={href} className={cn(`flex p-2.5 rounded-l-[20px] items-center ${classMame}`)}>{children}</Link>
    )
}

const NavLinks = () => {
    const [activeLink, setActiveLink] = useState('');
    const pathName = usePathname()

    useEffect(()=>{
        setActiveLink(pathName);
    }, [pathName])
  return (
    <div className="mt-20 ml-5">
        <LinkWithIcon classMame={`${activeLink !== '/new-project' ? "bg-[#f4f4f4] text-[#555]" : "text-[#fff]"}`} href='/'>
            <LayoutDashboard />
            <span className="ml-2.5 text-[#555] text-[17.65px]">Dashboard</span>
        </LinkWithIcon>
        <LinkWithIcon classMame={`mt-2.5 ${(activeLink === '/new-project') ? "bg-[#f4f4f4] text-[#555]": "text-[#fff]"} `} href='/new-project'>
            <PlusIcon />
            <span className={`ml-2.5`}>New Project</span>
        </LinkWithIcon>
    </div>
  )
}

export default NavLinks