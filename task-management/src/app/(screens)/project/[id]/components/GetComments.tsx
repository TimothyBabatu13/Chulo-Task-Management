import { useEffect, useState } from "react"
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import { getDateDifference } from "@/lib/getDateDifference";
import CommentCard from "./CommentCard";

const GetComments = ({ id } : {
    id: string
}) => {

    const [data, setData] = useState<any[]>([])
    console.log(data)
    
    // console.log(data?.timeStamp)
    useEffect(()=>{
        const q = query(collection(db, "comments"), where("postId", "==", id));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const cities: any[] = [];
          querySnapshot.forEach((doc) => {
            cities.push(doc.data());
          });
          setData(cities)
        });
    }, [])
  return (
    <div>
        {
          data.length ? data.map((datum, id) =>(
            <CommentCard 
              key={id}
              comment={datum.comment}
              postId={datum.postId}
              timeStamp={datum.timestamp}
              posterName={datum.posterName}
              posterImage={datum.posterImage}
            />
          ))
          :
          'No comment'
        }
    </div>
  )
}

export default GetComments