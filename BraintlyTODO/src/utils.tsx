import {FirebaseDate} from './types';

export const mapData = (results: Array<any>) => {
  return results.map(task => {
    return {
      ...task,
      id: task.id.toString(),
      expires: firebaseToDate(task.expires),
      createdAt: firebaseToDate(task.createdAt),
    };
  });
};

export const isBeforeNow = (date: Date) => date < new Date();

export const firebaseToDate = (date: FirebaseDate) => {
  const {_seconds, _nanoseconds} = date;
  const miliseconds = _seconds * 1000 + Math.floor(_nanoseconds / 1e6);

  return new Date(miliseconds);
};

export const calculateDaysHoursDifferenceTilNow = (date: Date) => {
  const now = new Date();

  // Calculate the difference in milliseconds between the two dates
  const timeDifferenceMilliseconds = Math.abs(now.getTime() - date.getTime());

  // Calculate the number of days
  const days = Math.floor(timeDifferenceMilliseconds / (1000 * 60 * 60 * 24));

  // Calculate the remaining hours
  const remainingHours = Math.floor(
    (timeDifferenceMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );

  return {days, hours: remainingHours};
};

export const calcExpiredText = (date: Date): string => {
  let text = '';
  const {days, hours} = calculateDaysHoursDifferenceTilNow(date);

  if (days === 0) {
    text = `Expired ${hours} hour${hours !== 1 ? 's' : ''} ago.`;
  } else {
    if (hours === 0) {
      text = `Expired ${days} day${days !== 1 ? 's' : ''} ago.`;
    } else {
      text = `Expired ${days} day${days !== 1 ? 's' : ''}, ${hours} hour${
        hours !== 1 ? 's' : ''
      } ago.`;
    }
  }

  return text;
};

export const calcRemainingText = (date: Date): string => {
  let text = '';
  const {days, hours} = calculateDaysHoursDifferenceTilNow(date);

  if (days === 0) {
    text = `${hours} hour${hours !== 1 ? 's' : ''} remaining.`;
  } else {
    if (hours === 0) {
      text = `${days} day${days !== 1 ? 's' : ''} remaining.`;
    } else {
      text = `${days} day${days !== 1 ? 's' : ''}, ${hours} hour${
        hours !== 1 ? 's' : ''
      } remaining.`;
    }
  }

  return text;
};

export const calcCreatedText = (date: Date): string => {
  let text = '';
  const {days, hours} = calculateDaysHoursDifferenceTilNow(date);

  if (days === 0) {
    text = `Created ${hours} hour${hours !== 1 ? 's' : ''} ago.`;
  } else {
    if (hours === 0) {
      text = `Created ${days} day${days !== 1 ? 's' : ''} ago.`;
    } else {
      text = `Created ${days} day${days !== 1 ? 's' : ''}, ${hours} hour${
        hours !== 1 ? 's' : ''
      } ago.`;
    }
  }

  return text;
};
