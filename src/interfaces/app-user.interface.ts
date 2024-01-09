export interface AppUserDriverExt {
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
}

export interface AppUser {
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
}

export interface AppUserAddress {
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  type: string;
}

export interface AppUserEmployees {
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export interface AppSchedule {
  weekName: any;
  startDateTime: string;
  endDateTime: string;
}
export interface EditProfile {
  firstName: string;
  lastName: string;
  avatar: any;
  address: string;
  country: string;
  state: string;
  city: string;
  zipCode: string;
  phone: string;
}

export interface Password {
  currentPassword: string;
  newPassword: string;
  reNewPassword: string;
}
