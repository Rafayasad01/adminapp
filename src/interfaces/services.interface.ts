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
  avatar: any;
}

// employee services item
export interface BarberItemServices {
  amount: string;
  amountType: string;
  minutes: string;
  categoryId?: string;
  storeServiceCategoryItem: string;
}
