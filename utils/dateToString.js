export const dateToString = (date) => {
  let today;
  if(date === undefined) today = new Date();
  else today = date;
  return today.toISOString().slice(0, 10).replace(/-/g, '.');
}
