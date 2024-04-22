import process from "process";
import "dotenv/config";
import { insert_event } from "./lib/calendar-insert";
import { genEvent } from "./event_func/generate_event";

const email = process.env.GCALENDAR_EMAIL as string;
const key = process.env.GCALENDAR_PRIVATE_KEY as string;
const formated_key = key.replaceAll(`"`, ``).replaceAll(`\\n`, `\n`);

export const TIMEZONE = "Asia/Jakarta";

const auth = {
  email,
  key: formated_key,
};

const events = genEvent();

insert_event(auth, events);
