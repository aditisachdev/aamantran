import { format } from "date-fns";

export const formateDate = datetime => {
  const date = new Date(datetime);
  return format(date, "ddd MMM Do YYYY");
};

export const formatTime = datetime => {
  const date = new Date(datetime);
  return format(date, "h:mm A");
};
