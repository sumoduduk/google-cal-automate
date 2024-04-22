import { EventType } from "../lib/type-cal";
import { getTimeFormat } from "../lib/util-time";
import fs from "fs";

export function genEvent() {
  const data = fs.readFileSync("event_func/events.json", "utf8");
  let time_schedules = JSON.parse(data);

  function splitHourMinute(time_str: string) {
    const split_time = time_str.split(":");
    return { hour: parseInt(split_time[0]), minute: parseInt(split_time[1]) };
  }

  const schedules_arr: Array<EventType> = [];

  for (let schedule of time_schedules) {
    let split_schedule = schedule.split("-");
    let split_summary = split_schedule[split_schedule.length - 1].split("/");

    let start = splitHourMinute(split_schedule[0]);
    let end = splitHourMinute(split_schedule[1]);

    let event: EventType = {
      summary: split_summary[0],
      description: split_summary[1],
      start: {
        dateTime: getTimeFormat(1, start.hour, start.minute),
        timeZone: "Asia/Jakarta",
      },
      end: {
        dateTime: getTimeFormat(1, end.hour, end.minute),
        timeZone: "Asia/Jakarta",
      },
    };

    schedules_arr.push(event);
  }

  return schedules_arr;
}

//   {
//   description: "Test Description",
//   summary: "test summary ??",
//   start: {
//     dateTime: start_time,
//     timeZone: TIMEZONE,
//   },
//   end: {
//     dateTime: end_time,
//     timeZone: TIMEZONE,
//   },
// };
