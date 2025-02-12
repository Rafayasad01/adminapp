export interface Project {
  name: string;
  clientName: string;
  supervisorName: string;
  type: string;
  constructionType: string;
  budget: string;
  totalPaid: string;
  dueAmount: string;
  address: string;
  startDate: any;
  endDate: any;
  demolitionDays: string;
  constructionDays: string;
  finishingDays: string;
  neBankAccount: any;
  termsCondition: any;
}

export interface ProjectPlan {
  videos: string;
  file: any;
  day: string;
}
