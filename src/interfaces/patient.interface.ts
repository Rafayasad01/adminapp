export interface Patient {
  firstName: string;
  lastName: string;
  desc: string;
  gender: string;
  phone: string;
  email: string;
  age: string;
  status: string;
  occupation: string;
  address: string;
  avatar: any | File;
}

export interface PatientVisitComplaints {
  medicalNote: string;
  complaintName: string;
  complaintType: string;
  symptoms: string;
  diagnose: string;
  differentialDiagnosis: string;
  durationStartTime: any;
  durationEndTime: any;
  followupTime: any;
}

export interface PatientVisitPrescription {
  prescriptions: any;
  drugName: string;
  dosageForm: string;
  strength: string;
  dose: string;
  presDurationStartTime: any;
  presDurationEndTime: any;
}

export interface PatientVisitLabs {
  cbc: any;
  uce: string;
  lft: string;
  urineDr: string;
  biopsy: string;
  radiology: string;
  otherLabsDesc: string;
}

export interface PatientVisitScan {
  scanMedia: any[];
}
