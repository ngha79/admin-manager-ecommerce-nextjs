export interface IConversations {
  conversations: IConversation[];
  conversation: IConversation | null;
  isLoading: boolean;
  replyMessage: IReplyMessage | null;
  page: number | null;
  newConversation: (conversation: IConversation) => void;
  setLoading: (loading: boolean) => void;
  setConversation: (conversation: IConversation) => void;
  setConversations: (
    conversations: IConversation[],
    page: number | null
  ) => void;
  paginationConversation: (
    conversations: IConversation[],
    page: number | null
  ) => void;
  removeConversation: (conversation: IConversation) => void;
  newMessageConversation: (
    message: IMessage,
    conversation: IConversation
  ) => void;
  updateMessageConversation: (
    message: IMessage,
    conversationId: string | string[]
  ) => void;
  deleteMessageConversation: (
    message: IMessage,
    conversationId: string | string[]
  ) => void;
  setReplyMessage: (replyMessage: IReplyMessage) => void;
  cancelReplyMessage: () => void;
  setMessagesPagination: (
    messages: IMessage[],
    conversationId: string,
    page: number | null
  ) => void;
}
export interface IConversation {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  user: IUserConversation;
  shop: IShopConversation;
  latestMessage: IMessage;
  messages: IMessage[] | [];
  page?: number | null;
}

export interface IUserConversation {
  id: string;
  userName: string;
  avatar: string;
}

export interface IShopConversation extends IUserConversation {}

export interface IMessage {
  id: number;
  content?: string;
  deletedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  images: IImageMessage[];
  user?: IUserConversation;
  shop?: IShopConversation;
  replyMessage?: IReply;
}

export interface IReply {
  id: number;
  message: IMessage;
  createdAt: Date;
  updatedAt: Date;
}

export interface IImageMessage {
  id: number;
  url: string;
  url_id?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IReplyMessage {
  messageId: number;
  conversationId: string;
  userName: string;
}
