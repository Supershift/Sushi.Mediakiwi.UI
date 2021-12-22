export interface AuthenticateResponseModel {
    statusCode: number;
    message: string;
    targetUrl: string;
    userEmail: string;
    userName: string;
    userAvatarUrl: string;
}