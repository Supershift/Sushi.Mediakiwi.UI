export interface IMessage {
    isError: boolean;
    message: string;
    propertyName: string | null;
    code: string | null;
}
