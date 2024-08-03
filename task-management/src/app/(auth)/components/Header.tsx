import Link from "next/link"

const Header = () => {
  return (
    <header className="flex items-center justify-between">
        <h1>#Project management</h1>
        <div className="flex items-center">
            <Link href={'/login'}>Login</Link>
            <Link className="ml-5" href={'/signup'}> Signup </Link>
        </div>
    </header>
  )
}

export default Header