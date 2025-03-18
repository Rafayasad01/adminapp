export interface SocialMedia {
  facebook: any;
  instagram: any;
  linkedin: any;
  twitter: any;
  youtube: any;
  whatsapp: any;
}

export interface Setting {
  name: string;
  address: string;
  desc: string;
  color1: string;
  color2: string;
  color3: string;
  logo: string;
  banner: string;
  gstPercentage: any;
  email: string;
  minOrderAmount: any;
  minimumDeliveryTime: number;
  deliveryUrgentFees: string;
  deliveryFee: any;
  facebook: string;
  instagram: string;
  linkedin: string;
  twitter: string;
  youtube: string;
  whatsapp: string;
  domainAdminapp: string;
  domainWebapp: string;
  userLimit: number;
  enableLoyaltyProgram: boolean;
  loyaltyCoinConversionRate: string;
  requiredCoinsToRedeem: string;
  media: any;
}

export interface AppImage {
  name: string;
  desc: string;
  avatar: any;
}
