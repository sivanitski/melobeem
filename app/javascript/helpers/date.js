import {differenceInDays} from 'date-fns';

export const calcDaysLeft = (date) => {
  return differenceInDays(new Date(date), Date.now());
}
