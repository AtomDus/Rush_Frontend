export interface Equipement {
  id: number;
  name: string;
  serialNumber: string;
  ownerId: number;
  plannedRevisionDate: string | null;
}
