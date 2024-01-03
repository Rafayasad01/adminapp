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
  coins: string;
  quantity: number;
  created_by: string;
  updated_by: string;
}

export interface CategoryServiceFaq {
  question: string;
  answer: string;
  created_by: string;
  updated_by: string;
}
