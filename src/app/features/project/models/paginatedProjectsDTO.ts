import {ProjectDTO} from './projectDTO';

export interface PaginatedProjectsDTO {
  content: ProjectDTO[];
  totalPages: number;
  totalElements: number;
}
