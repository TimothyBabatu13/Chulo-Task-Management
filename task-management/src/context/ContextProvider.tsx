'use client';
import AuthContext from "./AuthContext"

const ContextProvider = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
  return (
    <AuthContext>
        {children}
    </AuthContext>
  )
}

export default ContextProvider