export interface ProjectDTO {
  id: number;
  name: string;
  description: string;
  status: string;
  responsableEmail: string;
  employees: EmployeeDTO[];
  startingDate: Date;
  finishingDate: Date;
  budget: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface EmployeeDTO {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  jobTitle: string;
}
