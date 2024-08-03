import { cn } from "@/lib/utils"
import { LayoutDashboard, PlusIcon } from "lucide-react"
import Link from "next/link"
import { LinkHTMLAttributes } from "react"

const LinkWithIcon = ({ classMame, children, href } : {
    classMame?: string,
    children: React.ReactNode,
    href: string
}) => {
    
    return (
        <Link href={href} className={cn(`flex items-center ${classMame}`)}>{children}</Link>
    )
}

const NavLinks = () => {
  return (
    <div>
        <LinkWithIcon href='/'>
            <LayoutDashboard />
            <span className="ml-2.5">Dashboard</span>
        </LinkWithIcon>
        <LinkWithIcon href='/new-project'>
            <PlusIcon />
            <span className="ml-2.5">New Project</span>
        </LinkWithIcon>
    </div>
  )
}

export default NavLinks