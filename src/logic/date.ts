import { format } from "date-fns";

export const formatTimestampToDate = (timestamp: number) => {
  return timestamp ? format(timestamp, "yyyy-MM-dd hh:mm") : "";
};

export function formatDateValue(v: any) {
  if (v) {
    return new Date(v).toISOString().slice(0, 10);
  }
  return null;
}
