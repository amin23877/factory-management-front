import {format} from 'date-fns'
 
export const formatTimestampToDate = (timestamp:number) => {
    return format(timestamp, 'MM/dd/yyyy');
} 