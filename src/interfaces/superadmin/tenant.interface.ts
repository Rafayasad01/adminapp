export interface Tenant {
  tenantName: string;
  email: string;
  address: string;
  firstName: string;
  lastName: string;
  trialMode: boolean;
  trialUpdateMode: boolean;
  trialStartDate: string;
  domain: string;
  // domainWebapp: string;
  enableLoyaltyProgram: boolean;
  loyaltyCoinConversionRate: string;
  requiredCoinsToRedeem: string;
  maxBranchLimit: number;
  maxUserLimit: number;
  userLimit: number;
  trialModeLimit: number;
  role: string;
  theme: any;
}
