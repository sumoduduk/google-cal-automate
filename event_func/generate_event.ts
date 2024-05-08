import { EventType, ScheduleFeedT } from "../lib/type-cal";
import { getTimeFormat } from "../lib/util-time";
import fs from "fs";

function splitHourMinute(time_str: string) {
  const split_time = time_str.split(":");
  return { hour: parseInt(split_time[0]), minute: parseInt(split_time[1]) };
}

export function genEvent() {
  const data = fs.readFileSync("ev_schedule.json", "utf8");
  let time_schedules = JSON.parse(data) as Array<ScheduleFeedT>;

  const schedules_arr: Array<EventType> = [];

  for (let elem of time_schedules) {
    const date_event = elem.date;

    for (let schedule_event of elem.schedule) {
      const split_schedule = schedule_event.split("&?");

      let start = splitHourMinute(split_schedule[0]);
      let end = splitHourMinute(split_schedule[1]);

      let event: EventType = {
        summary: split_schedule[2].trim(),
        description: split_schedule[3].trim(),
        start: {
          dateTime: getTimeFormat(date_event, start.hour, start.minute),
          timeZone: "Asia/Jakarta",
        },
        end: {
          dateTime: getTimeFormat(date_event, end.hour, end.minute),
          timeZone: "Asia/Jakarta",
        },
        reminders: {
          useDefault: false,
          overrides: [
            {
              method: "popup",
              minutes: 10,
            },
          ],
        },
      };

      schedules_arr.push(event);
    }
  }
  return schedules_arr;
}
