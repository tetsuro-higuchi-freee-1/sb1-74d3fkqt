import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { Comment, CommentFormData } from '../types/comment';
import { useAuth } from './AuthContext';

interface CommentContextType {
  comments: Comment[];
  addComment: (featureId: string, data: CommentFormData) => void;
  getFeatureComments: (featureId: string) => Comment[];
}

const CommentContext = createContext<CommentContextType | null>(null);

export function CommentProvider({ children }: { children: ReactNode }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const { user } = useAuth();

  const addComment = (featureId: string, data: CommentFormData) => {
    if (!user) return;

    const newComment: Comment = {
      id: Math.random().toString(36).substr(2, 9),
      featureId,
      userId: user.id,
      user: {
        name: user.name,
        role: user.role,
      },
      content: data.content,
      mentions: data.mentions || [],
      createdAt: new Date().toISOString(),
    };

    setComments(prev => [newComment, ...prev]);
  };

  const getFeatureComments = (featureId: string) => {
    return comments.filter(comment => comment.featureId === featureId);
  };

  return (
    <CommentContext.Provider value={{ comments, addComment, getFeatureComments }}>
      {children}
    </CommentContext.Provider>
  );
}

export function useComments() {
  const context = useContext(CommentContext);
  if (!context) {
    throw new Error('useComments must be used within a CommentProvider');
  }
  return context;
}