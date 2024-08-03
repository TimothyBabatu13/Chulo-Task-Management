import type { Metadata } from "next";
import Header from "./components/Header";


export const metadata: Metadata = {
  title: "Task Management - Auth",
  description: "This is a task management task given to us by Chulo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="w-[80%] mx-auto">
        <Header />
        {children}
    </section>
  );
}
