import { ProductCustomization } from './Product';

export type QuotationItem = {
  itemId: string;
  productId: string;
  quantity: number;
  unitPrice: number;
  color: string;
  productName: string;
  productCustomization: ProductCustomization[];
};

type Quotation = {
  id: string;
  appUserId: string;
  appUserName: string;
  quoteNumber: string;
  expiryDate: string;
  tax: string | null;
  total: string;
  discount: string;
  discountType: string;
  serviceCharges: string;
  serviceChargesType: string;
  projectCompletionDays: string;
  subtotal: string;
  items: QuotationItem[];
  createdBy: string;
  updatedBy: string | null;
  createdAt: string;
  updatedAt: string;
  tenant: string;
  deletedAt: string | null;
};

export default Quotation;
