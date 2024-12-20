import React from 'react';
import { CommentForm } from './CommentForm';
import { CommentList } from './CommentList';
import { UpdateHistory } from './UpdateHistory';
import { useComments } from '../../contexts/CommentContext';
import type { CommentFormData } from '../../types/comment';

interface CommentSectionProps {
  featureId: string;
  updates: { field: string; oldValue: string | null; newValue: string | null; timestamp: string }[];
}

export function CommentSection({ featureId, updates }: CommentSectionProps) {
  const { addComment, getFeatureComments } = useComments();
  const comments = getFeatureComments(featureId);

  const handleSubmit = (data: CommentFormData) => {
    addComment(featureId, data);
  };

  return (
    <div className="mt-8 space-y-6">
      <div>
        <h4 className="text-lg font-medium text-gray-900 mb-4">更新履歴</h4>
        <UpdateHistory updates={updates} />
      </div>

      <div>
        <h4 className="text-lg font-medium text-gray-900 mb-4">コメント</h4>
        <CommentForm onSubmit={handleSubmit} />
        {comments.length > 0 ? (
          <div className="mt-6">
            <CommentList comments={comments} />
          </div>
        ) : (
          <p className="mt-6 text-sm text-gray-500 text-center">
            まだコメントはありません
          </p>
        )}
      </div>
    </div>
  );
}