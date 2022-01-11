import {IMessage} from "@/models/Local/Interfaces";

export interface IResetPasswordContent {
  resetEmailPlaceholder: string;
  resetButtonText: string;
  resetHeadlineText: string;
}

export interface ILoginContent {
  loginCreateAccountText: string;
  loginForgotPasswordText: string;
  loginPasswordPlaceholder: string;
  loginEmailPlaceholder: string;
  loginButtonText: string;
  loginHeadlineText: string;
}

export interface IForgotPasswordContent {
  forgottenEmailPlaceholder: string;
  fogottenButtonText: string;
  forgottenHeadlineText: string;
}

export interface IBaseContent {
  errors: IMessage[];
  login: ILoginContent,
  forgotten: IForgotPasswordContent,
  reset: IResetPasswordContent,
}
