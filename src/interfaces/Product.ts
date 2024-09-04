export type ProductCustomization = {
  tax: string;
  color: string;
  price: string;
};

type Product = {
  id: string;
  name: string;
  productGroup: string;
  productName: string;
  mobileNumber: string;
  itemCode: string;
  brandName: string;
  costPrice: string;
  tax: string;
  itemWeight: string;
  itemDimension: string;
  address: string;
  desc: string;
  vendorDiscount: string;
  stockAvailability: string;
  stockQuantity: string;
  stockDimension: string;
  sparePartAvailability: string;
  warranty: string;
  serviceCenter: string;
  rustProof: string;
  averageLife: string;
  features: string;
  createdAt: string; // Date could also be used if you parse the string into Date objects
  updatedAt: string; // Date could also be used if you parse the string into Date objects
  tenant: string;
  isActive: boolean;
  isDeleted: boolean;
  productCustomization: ProductCustomization[];
  productImages: string[];
  stockDimensionType: string;
  vendorId: string;
};

export default Product;
