'use client';
import InputWithLabel from "@/app/(auth)/components/InputWithLabel"
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { DueDate } from "./DueDate";
import { FormEvent, useEffect, useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import { addDoc, collection, getFirestore, onSnapshot, query, where } from "firebase/firestore";
import { useAuthContextProvider } from "@/context/AuthContext";
import { app } from "@/config/firebaseConfig";
import { Selectt } from "./Selectt";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
interface DataFromFirebase {
    active: boolean,
    displayName: string,
    email: string,
    id: string,
    photoURL: string,
    uid: string,
}
interface arr1Type {
    displayName: string,
    email: string,
    photoURL: string
    active: boolean,
    uid: string,
    id: string
}
interface arr2Type{
    label: string,
    value: string
}
interface detailsType {
    projectName: string,
    projectDetails: string,
    projectDueDate: Date | null,
    projectCategory: string
}
const Form = () => {
    const userr = useAuthContextProvider();
    const navigate = useRouter()
    const [details, setDetails] = useState<detailsType>({
        projectName: '',
        projectDetails: '',
        projectDueDate: null,
        projectCategory: '',
    })
    const { toast } = useToast()
    // console.log(details)
    const handleChange = (e: any) => {
        setDetails(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

   
    // const handleDateData = () => {

    // }
    const handleSubmit = async (e: FormEvent) =>{
        e.preventDefault();
        // handleDateData()
        const assignedUserDetail = {
            email: userr.user?.email,
            displayName: userr.user?.displayName,
            photoURL: userr.user?.photoURL,
            uid: userr.user?.uid
        }
        const result = findCommonElements(data, selected);
    
        if(!result.length || !details.projectName || !details.projectDueDate || !details.projectCategory ){
            toast({
                description: 'Please fill in all the boxes',
                variant: 'destructive'
            })
            return
        }
        const docRef = await addDoc(collection(db, 'projects'), {
            assignedBy: assignedUserDetail,
            title: details.projectName,
            description: details.projectDetails,
            dueDate: details.projectDueDate,
            category: details.projectCategory,
            assignedTo: result,
          });

          if(docRef.id){
            toast({
                description: 'Task assigned successfully',
                variant: 'default',
            })
            navigate.push('/');
          }
    }

    const db = getFirestore(app)
    const myUid = useAuthContextProvider();
    
  const [selected, setSelected] = useState<any[]>([]);
  const [data, setData] = useState<any[] | DataFromFirebase[]>([]);
//   console.log(selected)
  useEffect(()=>{
    
    const users = query(collection(db, 'users'), where('uid', '!=', myUid.user?.uid)) 
    let isUnsubscribed = false;
    
    const unsub = onSnapshot(users, (result)=>{
        if (isUnsubscribed) return;

        const dataa = result.docs.map(item => ({...item.data(), id: item.id}));
        console.log(dataa)
        setData(dataa)
    })
    return () => {
        isUnsubscribed = true;
    }
  } ,[])

  function findCommonElements(arr1 : arr1Type[], arr2: arr2Type[]) {
    
    const uidsSet = new Set(arr2.map((item) => item.value));
  
    // Find the common elements based on the uid
    const commonElements = arr1.filter((item) => uidsSet.has(item.uid));
  
    return commonElements;
  }
  


  const NeededPeople = ()=> {
    return data.map((item, id) =>{
    const arr = [];
    if(selected[id] && selected[id]?.value === item.uid){
        arr.push({...item})
    }
    return arr[0];
  })
}

//   console.log(data)
  const options = data?.map((datum) => ({
    label: datum.displayName,
    value: datum.uid,
  })) 

  const handleSetSelected = (e: any) => {
    setSelected(e);
  }
  return (
    <form onSubmit={handleSubmit}>
        <div className="my-6">
            <InputWithLabel 
                type="text"
                labelText="Project name:"
                placeholder="Enter project name"
                id="project"
                onChange={handleChange}
                value={details.projectName}
                name="projectName"
            />
        </div>
        <div className="my-6">
            <label className="mb-2" htmlFor="details">Project Details:</label>
            <Textarea 
                name="projectDetails" 
                id="details"
                onChange={handleChange}
                value={details.projectDetails}
            />
        </div>
        <div className="my-6">
            <label className="mb-2" htmlFor="date">Set due date:</label>
            <DueDate handleDate={setDetails} />
        </div>
        <div className="my-6">
            <label className="mb-2" htmlFor="date">Category:</label>
            <Selectt handleSelect={setDetails}/>
        </div>
        <div className="my-6">
            <label className="mb-2" htmlFor="date">Asign to:</label>
            <MultiSelect
                options={options}
                value={selected}
                onChange={handleSetSelected}
                labelledBy="Select"
            />
        </div>
        <Button className="block text-[#8d69f1] bg-[#fff] border border-[#8d69f1] hover:bg-[#8d69f1] hover:text-[#fff] text-[17.6px] font-normal">Add Project</Button>
    </form>
  )
}

export default Form