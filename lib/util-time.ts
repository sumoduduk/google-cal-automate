import dayjs from "dayjs";

dayjs.locale("id");

export function getTimeFormat(
  date_event: number,
  hour: number,
  minute: number,
) {
  const now = dayjs().startOf("day");

  return now
    .set("date", date_event)
    .add(hour, "hour")
    .add(minute, "minute")
    .format();
}
