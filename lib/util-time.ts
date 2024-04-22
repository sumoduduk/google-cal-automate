import dayjs from "dayjs";

dayjs.locale("id");

export function getTimeFormat(day_add: number, hour: number, minute: number) {
  const now = dayjs().startOf("day");

  return now
    .add(day_add, "day")
    .add(hour, "hour")
    .add(minute, "minute")
    .format();
}
