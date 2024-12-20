import React from 'react';
import { useUsers } from '../../contexts/UserContext';
import type { Comment } from '../../types/comment';

interface CommentListProps {
  comments: Comment[];
}

function getRoleLabel(role: string): string {
  switch (role) {
    case 'sales':
      return '営業担当';
    case 'product_manager':
      return 'プロダクトマネージャー';
    case 'product_owner':
      return 'プロダクトオーナー';
    default:
      return role;
  }
}

export function CommentList({ comments }: CommentListProps) {
  const { users } = useUsers();

  const formatContent = (content: string, mentions: string[] = []) => {
    let formattedContent = content;
    mentions.forEach(userId => {
      const user = users.find(u => u.id === userId);
      if (user) {
        const regex = new RegExp(`@${user.name}\\b`, 'g');
        formattedContent = formattedContent.replace(
          regex,
          `<span class="text-blue-600 font-medium">@${user.name}</span>`
        );
      }
    });
    return <span dangerouslySetInnerHTML={{ __html: formattedContent }} />;
  };

  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <div key={comment.id} className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <span className="font-medium text-gray-900">{comment.user.name}</span>
              <span className="text-sm text-gray-500">({getRoleLabel(comment.user.role)})</span>
            </div>
            <time className="text-sm text-gray-500">
              {new Date(comment.createdAt).toLocaleString('ja-JP')}
            </time>
          </div>
          <p className="text-gray-700 whitespace-pre-wrap">
            {formatContent(comment.content, comment.mentions)}
          </p>
        </div>
      ))}
    </div>
  );
}