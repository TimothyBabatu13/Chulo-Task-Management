import NavLinks from "./NavLinks"
import UsersInfo from "./UsersInfo"

const Nav = () => {
  //
  return (
    <nav className=" bg-[#8d69f1] min-h-[100vh] border-b border-b-[white] w-[300px] min-w-[300px] ">
        <UsersInfo />
        <NavLinks />
    </nav>
  )
}

export default Nav