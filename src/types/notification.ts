export interface INotification {
  id: string;
  noti_is_read: boolean;
  noti_title: string;
  noti_desc: string;
  noti_url: string;
  notificationImages: INotificationImage[];
  createdAt: Date;
  updatedAt: Date;
}

export interface INotificationImage {
  id: number;
  url: string;
  url_id: string;
}

export interface INotificationStore {
  notifications: INotification[];
  page: number | null;
  isLoading: boolean;
  setLoading: () => void;
  setNotification: (noti: INotification[], page: number | null) => void;
  setNotificationPagination: (
    noti: INotification[],
    page: number | null
  ) => void;
  setAllNotificationIsRead: () => void;
  newNotification: (noti: INotification) => void;
  deleteNotification: (notiId: string) => void;
}
