import ReactCalendar from "react-calendar";
import "./Calendar.scss";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import apiServices from "../../../services";

export default function Calendar({
  onClickDay,
  value,
}: {
  onClickDay: (day: Date) => void;
  value: Date;
}) {
  const { data: appointments } = useQuery(
    ["appointments"],
    apiServices.getAppointments
  );

  const today = new Date();
  const minDate = new Date(
    today.getFullYear(),
    today.getMonth() - 1,
    today.getDate()
  );
  const maxDate = new Date(
    today.getFullYear(),
    today.getMonth() + 3,
    today.getDate()
  );

  return (
    <ReactCalendar
      onClickDay={(day: Date) => onClickDay(day)}
      value={value}
      minDate={minDate}
      maxDate={maxDate}
    />
  );
}
