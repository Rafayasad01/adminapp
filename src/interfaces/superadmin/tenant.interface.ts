export interface Tenant {
  tenantName: string;
  email: string;
  address: string;
  firstName: string;
  lastName: string;
  trialMode: boolean;
  trialUpdateMode: boolean;
  trialStartDate: string;
  developmentDomain: string;
  liveDomain: string;
  maxBranchLimit: number;
  maxUserLimit: number;
  userLimit: number;
  trialModeLimit: number;
  role: string;
  theme: any;
}
