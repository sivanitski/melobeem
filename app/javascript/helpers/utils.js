export const calcDaysLeft = (date) => {
  return Math.trunc((Date.parse(date) - Date.now()) / (100 * 60 * 60 * 24));
}