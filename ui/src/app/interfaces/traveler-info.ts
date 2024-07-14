export interface Name {
  firstName: string;
  lastName: string;
}

export interface Phone {
  deviceType: string;
  countryCallingCode: string;
  number: string;
}

export interface Document {
  documentType: string;
  birthPlace: string;
  issuanceLocation: string;
  issuanceDate: string;
  number: string;
  expiryDate: string;
  issuanceCountry: string;
  validityCountry: string;
  nationality: string;
  holder: boolean;
}

export interface Traveler {
  id: string;
  dateOfBirth: string;
  name: Name;
  gender: string;
  contact: {
    emailAddress: string;
    phones: Phone[];
  };
  documents: Document[];
}
