import { google } from "googleapis";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export const TIMEZONE = "Asia/Jakarta";
const today = new Date();

const yyyy = today.getFullYear();
const mm = String(today.getMonth() + 1).padStart(2, "0"); // Add leading zero for single-digit months
const dd = String(today.getDate()).padStart(2, "0"); //

export async function list_calendar(email: string, key: string) {
  const jwtClientCalendar = new google.auth.JWT(email, undefined, key, [
    "https://www.googleapis.com/auth/calendar.events",
  ]);

  jwtClientCalendar.authorize((err) => {
    if (err) {
      return console.error("auth err : ", err);
    }
  });

  const calendar = google.calendar("v3");

  try {
    const cal = await calendar.events.list({
      auth: jwtClientCalendar,
      calendarId: "consultingcomodogaruda@gmail.com",
      timeZone: TIMEZONE,
      timeMin: dayjs(yyyy + mm + dd)
        .tz(TIMEZONE)
        .startOf("day")
        .format(),
      timeMax: dayjs(yyyy + mm + dd)
        .tz(TIMEZONE)
        .endOf("day")
        .format(),
    });
    console.log("LIST CALENDAR =   ", cal);
  } catch (err) {
    console.log("ERROR LIST = ", err);
  }
}
