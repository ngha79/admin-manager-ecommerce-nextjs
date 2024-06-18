import {
  IConversation,
  IConversations,
  IMessage,
  IReplyMessage,
} from "@/types/conversations";
import { create } from "zustand";

type State = {
  conversations: IConversation[];
  conversation: IConversation | null;
  page: number | null;
  replyMessage: IReplyMessage | null;
};

const setConversation = (conver: IConversation, state: State) => {
  if (!state.conversation) {
    return { ...state, conversation: conver };
  }
  const newConversations = state.conversations.map((conversation) => {
    if (state.conversation && conversation.id === state.conversation.id) {
      return state.conversation;
    }
    return conversation;
  });
  return { ...state, conversation: conver, conversations: newConversations };
};

const setConversations = (
  convers: IConversation[],
  page: number | null,
  state: State
) => {
  return { ...state, conversations: convers, page };
};

const paginationConversation = (
  convers: IConversation[],
  page: number | null,
  state: State
) => {
  return {
    ...state,
    conversations: [...state.conversations, ...convers],
    page: page,
  };
};

const setReplyMessage = (replyMessage: IReplyMessage, state: State) => {
  return {
    ...state,
    replyMessage,
  };
};

const cancelReplyMessage = (state: State) => {
  return {
    ...state,
    replyMessage: null,
  };
};

const setMessagesPagination = (
  messages: IMessage[],
  conversationId: string,
  page: number | null,
  state: State
) => {
  if (state.conversation && state.conversation.id === conversationId) {
    const conversation = state.conversation;
    const messagesConversation = [...state.conversation?.messages, ...messages];
    conversation.messages = messagesConversation;
    conversation.page = page;
    return {
      ...state,
      conversation,
    };
  }
  return state;
};

const updateMessageConversation = (
  message: IMessage,
  conversationId: string | string[],
  state: State
) => {
  if (state.conversation) {
    if (state.conversation.id === conversationId) {
      const newMessages = state.conversation.messages.map((msg) => {
        if (msg.id === message.id) {
          return message;
        }
        return msg;
      });
      return {
        ...state,
        conversation: { ...state.conversation, messages: newMessages },
      };
    }
  }
  const updateConversation = state.conversations.map((item) => {
    if (item.id === conversationId) {
      const newUpdate = item.messages.map((msg) => {
        if (msg.id === message.id) {
          msg.content = message.content;
        }
        return msg;
      });
      item.messages = newUpdate;
    }
    return item;
  });

  return {
    ...state,
    conversations: updateConversation,
  };
};

const deleteMessageConversation = (
  message: IMessage,
  conversationId: string | string[],
  state: State
) => {
  if (state.conversation) {
    if (state.conversation.id === conversationId) {
      const newMessages = state.conversation.messages.map((msg) => {
        if (msg.id === message.id) {
          return message;
        }
        return msg;
      });
      return {
        ...state,
        conversation: { ...state.conversation, messages: newMessages },
      };
    }
  }
  const updateConversation = state.conversations.map((item) => {
    if (item.id === conversationId) {
      const newUpdate = item.messages.map((msg) =>
        msg.id === message.id ? message : msg
      );
      item.messages = newUpdate;
      item.latestMessage = message;
    }
    return item;
  });
  return {
    ...state,
    conversations: updateConversation,
  };
};

const newMessageConversation = (
  message: IMessage,
  conversation: IConversation,
  state: State
): State => {
  const updateConversation = state.conversation;
  if (updateConversation && state.conversation?.id === conversation.id) {
    updateConversation.messages = [message, ...state.conversation?.messages];
  }
  const existingConversation = state.conversations.find(
    (item) => item.id === conversation.id
  );
  if (!existingConversation) {
    conversation.latestMessage = message;
    if (!conversation.messages.find((msg) => msg.id === message.id)) {
      conversation.messages = [message, ...conversation.messages];
    }
    return {
      ...state,
      conversations: [conversation, ...state.conversations],
      conversation: updateConversation,
    };
  }
  const updatedConversations = state.conversations.map((conver) => {
    if (conver.id === conversation.id) {
      return {
        ...conver,
        messages: [message, ...(conver.messages || [])],
        latestMessage: message,
      };
    }
    return conver;
  });
  const updatedState: State = {
    ...state,
    conversations: updatedConversations,
    conversation: updateConversation,
  };

  return updatedState;
};

export const useConversationStore = create<IConversations>()((set) => ({
  conversations: [],
  conversation: null,
  isLoading: true,
  replyMessage: null,
  page: null,
  setLoading: (loading: boolean) =>
    set((state) => ({ ...state, isLoading: loading })),
  newConversation: (conver) =>
    set((state) => ({
      ...state,
      conversations: [conver, ...state.conversations],
    })),
  setConversation: (conver) => set((state) => setConversation(conver, state)),
  setConversations: (convers, page) =>
    set((state) => setConversations(convers, page, state)),
  paginationConversation: (convers, page) =>
    set((state) => paginationConversation(convers, page, state)),
  removeConversation: (conver) =>
    set((state) => ({
      conversations: [
        ...state.conversations.filter((item) => item.id !== conver.id),
        conver,
      ],
    })),
  setMessagesPagination: (messages, conversationId, page) =>
    set((state: State) =>
      setMessagesPagination(messages, conversationId, page, state)
    ),
  deleteMessageConversation: (message, conversationId) =>
    set((state: State) =>
      deleteMessageConversation(message, conversationId, state)
    ),
  newMessageConversation: (message, conversation) =>
    set((state: State) => newMessageConversation(message, conversation, state)),
  updateMessageConversation: (message, conversationId) =>
    set((state: State) =>
      updateMessageConversation(message, conversationId, state)
    ),
  setReplyMessage: (reply) => set((state) => setReplyMessage(reply, state)),
  cancelReplyMessage: () => set((state) => cancelReplyMessage(state)),
}));
