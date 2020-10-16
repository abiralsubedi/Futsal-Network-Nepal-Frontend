import { format } from "date-fns";

const getFirstHourDate = (requiredDate, addDays) => {
  let updatedDate = new Date(requiredDate);
  if (addDays) {
    updatedDate.setDate(updatedDate.getDate() + addDays);
  }
  return new Date(format(new Date(updatedDate), "yyyy/MM/dd")).toISOString();
};

export default getFirstHourDate;
