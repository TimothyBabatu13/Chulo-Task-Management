// Given Firestore Timestamp object
// const timestamp = { seconds: 1722812400, nanoseconds: 0 };

// // Convert seconds to milliseconds and create a Date object
// const date = new Date(timestamp.seconds * 1000);

// // Define options for formatting the date
// const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };

// // Format the date using toLocaleDateString
// const formattedDate = date.toLocaleDateString('en-US', options);

// console.log(formattedDate); 
export const formatDate = (timestamp: any) => {
    if(timestamp == undefined) return '';
    const date = new Date(timestamp.seconds * 1000);
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' } as Intl.DateTimeFormatOptions;
    const formattedDate = date.toLocaleDateString('en-US', options);
    return formattedDate;
}
 