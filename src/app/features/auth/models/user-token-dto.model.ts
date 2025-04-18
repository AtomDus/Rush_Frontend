export interface UserTokenDto {
  token: string;
  wizard: UserSessionDto;
}
export interface UserSessionDto {
  id: number;
  role: string;
  fullName: string;
}
