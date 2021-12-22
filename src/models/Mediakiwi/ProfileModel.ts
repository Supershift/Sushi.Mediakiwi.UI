import { AuthenticateResponseModel } from "./Response/Authentication/AuthenticateResponseModel";

export default interface ProfileModel extends AuthenticateResponseModel {
  displayName?: string | null;
  roleID?: number | null;
  roleName?: string | null;
  email?: string | null;
  avatarPath?: string | null;
  company?: string | null;
}
