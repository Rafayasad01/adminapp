export interface Driver {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  license_number: string;
  start_time: string;
  end_time: string;
  address: string;
  avatar: any;
}

export interface DriverSchedule {
  start_time: string;
  end_time: string;
}

export interface DriverHistoryItem {
  amount: number;
}
