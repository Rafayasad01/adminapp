import dayjs from 'dayjs';

export const CheckRolePermission = (
  name: string,
  permissions: any,
  navigate?: any,
  navTo?: string
) => {
  const isTrue = permissions?.find((el: any) => el.name === name);
  if (isTrue) {
    navigate(navTo);
  } else {
    navigate('../no-auth');
  }
};

export const listingRolePermission = (permissions: any, name: string | any) => {
  const isTrue = permissions?.find((el: any) => el.name === name);
  if (isTrue) {
    return true;
  }
  return false;
};

export const formatName = (firstName: string, lastName: string) => {
  return `${firstName} ${lastName}`;
};

export default async function promiseHandler<T>(
  promise: Promise<T>,
  onfinally?: (() => void) | null | undefined
) {
  return promise
    .then((result) => [result, null, true] as const)
    .catch((error) => [null, error, false] as const)
    .finally(onfinally);
}

export const convertKeysToDayJS = (
  objectsArray: any[],
  keysArray: string[]
) => {
  return objectsArray.map((obj) => {
    const newObj: any = { ...obj };
    keysArray.forEach((key) => {
      if (newObj[key] && typeof newObj[key] === 'string') {
        newObj[key] = dayjs(newObj[key] as string, 'h:mm A');
      }
    });
    return newObj;
  });
};

export const convertDayJSToString = (
  objectsArray: any[],
  keysArray: string[],
  format = 'h:mm A'
) => {
  return objectsArray.map((obj) => {
    const newObj: any = { ...obj };
    keysArray.forEach((key) => {
      if (newObj[key] && newObj[key] instanceof dayjs) {
        newObj[key] = newObj[key].format(format);
      } else if (newObj[key] && dayjs(newObj[key]).isValid()) {
        newObj[key] = dayjs(newObj[key]).format(format);
      }
    });
    return newObj;
  });
};

export const formatNumberWithCommas = (number: number | any) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
