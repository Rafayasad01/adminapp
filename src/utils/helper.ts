export const CheckRolePermission = (
  name: string,
  permissions: any,
  navigate: any,
  navTo: string
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
