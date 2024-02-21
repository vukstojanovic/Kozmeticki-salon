import ReactCalendar from "react-calendar";
import "./Calendar.scss";

export default function Calendar({
  onClickDay,
  value,
}: {
  onClickDay: (day: Date) => void;
  value: Date;
}) {
  return (
    <ReactCalendar onClickDay={(day: Date) => onClickDay(day)} value={value} />
  );
}
