import { validateDate } from "./functions";

export const validateCalendarDates = (
  date: string,
  minDate: string,
  maxDate: string
): true | string => {
  // 1. Validate minDate
  const minCheck = validateDate(minDate);
  if (minCheck !== true) {
    return `Invalid minDate: ${minCheck}`;
  }

  // 2. Validate maxDate
  const maxCheck = validateDate(maxDate);
  if (maxCheck !== true) {
    return `Invalid maxDate: ${maxCheck}`;
  }

  // 3. Validate user provided date
  const initialCheck = validateDate(date);
  if (initialCheck !== true) {
    return `Invalid provided date: ${initialCheck}`;
  }

  // 4. Logical range validation
  if (minDate > maxDate) {
    return 'minDate must be less than or equal to maxDate';
  }

  // 5. Initial date within range
  if (date < minDate || date > maxDate) {
    return 'Provided date must be between minDate and maxDate';
  }

  return true;
};
