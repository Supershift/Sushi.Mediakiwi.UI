export interface INotification{
  message: string;
  isError: boolean;
  propertyNames: string[];
}
export interface INotificationModel {
  title: string;
  message: string;
  actionType: string;
  actionText: string;
  hasAction: boolean;
}
