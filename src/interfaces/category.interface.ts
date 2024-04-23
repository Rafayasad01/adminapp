export interface Category {
  name: string;
  desc: string;
  icon: string;
}

export interface CategoryService {
  name: string;
  desc: string;
  icon: string;
  price: number;
  loyaltyCoins: string;
  quantity: number;
}

export interface CategoryServiceFaq {
  question: string;
  answer: string;
  created_by: string;
  updated_by: string;
}

export interface AppCategories {
  id: string;
  name: string;
  desc: string;
  icon: string;
  banner: string;
  createdBy: string;
  updatedBy: string;
  createdDate: string;
  updatedDate: string;
  tenant: string;
  isActive: boolean;
  isDeleted: boolean;
}

export interface AppCategoryItems {
  id: string;
  name: string;
  icon: string;
  banner: string;
  desc: string;
  price: string;
  isActive: boolean;
  homeCategory: string;
  createdBy: string;
  updatedBy: string;
  createdDate: string;
  updatedDate: string;
  quantity: number;
  isDeleted: boolean;
  loyaltyCoins: string;
}
