import {Equipement} from '../equipement/model/equipementDTO-model';

export interface ProjectDTO {
  id: number;
  name: string;
  description: string;
  status: string;
  responsable: ResponsableDTO;
  employes: EmployeeDTO[];
  stages: StageDTO[];
  equipements: Equipement[];
  startingDate: Date;
  finishingDate: Date;
  budget: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ResponsableDTO {
  id: number;
  username: string;
  lastname: string;
  firstname: string;
  email: string;
  phoneNumber: string;
  jobTitle: string;
  isAvailable: boolean;
  status: string;
  role: string;
}

export interface EmployeeDTO {
  id: number;
  lastname: string;
  firstname: string;
  jobTitle: string;
  email: string;
  phoneNumber: string;
  isAvailable: boolean;
}

export interface StageDTO {
  id: number;
  name: string;
  description: string;
  startingDate: Date;
  finishingDate: Date;
  createdAt: Date;
  updatedAt: Date;
}
