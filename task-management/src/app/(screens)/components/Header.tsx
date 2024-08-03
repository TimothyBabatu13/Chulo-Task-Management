import { Button } from "@/components/ui/button"
import Link from "next/link"

const Header = () => {
  return (
    <header className="flex items-center justify-between py-[30px] mb-20">
        <h1>#Project management</h1>
        <Button className="block text-[#8d69f1] bg-[#fff] border border-[#8d69f1] hover:bg-[#8d69f1] hover:text-[#fff] text-[17.6px] font-normal">Log out</Button>
    </header>
  )
}

export default Header