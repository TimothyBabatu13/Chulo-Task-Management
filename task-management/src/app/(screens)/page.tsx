'use client';

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import AssignedProjectCard from "./components/AssignedProjectCard";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import { formatDate } from "@/lib/formatDate";
import { useAuthContextProvider } from "@/context/AuthContext";
// [
//   {
//     title: 'Chulo Task',
//     assignedTo: [
//       {
//         uid: 'k81pud64hGY4DwmbTJSgdTH4EVo1',
//         id: 'oXBuPcCoO3WcLXtIgKBF',
//         photoURL: 
//           'https://firebasestorage.googleapis.com/v0/b/chulo-task-management-app.appspot.com/o/images%2Frivers.jpg?alt=media&token=0dea96b9-9f5c-4f2a-9ef8-fea08afc199c',
//         displayName: 'Timothy',
//         active: true,
//         email: 'knbtimothy@gmail.com'
//       }
//     ],
//     assignedBy: {
//       displayName: 'Yy',
//       photoURL: 
//         'https://firebasestorage.googleapis.com/v0/b/chulo-task-management-app.appspot.com/o/Image.jpg?alt=media&token=4fa63442-e2c3-4a22-a136-2437a0687d57',
//       email: 'yyy@gmail.com',
//       uid: 'DfuVwhJyJ3chK13sSZeAJOy6LVM2'
//     },
//     description: 'Chulo First Task',
//     dueDate: Timestamp { seconds: 1722812400, nanoseconds: 0 },
//     category: 'development',
//     id: 'F0TLD4CgdiSBgydmk3kC'
//   },
//   {
//     title: 'React project',
//     category: 'development',
//     assignedTo: [
//       {
//         id: 'oXBuPcCoO3WcLXtIgKBF',
//         uid: 'k81pud64hGY4DwmbTJSgdTH4EVo1',
//         displayName: 'Timothy',
//         active: true,
//         email: 'knbtimothy@gmail.com',
//         photoURL: 
//           'https://firebasestorage.googleapis.com/v0/b/chulo-task-management-app.appspot.com/o/images%2Frivers.jpg?alt=media&token=0dea96b9-9f5c-4f2a-9ef8-fea08afc199c'
//       }
//     ],
//     dueDate: Timestamp { seconds: 1723158000, nanoseconds: 0 },
//     assignedBy: {
//       photoURL: 
//         'https://firebasestorage.googleapis.com/v0/b/chulo-task-management-app.appspot.com/o/20240730_075406.jpg?alt=media&token=1e4e00c1-dbfc-4d32-ae47-da74b4382076',
//       email: 'adegokeidowu68@gmail.com',
//       displayName: 'Shaddy',
//       uid: 'wyb83XPyyTSg65B8BngTQkfW5S22'
//     },
//     description: 'Coding',
//     id: 'b3MTlUvXaSf2sFH4tbv9'
//   },
//   {
//     title: 'Chulo Task',
//     description: 'This is the first commit for Chulo Task',
//     assignedBy: {
//       photoURL: 
//         'https://firebasestorage.googleapis.com/v0/b/chulo-task-management-app.appspot.com/o/Image.jpg?alt=media&token=4fa63442-e2c3-4a22-a136-2437a0687d57',
//       email: 'yyy@gmail.com',
//       displayName: 'Yy',
//       uid: 'DfuVwhJyJ3chK13sSZeAJOy6LVM2'
//     },
//     assignedTo: [
//       {
//         photoURL: 
//           'https://firebasestorage.googleapis.com/v0/b/chulo-task-management-app.appspot.com/o/Image.jpg?alt=media&token=6e7548ea-c66c-460b-b713-5438ce7eb236',
//         email: 'test1111@gmail.com',
//         active: true,
//         id: '86c2NKShEhW58o7Cjfd6',
//         uid: 'FIQWj4F1eKduU7E3fpJ4sNGZx7E2',
//         displayName: 'Test'
//       }
//     ],
//     category: 'development',
//     dueDate: Timestamp { seconds: 1722812400, nanoseconds: 0 },
//     id: 'jYgQJ4jrqJe7CE2sjBnq'
//   },
//   {
//     assignedTo: [
//       {
//         active: false,
//         id: 'I5d5wMtkwwKCNhitKEJh',
//         photoURL: 
//           'https://firebasestorage.googleapis.com/v0/b/chulo-task-management-app.appspot.com/o/1000095902.jpg?alt=media&token=847a0f1a-2196-4314-a538-8f9bc38957d8',
//         displayName: 'Quwam ',
//         email: 'aaa@gmail.com',
//         uid: 'Fz5CLaIaKyWDkTKkH7WE3i3zNxG2'
//       }
//     ],
//     dueDate: Timestamp { seconds: 1724886000, nanoseconds: 0 },
//     category: 'design',
//     assignedBy: {
//       email: 'quwam@gmail.com',
//       photoURL: 
//         'https://firebasestorage.googleapis.com/v0/b/chulo-task-management-app.appspot.com/o/1000095902.jpg?alt=media&token=f0446e6e-dba4-4d73-a768-65351eefd26b',
//       uid: 'k53RZB6rFha0TfN81h3g6r01sQB2',
//       displayName: 'Quwam '
//     },
//     description: 'Timothy na agba programmer all the way from.ogbomoso,\n' +
//       'Timothy started programming when he found out that water is responsible for cooking rice \n' +
//       'Na wetin inspire am be that ',
//     title: 'Timothy bio graphy',
//     id: 'tmUl4pRQgF2y9Je20UG4'
//   }
// ]

export default function Home() {
  const [data, setData] = useState<any[]>([]);
  const [results, setResults] = useState<any[]>([]);
  const [active, setActive] = useState('all')
  const userrr = useAuthContextProvider();

  const handleClick = (e : string) => {
    setActive(e)
 
    const neededData = data.filter((info) => {
      if(e === 'all') return data;
      if(e === 'mine'){
        return info.assignedBy.uid === userrr.user?.uid
      }
      else{
        return info.category === e
      }
    })

    setResults(neededData)
  }

  useEffect(()=>{
    const users = collection(db, 'projects') 
    let isUnsubscribed = false;
    
    const unsub = onSnapshot(users, (result)=>{
        if (isUnsubscribed) return;
        
        const dataa = result.docs.map(item => ({...item.data(), id: item.id}));
        console.log(dataa)
        // console.log(dataa)
        setData(dataa)
        setResults(dataa)
    })
    return () => {
        isUnsubscribed = true;
    }
  }, [])
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
      <div className="grid grid-cols-2">
        {results?.map(person => (
          <AssignedProjectCard 
            key={person.id}
            name={person.title}
            deadline={formatDate(person.dueDate)}
            assignedTo={person.assignedTo}
            id={person.id}
          />
        ))}
      </div>
      {/* <AssignedProjectCard assignedTo={[{name: '', img:'/n.jpg'}, {name: '', img:'/n.jpg'}]} name="Styling card" deadline={'Sat Jun, 29 2024'}/>
      <AssignedProjectCard assignedTo={[{name: '', img:'/n.jpg'}, {name: '', img:'/n.jpg'}]} name="Styling card" deadline={'Sat Jun, 29 2024'}/>
      <AssignedProjectCard assignedTo={[{name: '', img:'/n.jpg'}, {name: '', img:'/n.jpg'}]} name="Styling card" deadline={'Sat Jun, 29 2024'}/> */}
    </main>
  );
}
