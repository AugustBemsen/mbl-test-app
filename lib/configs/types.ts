export type IUser = {
  unReadCount: number;
  messagesCount: number;
  user: {
    first_name: string;
    last_name: string;
    image: string;
    id: string;
  };
};

export type IMessage = {
  subject: string;
  content: string;
  sender: {
    _id: string;
    first_name: string;
    image: string;
    last_name: string;
  };
  recipient: string;
  isRead: boolean;
  _id: string;
  created_at: Date;
  updated_at: Date;
};
