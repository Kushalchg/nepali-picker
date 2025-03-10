import { bs } from './config';
import type { DateString } from '../types';

const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const validateDate = (date: string): string | boolean => {
  const dateArray = date.split('-');
  const [userYear, userMonth, _] = dateArray.map(Number);
  if (dateArray.length !== 3) {
    return 'Invalid date format';
  } else if (userYear < 2000 || userYear >= 2100) {
    return 'Year Range is 2000 to 2099';
  } else if (userMonth < 1 || userMonth > 12) {
    return 'Month Range is 1 to 12';
  } else {
    return true;
  }
};

const FindDateDifference = (date1: number, date2: number) => {
  const diffInMs = date2 - date1;
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
  return diffInDays;
};

const AdToBs = (UserDate: DateString): DateString => {
  const ReferenceDate = new Date('1943-04-14').getTime();
  const UserTimeDate = new Date(UserDate).getTime();

  if (UserTimeDate < ReferenceDate) {
    console.log(
      'The minimum possible date you can enter is 2024-04-13 i.e 2081-01-01'
    );
    return 'The minimum possible date you can enter is 2024-04-13 i.e 2081-01-01';
  }

  // number of days from that reference date
  const DateDifference = FindDateDifference(ReferenceDate, UserTimeDate);
  let nepaliYear: number = 2000;
  let nepaliMonth: number = 1;
  let nepaliDay: number = 1;
  //difference can calculate upto previous day so add 1 to get current day(Today)

  let DD = DateDifference + 1;

  outerLoop: for (let year = 2000; year < 2100; year++) {
    for (let month = 1; month <= 12; month++) {
      if (DD <= bs[year][month]) {
        nepaliYear = year;
        nepaliMonth = month;
        nepaliDay = DD;
        break outerLoop;
      } else {
        DD -= bs[year][month];
      }
    }
  }

  return `${nepaliYear}-${String(nepaliMonth).padStart(2, '0')}-${String(
    nepaliDay
  ).padStart(2, '0')}`;
};

const NepaliToday = (): DateString => {
  const ReferenceDate = new Date('1943-04-14').getTime();
  const TodayDate = Date.now();
  const date = new Date(TodayDate);
  // number of return from that reference date
  const DateDifference = FindDateDifference(
    ReferenceDate,
    new Date(formatDate(date)).getTime()
  );

  let nepaliYear: number = 2000;
  let nepaliMonth: number = 1;
  let nepaliDay: number = 1;
  //difference can calculate upto previous day so add 1 to get current day(Today)
  let DD = DateDifference + 1;
  outerLoop: for (let year = 2000; year < 2100; year++) {
    for (let month = 1; month <= 12; month++) {
      if (DD <= bs[year][month]) {
        nepaliYear = year;
        nepaliMonth = month;
        nepaliDay = DD;
        break outerLoop;
      } else {
        DD -= bs[year][month];
      }
    }
  }
  return `${nepaliYear}-${String(nepaliMonth).padStart(2, '0')}-${String(
    nepaliDay
  ).padStart(2, '0')}`;
  // return DateDifference;
  //add the difference between reference and today date to nepali reference date and find new today nepali date
};

const BsToAd = (userDate: DateString): DateString => {
  try {
    const dateArray = userDate.split('-');
    let dateDifference = 0;
    if (dateArray.length !== 3) {
      throw new Error('Invalid date format');
    }
    const [userYear, userMonth, userDay] = dateArray.map(Number);
    if (userYear < 2000 || userYear >= 2100) {
      throw new Error('Year Range is 2000 to 2099');
    }
    if (userMonth < 1 || userMonth > 12) {
      throw new Error('Month Range is 1 to 12');
    }

    // if (userMonth < 1 || userMonth > 31) {
    //   throw new Error('Month out of supported range');
    // }

    for (let year = 2000; year < userYear; year++) {
      for (let month = 1; month <= 12; month++) {
        dateDifference += bs[year][month];
      }
    }

    for (let month = 1; month < userMonth; month++) {
      dateDifference += bs[userYear][month];
    }

    dateDifference += userDay - 1;

    const referenceDate = new Date('1943-04-14');
    const futureDate = new Date(referenceDate);
    futureDate.setDate(referenceDate.getDate() + dateDifference);

    return futureDate.toISOString().split('T')[0];
  } catch (error) {
    return ' Year Range is 2000 to 2099';
  }
};

export { AdToBs, BsToAd, formatDate, FindDateDifference, NepaliToday };
