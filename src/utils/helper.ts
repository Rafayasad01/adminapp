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

type SortOrder = 'asc' | 'desc';
export function sortArrayByKey<T>(
  arr: T[],
  key: keyof T,
  order: SortOrder = 'asc'
): T[] {
  try {
    if (
      !Array.isArray(arr) ||
      typeof key !== 'string' ||
      !['asc', 'desc'].includes(order)
    ) {
      return Array.isArray(arr) ? arr : [];
    }

    return arr.slice().sort((a, b) => {
      const aValue = a[key];
      const bValue = b[key];

      if (aValue === undefined || bValue === undefined) {
        return 0;
      }

      const aStr = String(aValue);
      const bStr = String(bValue);

      // Extract numbers from strings like "Day 01"
      const aNum = parseInt(aStr.match(/\d+/)?.[0] || '0', 10);
      const bNum = parseInt(bStr.match(/\d+/)?.[0] || '0', 10);

      if (order === 'asc') {
        return aNum - bNum;
      }
      return bNum - aNum;
    });
  } catch (error) {
    console.error('An error occurred while sorting:', error);
    return arr;
  }
}

export const formatCurrency = (amount: number): any => {
  let formattedAmount;
  let suffix = '';
  if (amount >= 1_000_000_000_000) {
    formattedAmount = amount / 1_000_000_000_000;
    suffix = 'T';
  } else if (amount >= 1_000_000_000) {
    formattedAmount = amount / 1_000_000_000;
    suffix = 'B';
  } else if (amount >= 1_000_000) {
    formattedAmount = amount / 1_000_000;
    suffix = 'M';
  } else {
    formattedAmount = amount;
  }

  return (
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: import.meta.env.VITE_CURRENCY_SYMBOL,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(formattedAmount) + suffix
  );
};
