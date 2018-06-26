export interface NotificationInterface {
  id: string;
  // type: string;
  instructor?: Boolean;
  stundent?: Boolean;
  courseId?: string;
}

export interface ArrayNotificationInterface {
  id: string;
  notifications: NotificationInterface[];
}


