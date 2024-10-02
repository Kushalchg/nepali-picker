import { bs, leapYears } from './config';

const calcFirstDay = (currentYear: number, currentMonth: number) => {
  let month = currentMonth;
  let year = currentYear;
  const diff = year - 2000;
  let leapYear = 0;
  let firstDay;
  for (let l = 0; l < leapYears.length; l++) {
    if (year > leapYears[l]) {
      leapYear++;
    }
  }
  // if (year > 2096) {
  //   leapYear--;
  // }
  //calculate number of days since the first refernce year i.e 2081
  let td = 3 + diff * 365 + leapYear;
  if (month - 1 > 0) {
    for (let i = 1; i < month; i++) {
      td += bs[year][i];
    }
    firstDay = td % 7;
  } else {
    firstDay = td % 7;
  }
  td = 0;
  return firstDay;
};

const isToday = (
  date: string,
  index: number,
  currentYear: number,
  currentMonth: number,
  firstDayOfMonth: number
) => {
  return (
    parseInt(date.slice(-2)) - 1 + firstDayOfMonth === index &&
    currentMonth === parseInt(date.slice(6, 8)) &&
    currentYear === parseInt(date.slice(0, 4))
  );
};

export { calcFirstDay, isToday };
