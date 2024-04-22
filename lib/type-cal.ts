export type AuthType = {
  email: string;
  key: string;
};

type TimeStartEnd = {
  dateTime: string;
  timeZone: string;
};

type MethodType = {
  method: string;
  minutes: number;
};

type RemindersType = {
  useDefault: boolean;
  overrides: Array<MethodType>;
};

export type EventType = {
  summary: string;
  description: string;
  start: TimeStartEnd;
  end: TimeStartEnd;
  reminders: RemindersType;
};
