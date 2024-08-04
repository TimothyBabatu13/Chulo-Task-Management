import { formatDistance } from 'date-fns'

export const getDateDifference = (dat: any) => {
    if(dat == undefined) return ''
    console.log(dat)
    const date = new Date(dat.seconds * 1000 + dat.nanoseconds / 1000000);
    const result = formatDistance( date, new Date(), {
        addSuffix: true
    })

    return result
}


