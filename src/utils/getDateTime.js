import { format } from "date-fns";

const getDateTime = (interactionDate, type) => {
  const viewedDate = new Date(interactionDate);

  if (type === "onlyDate") {
    return format(viewedDate, "MMM d, yyyy");
  }

  return viewedDate;
};
export default getDateTime;
