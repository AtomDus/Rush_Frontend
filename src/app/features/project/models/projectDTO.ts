export interface ProjectDTO {
  id: number;
  name: string;
  description: string;
  status: StatusDTO;
  employees: EmployeeDTO[];
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface StatusDTO {
  id: number;
  name: string;
}

export interface EmployeeDTO {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  jobTitle: string;
}
