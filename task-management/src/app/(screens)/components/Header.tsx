import { Button } from "@/components/ui/button"
import Link from "next/link"

const Header = () => {
  return (
    <header className="flex items-center justify-between">
        <h1>#Project management</h1>
        <Button className="block">Log out</Button>
    </header>
  )
}

export default Header