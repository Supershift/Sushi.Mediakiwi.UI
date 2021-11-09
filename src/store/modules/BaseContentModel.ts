import MessageModel from "@/models/MessageModel";

export default interface ResetPasswordContentModel {
  resetEmailPlaceholder: string;
  resetButtonText: string;
  resetHeadlineText: string;
}

export interface LoginContentModel {
  loginCreateAccountText: string;
  loginForgotPasswordText: string;
  loginPasswordPlaceholder: string;
  loginEmailPlaceholder: string;
  loginButtonText: string;
  loginHeadlineText: string;
}

export interface ForgotPasswordContentModel {
  forgottenEmailPlaceholder: string;
  fogottenButtonText: string;
  forgottenHeadlineText: string;
}

export interface BaseContentModel {
  errors: MessageModel[];
  login: LoginContentModel,
  forgotten: ForgotPasswordContentModel,
  reset: ResetPasswordContentModel,
}
