import { format } from "date-fns";

export const formatTimestampToDate = (timestamp: number) => {
  return timestamp ? format(timestamp, "yyyy-MM-dd hh:mm") : "";
};
