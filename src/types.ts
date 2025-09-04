export type NormalizedAddress = {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country?: string;
};

export type Applicant = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  dateOfBirth: string;
  ssnLast4?: string;
  ssnFull?: string;
  addresses7yr?: NormalizedAddress[];
  employments10yr?: Array<{ employer: string; startDate: string; endDate?: string }>;
  consentPdfKey?: string;
  ipAddress?: string;
  signatureTs?: string;
};
