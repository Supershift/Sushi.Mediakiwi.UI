interface MessageModel {
    isError: boolean;
    message: string;
    propertyName: string | null;
    code: string | null;
}

export default  MessageModel;
