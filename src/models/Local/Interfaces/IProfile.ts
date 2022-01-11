import { IAuthenticateResponse } from "../../Mediakiwi/Interfaces";
export interface IProfile extends IAuthenticateResponse {
  displayName?: string | null;
  roleID?: number | null;
  roleName?: string | null;
  email?: string | null;
  avatarPath?: string | null;
  company?: string | null;
}
