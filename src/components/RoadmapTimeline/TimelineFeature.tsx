import React from 'react';
import type { Product } from '../../types/roadmap';

interface TimelineFeatureProps {
  feature: Product;
  onFeatureClick: (feature: Product) => void;
}

export function TimelineFeature({ feature, onFeatureClick }: TimelineFeatureProps) {
  const isCompleted = feature.developmentStatus === '開発完了';
  const displayDate = isCompleted ? feature.actualReleaseDate : feature.releaseDate;
  const formattedDate = displayDate ? new Date(displayDate).toLocaleDateString('ja-JP') : '-';

  const publicStatusColors = {
    '確認前': 'bg-gray-100 text-gray-800',
    '可能': 'bg-green-100 text-green-800',
    '不可': 'bg-red-100 text-red-800'
  };

  return (
    <div
      className={`mb-2 p-3 rounded-lg border cursor-pointer hover:shadow-md transition-shadow ${
        isCompleted ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
      }`}
      onClick={() => onFeatureClick(feature)}
    >
      <div className="flex flex-col gap-1">
        <h5 className="text-sm font-medium text-gray-900 hover:text-blue-600">
          {feature.featureName}
        </h5>
        <p className="text-xs text-gray-500">
          {feature.description}
        </p>
        <div className="flex items-center justify-between mt-1">
          <span className="text-xs text-gray-500">
            {isCompleted ? 'リリース日: ' : 'リリース予定日: '}
            {formattedDate}
          </span>
          {!isCompleted && (
            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${publicStatusColors[feature.isPublic]}`}>
              {feature.isPublic}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}