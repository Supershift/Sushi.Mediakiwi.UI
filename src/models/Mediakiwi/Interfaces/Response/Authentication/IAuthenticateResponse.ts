export interface IAuthenticateResponse {
    statusCode: number;
    message: string;
    targetUrl: string;
    userEmail: string;
    userName: string;
    userAvatarUrl: string;
}