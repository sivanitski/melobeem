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

export const formatMonthAndDay = (time) => format(new Date(time), "MMMM dd");

export const formatDateNotification = (time) => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const formattedTime = formatMonthAndDay(time);

  if (formattedTime === formatMonthAndDay(new Date())) {
    return "Today";
  }

  if (formattedTime === formatMonthAndDay(yesterday)) {
    return "Yesterday";
  }

  return formattedTime;
};
