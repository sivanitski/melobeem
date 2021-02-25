import { differenceInDays, differenceInMilliseconds, format } from "date-fns";

export const calcDaysLeft = (date) => {
  return differenceInDays(new Date(date), Date.now());
};

export const calcTimeDuration = (latestDate) => {
  if (!latestDate) {
    return 0;
  }

  return differenceInMilliseconds(new Date(latestDate), Date.now());
};

export const formatTimeInMinutesAndSeconds = (time) => format(time, "mm:ss");

export const formatTimeDayAndMonth = (time) => format(new Date(time), "d MMM");
