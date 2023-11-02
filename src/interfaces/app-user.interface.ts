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
  first_name: string;
  last_name: string;
  password: string;
  email: string;
  phone: number;
  postal_code: string;
  address: string;
  avatar: string;
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
