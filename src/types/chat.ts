
export interface ChatMessage {
  id: string;
  chatId: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  createdAt: string;
}

export interface Chat {
  id: string;
  userId: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  messages: ChatMessage[];
}

export interface ChatState {
  chats: Chat[];
  currentChat: Chat | null;
  isLoading: boolean;
  error: string | null;
}

export interface CreateChatRequest {
  title: string;
  initialMessage?: string;
}

export interface UpdateChatRequest {
  chatId: string;
  title?: string;
}

export interface CreateMessageRequest {
  chatId: string;
  content: string;
}
