export function calcDateDiff(date1, date2) {
  let millisec;
  millisec = Math.abs(date1.getTime() - date2.getTime());
  millisec = `${millisec / 1000}/${millisec % 1000}`;
  
  const time = parseFloat(millisec);
  return time;
}