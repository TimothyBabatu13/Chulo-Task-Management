'use client';

import { Button } from "@/components/ui/button";
import { useState } from "react";
import AssignedProjectCard from "./components/AssignedProjectCard";

export default function Home() {
  const [data, setData] = useState([]);
  const [active, setActive] = useState('all')

  const handleClick = (e : string) => {
    setActive(e)
  }
  return (
    <main className="">
      <h1 className="text-[17.6px] font-bold text-[#444]">Dashboard</h1>
      <div className="my-[30px] flex bg-[#fff] p-2.5">
        <h2 className="mr-2.5">Filter by:</h2>
        <Button onClick={()=>handleClick("all")} className={` font-bold bg-transparent border-r border-r-[#e4e4e4] hover:bg-transparent ${active === 'all' ? "text-[#8d69f1]":"text-[#999]"}`}>all</Button>
        <Button onClick={()=>handleClick("mine")} className={` font-bold bg-transparent border-r border-r-[#e4e4e4] hover:bg-transparent ${active === 'mine' ? "text-[#8d69f1]":"text-[#999]"}`}>mine</Button>
        <Button onClick={()=>handleClick("development")} className={` font-bold bg-transparent border-r border-r-[#e4e4e4] hover:bg-transparent ${active === 'development' ? "text-[#8d69f1]":"text-[#999]"}`}>development</Button>
        <Button onClick={()=>handleClick("design")} className={` font-bold bg-transparent border-r border-r-[#e4e4e4] hover:bg-transparent ${active === 'design' ? "text-[#8d69f1]":"text-[#999]"}`}>design</Button>
        <Button onClick={()=>handleClick("marketing")} className={` font-bold bg-transparent border-r border-r-[#e4e4e4] hover:bg-transparent ${active === 'marketing' ? "text-[#8d69f1]":"text-[#999]"}`}>marketing</Button>
        <Button onClick={()=>handleClick("sales")} className={` font-bold bg-transparent hover:bg-transparent ${active === 'sales' ? "text-[#8d69f1]":"text-[#999]"}`}>sales</Button>
      </div>
      <AssignedProjectCard assignedTo={[{name: '', img:'/n.jpg'}, {name: '', img:'/n.jpg'}]} name="Styling card" deadline={'Sat Jun, 29 2024'}/>
      <AssignedProjectCard assignedTo={[{name: '', img:'/n.jpg'}, {name: '', img:'/n.jpg'}]} name="Styling card" deadline={'Sat Jun, 29 2024'}/>
      <AssignedProjectCard assignedTo={[{name: '', img:'/n.jpg'}, {name: '', img:'/n.jpg'}]} name="Styling card" deadline={'Sat Jun, 29 2024'}/>
    </main>
  );
}
