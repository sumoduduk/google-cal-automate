import { google } from "googleapis";
import { AuthType, EventType } from "./type-cal";

export async function insert_event(auth: AuthType, events: EventType[]) {
  const jwtClientCalendar = new google.auth.JWT(
    auth.email,
    undefined,
    auth.key,
    ["https://www.googleapis.com/auth/calendar.events"],
  );

  jwtClientCalendar.authorize((err) => {
    if (err) {
      return console.error("auth err : ", err);
    }
  });

  const calendar = google.calendar("v3");

  for (let event of events) {
    try {
      let cal_event = await calendar.events.insert({
        auth: jwtClientCalendar,
        calendarId: "consultingcomodogaruda@gmail.com",
        requestBody: event,
      });

      console.log(" INSERT SUCCESS : ", cal_event);
    } catch (error) {
      console.log("error insert", error);
    }
  }
}
