export type AppUserDriverExt = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone: number;
  license_number: string;
  start_time: any;
  end_time: any;
  address: string;
  avatar: string;
};

export type AppUser = {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  phone: number;
  postalCode: string;
  address: string;
  appuserRole: string;
  avatar: string;
  licenseNumber: string;
};

export type AppUserAddress = {
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  type: string;
};

export type AppUserEmployees = {
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  employeeType: string;
  branches: any | undefined;
};

export type AppSchedule = {
  weekName: any;
  startDateTime: string;
  endDateTime: string;
};
export type EditProfile = {
  firstName: string;
  lastName: string;
  avatar: any;
  address: string;
  country: string;
  state: string;
  city: string;
  zipCode: string;
  phone: string;
};

export type Password = {
  currentPassword: string;
  newPassword: string;
  reNewPassword: string;
};
