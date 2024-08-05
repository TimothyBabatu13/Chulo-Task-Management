import type { Metadata } from "next";
import Nav from "./components/Nav";
import AllUsers from "./components/AllUsers";
import Header from "./components/Header";
import ProtectedRoute from "@/components/components/ProtectedRoute";

export const metadata: Metadata = {
  title: "Task Management",
  description: "Home",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProtectedRoute>
      <section className="flex h-[100vw]">
        <Nav />
        <div className="flex-1 bg-[#f4f4f4] px-[60px]">
            <Header />
            {children}  
        </div>
        <AllUsers />
    </section>
    </ProtectedRoute>
  );
}
