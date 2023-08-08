import { format, parse } from "date-fns";

export const useDateChanger = () => {
  const dateToDisplay = (date) => {
    const parsedDate = parse(date, "dd/MM/yyyy", new Date());
    return format(new Date(parsedDate), "dd.MM");
  };
  const dateForForm = (date) => format(new Date(date), "dd/MM/yyyy");

  const dateForDatepicker = (date) => {
    const parsedDate = parse(date, "dd/MM/yyyy", new Date());
    return format(new Date(parsedDate), "yyyy-MM-dd");
  };

  return { dateToDisplay, dateForForm, dateForDatepicker };
};
