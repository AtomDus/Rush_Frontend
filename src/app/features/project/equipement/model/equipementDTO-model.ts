export interface Equipement {
  id: number;
  name: string;
  owner: RentingCompany;
  description: string;
  model: string;
  type: string;
  serialNumber: string;
  plannedRevisionDate: string | null;
  condition: "NEW" | "GOOD" | "BROKEN" | "TO_BE_REVISED";
  stock: number;
  stockage: string;
  acquisitionDate: string | null;
  lastRevision: string | null;
}

export interface RentingCompany {
  id: number;
  name: string;
  address: string;
  city: string;
  country: string;
  zipCode: string;
  phoneNumber: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}
