import NavLinks from "./NavLinks"
import UsersInfo from "./UsersInfo"

const Nav = () => {
  return (
    <nav className=" bg-red-500 w-[30%]">
        <UsersInfo />
        <NavLinks />
    </nav>
  )
}

export default Nav