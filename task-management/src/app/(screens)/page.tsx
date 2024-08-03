'use client';

import { Button } from "@/components/ui/button";
import { useState } from "react";
import AssignedProjectCard from "./components/AssignedProjectCard";

export default function Home() {
  const [data, setData] = useState([]);

  return (
    <main className="">
      <h1>Dashboard</h1>
      <div>
        <h2>Filter by</h2>
        <Button>All</Button>
        <Button>mine</Button>
        <Button>development</Button>
        <Button>design</Button>
        <Button>marketing</Button>
        <Button>sales</Button>
      </div>
      <AssignedProjectCard assignedTo={[{name: '', img:'/n.jpg'}, {name: '', img:'/n.jpg'}]} name="Styling card" deadline={'Sat Jun, 29 2024'}/>
      <AssignedProjectCard assignedTo={[{name: '', img:'/n.jpg'}, {name: '', img:'/n.jpg'}]} name="Styling card" deadline={'Sat Jun, 29 2024'}/>
      <AssignedProjectCard assignedTo={[{name: '', img:'/n.jpg'}, {name: '', img:'/n.jpg'}]} name="Styling card" deadline={'Sat Jun, 29 2024'}/>
    </main>
  );
}
