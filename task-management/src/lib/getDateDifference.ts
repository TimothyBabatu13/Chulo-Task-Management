import { formatDistance } from 'date-fns'

export const formatDate = (date: Date) => {
    const result = formatDistance( date, new Date(), {
        addSuffix: true
    })

    return result
}


