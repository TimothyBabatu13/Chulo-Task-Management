import { getDateDifference } from "@/lib/getDateDifference"
import { Timestamp } from "firebase/firestore"
import Image from "next/image"

// [
//     {
//       posterName: 'Yy',
//       comment: 'Heyy',
//       postId: 'tmUl4pRQgF2y9Je20UG4',
//       timestamp: Timestamp { seconds: 1722808005, nanoseconds: 547000000 }
//     }
//   ]
const CommentCard = ({ posterName, comment, postId, timeStamp, posterImage }: {
    posterName: string,
    comment: string,
    postId: string,
    timeStamp: Timestamp,
    posterImage: string
}) => {
    const ddd = getDateDifference(timeStamp)
  
  return (
    <div style={{boxShadow: '3px 3px 5px rgba(0, 0, 0, .05)'}} className=" cursor-pointer p-4 bg-[#fff] rounded-[6px] border m-2">
        <div className="flex">
          <Image 
            src={posterImage}
            height={30}
            width={30}
            alt=""
            className="h-[30px] w-[30px] rounded-full mr-2.5"
          />
          <h1 className="text-[17.6px]">{posterName}</h1>
        </div>
        <h2 className="text-[15.84px] text-[#999]">about {ddd}</h2>
        <h1 className="text-[15.84px] text-[#999]">{comment}</h1>
    </div>
  )
}

export default CommentCard