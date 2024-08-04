
const formatDate = (date: Date) => {
    // const date = new Date('2024-08-20T23:00:00.000Z');
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' } as Intl.DateTimeFormatOptions;
    const formattedDate = date.toLocaleDateString('en-US', options);
    return formattedDate;
}
 