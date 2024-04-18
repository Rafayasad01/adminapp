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

export const listingRolePermission = (permissions: any, name: string) => {
  const isTrue = permissions?.find((el: any) => el.name === name);
  if (isTrue) {
    return true;
  }
  return false;
};

export const formatName = (firstname: string, lastname: string) => {
  return `${firstname} ${lastname}`;
};

export default async function promiseHandler<T, U = Error>(
  promise: Promise<T>
) {
  return promise
    .then<readonly [T, null]>((result) => [result, null] as const)
    .catch<readonly [null, U]>((error) => [null, error] as const);
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
