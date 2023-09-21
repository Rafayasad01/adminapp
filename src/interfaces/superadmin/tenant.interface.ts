export interface Tenant {
  tenantName: string;
  email: string;
  firstName: string;
  lastName: string;
  trialMode: boolean;
  trialUpdateMode: boolean;
  trailStartDate: string;
  developmentDomain: string;
  liveDomain: string;
}
