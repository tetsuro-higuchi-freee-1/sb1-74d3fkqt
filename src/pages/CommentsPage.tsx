import React from 'react';
import { useComments } from '../contexts/CommentContext';
import { useProductMaster } from '../contexts/ProductMasterContext';
import { MessageSquare } from 'lucide-react';
import { useUsers } from '../contexts/UserContext';

export function CommentsPage() {
  const { comments } = useComments();
  const { products } = useProductMaster();
  const { users } = useUsers();

  const getProductName = (featureId: string) => {
    const product = products.find(p => p.id === featureId);
    return product ? `${product.name} - ${product.featureName}` : '不明な機能';
  };

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

  const groupedComments = comments.reduce((acc, comment) => {
    const date = new Date(comment.createdAt).toLocaleDateString('ja-JP');
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(comment);
    return acc;
  }, {} as Record<string, typeof comments>);

  const sortedDates = Object.keys(groupedComments).sort((a, b) => 
    new Date(b).getTime() - new Date(a).getTime()
  );

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center">
          <MessageSquare className="h-6 w-6 mr-2" />
          コメント一覧
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          全ての機能に対するコメントを時系列で確認できます。
        </p>
      </div>

      <div className="space-y-8">
        {sortedDates.map(date => (
          <div key={date}>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              {date}
            </h2>
            <div className="space-y-4">
              {groupedComments[date].map(comment => (
                <div key={comment.id} className="bg-white shadow rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-gray-900">
                        {comment.user.name}
                      </span>
                      <span className="text-sm text-gray-500">
                        ({comment.user.role})
                      </span>
                    </div>
                    <time className="text-sm text-gray-500">
                      {new Date(comment.createdAt).toLocaleTimeString('ja-JP')}
                    </time>
                  </div>
                  <div className="mb-2">
                    <span className="text-sm font-medium text-blue-600">
                      {getProductName(comment.featureId)}
                    </span>
                  </div>
                  <p className="text-gray-700 whitespace-pre-wrap">
                    {formatContent(comment.content, comment.mentions)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}

        {sortedDates.length === 0 && (
          <div className="text-center py-12">
            <MessageSquare className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              コメントはありません
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              まだコメントが投稿されていません。
            </p>
          </div>
        )}
      </div>
    </div>
  );
}