import {RentingCompany} from '../../equipement/model/equipementDTO-model';

export interface CompanyDTO {
  id: number;
  name: string;
  address: string;
  zipCode: string;
  city: string;
  country: string;
  phoneNumber: string;
  email: string;
}

export function fromCompany(company: RentingCompany): CompanyDTO {
  return {
    id: company.id,
    name: company.name,
    address: company.address,
    zipCode: company.zipCode,
    city: company.city,
    country: company.country,
    phoneNumber: company.phoneNumber,
    email: company.email
  };
}
