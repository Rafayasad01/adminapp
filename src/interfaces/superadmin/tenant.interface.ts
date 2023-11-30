export interface Tenant {
  tenantName: string;
  email: string;
  address: string;
  firstName: string;
  lastName: string;
  trialMode: boolean;
  trialUpdateMode: boolean;
  trailStartDate: string;
  developmentDomain: string;
  liveDomain: string;
  maxBranchLimit: number;
  maxUserLimit: number;
  trialModeLimit: number;
  role: string;
}
