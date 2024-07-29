export interface Services {
  categoryName: string;
  services: any;
  serviceName: any;
}

export interface BarberCategory {
  categoryName: string;
  categoryDesc: string;
  avatar: any;
}

export interface BarberCategoryServices {
  name: string;
  description: string;
  price: string;
  serviceTime: string;
  serviceType: string;
  avatar: any;
}

// employee services item
export interface BarberItemServices {
  // serviceTime: string;
  amount: string | any;
  amountType: string;
  categoryId?: string;
  serviceType: string;
  store: string;
}
