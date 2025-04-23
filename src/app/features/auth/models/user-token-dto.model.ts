export interface UserTokenDto {
  token: string;
  user: UserSessionDto;
}
export interface UserSessionDto {
  id: number;
  role: string;
  firstname: string;
  lastname: string;
}
