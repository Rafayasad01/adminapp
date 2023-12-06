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
