import type { User } from './user';

export interface Comment {
  id: string;
  featureId: string;
  userId: string;
  user: {
    name: string;
    role: string;
  };
  content: string;
  mentions: string[]; // Array of mentioned user IDs
  createdAt: string;
}

export interface CommentFormData {
  content: string;
  mentions: string[];
}

export interface MentionSuggestion {
  id: string;
  name: string;
  role: string;
}