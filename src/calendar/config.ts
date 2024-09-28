const bs: number[][] = [];

bs[2081] = [2081, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31];

bs[2082] = [2082, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30];

bs[2083] = [2083, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30];

bs[2084] = [2084, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31];

bs[2085] = [2085, 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31];

bs[2086] = [2086, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30];

bs[2087] = [2087, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30];

bs[2088] = [2088, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31];

bs[2089] = [2089, 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31];

bs[2090] = [2090, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30];

bs[2091] = [2091, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30];

bs[2092] = [2092, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31];

bs[2093] = [2093, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31];

bs[2094] = [2094, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30];

bs[2095] = [2095, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30];

bs[2096] = [2096, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31];

bs[2097] = [2097, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30];

bs[2098] = [2098, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30];

bs[2099] = [2099, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30];

const leapYears: number[] = [];
for (let i = 2081; i < 2100; i++) {
  let totalD = 0;
  for (let j = 1; j <= 12; j++) {
    totalD += bs[i][j];
  }
  if (totalD === 366) leapYears.push(i);
}

const currentYear = 2000;
const currentMonth = 1;
const firstDay = 3;

const daysInEnglish = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const fullDaysInEnglish = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
const daysInNepali = ['आइत', 'सोम', 'मंगल', 'बुध', 'बिहि', 'शुक्र', 'शनि'];
const fullDaysInNepali = [
  'आइतवार',
  'सोमवार',
  'मंगलवार',
  'बुधवार',
  'बिहिवार',
  'शुक्रवार',
  'शनिवार',
];

const monthsInEnglish = [
  'Baishakh',
  'Jestha',
  'Ashadh',
  'Shrawan',
  'Bhadra',
  'Ashoj',
  'Kartik',
  'Mangsir',
  'Poush',
  'Magh',
  'Falgun',
  'Chaitra',
];

const monthsInNepali = [
  'बैशाख',
  'जेठ',
  'असार',
  'श्रावण',
  'भदौ',
  'असोज',
  'कार्तिक',
  'मंसिर',
  'पुष',
  'माघ',
  'फाल्गुन',
  'चैत्र',
];

const nepaliNumber = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];

const getNepaliNumber = (engNum: number) => {
  return engNum
    .toString()
    .split('')
    .map((n: any) => nepaliNumber[n])
    .join('');
};

const getEnglishNumber = (nepNum: number) => {
  return parseInt(
    nepNum
      .toString()
      .split('')
      .map((n: any) => nepaliNumber.indexOf(n))
      .join('')
  );
};

const getFormattedDay = (language: string, length: string, index: number) => {
  if (language === 'NE') {
    if (length === 'DDD') {
      return daysInNepali[index];
    } else {
      // length DDDD
      return fullDaysInNepali[index];
    }
  } else {
    // language english
    if (length === 'DDD') {
      return daysInEnglish[index];
    } else {
      // length DDDD
      return fullDaysInEnglish[index];
    }
  }
};
const getFormattedMonth = (language: string, index: number) => {
  if (language === 'NE') {
    index = getEnglishNumber(index);
    index--;
    return monthsInNepali[index];
  } else {
    index--;
    // language english
    return monthsInEnglish[index];
  }
};

const getFullEnglishDate = (englishDate: any) => {
  const splittedDate = englishDate.split('-');
  if (splittedDate.length !== 3) {
    console.error('error spliting the date');
  }

  const year = splittedDate[0];
  const month = splittedDate[1];
  const day = splittedDate[2];
  const selectedDate = `${year}-${splittedDate[1] > 9 ? month : '0' + month}-${
    splittedDate[2] > 9 ? day : '0' + day
  }`;
  return selectedDate;
};

const convertFullDateToNepali = (englishDate: any) => {
  const splittedDate = englishDate.split('-');
  if (splittedDate.length !== 3) {
    console.error('error spliting the date');
    return -1;
  }
  const year = getNepaliNumber(splittedDate[0]);
  const month = getNepaliNumber(splittedDate[1]);
  const day = getNepaliNumber(splittedDate[2]);
  const selectedNepaliDate = `${year}-${
    splittedDate[1] > 9 ? month : '0' + month
  }-${splittedDate[2] > 9 ? day : '0' + day}`;
  return selectedNepaliDate;
};

export {
  bs,
  daysInNepali,
  daysInEnglish,
  monthsInNepali,
  monthsInEnglish,
  getNepaliNumber,
  getEnglishNumber,
  fullDaysInNepali,
  currentYear,
  currentMonth,
  firstDay,
  leapYears,
  getFormattedDay,
  getFormattedMonth,
  getFullEnglishDate,
  convertFullDateToNepali,
  // TodayNepaliDate,
};
