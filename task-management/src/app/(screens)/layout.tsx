import type { Metadata } from "next";
import Nav from "./components/Nav";
import AllUsers from "./components/AllUsers";
import Header from "./components/Header";

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
    <section className="flex">
        <Nav />
        <div className="flex-1">
            <Header />
            {children}  
        </div>
        <AllUsers />
    </section>
  );
}
