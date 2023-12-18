export interface Permissions {
  moduleName: string;
  moduleDesc: string;
  name: string;
  desc: string;
  permissionSequence: any;
  action: string;
  permissionType: string;
  showOnMenu: any;
  permissionParent: string;
  createdBy: string;
  updatedBy: string;
  [key: string]: string;
}
