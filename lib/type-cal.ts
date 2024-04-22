export type AuthType = {
  email: string;
  key: string;
};

type TimeStartEnd = {
  dateTime: string;
  timeZone: string;
};

export type EventType = {
  summary: string;
  description: string;
  start: TimeStartEnd;
  end: TimeStartEnd;
};
