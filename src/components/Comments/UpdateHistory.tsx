import React from 'react';
import { History } from 'lucide-react';

interface UpdateHistoryProps {
  updates: {
    field: string;
    oldValue: string | null;
    newValue: string | null;
    timestamp: string;
  }[];
}

const fieldLabels: Record<string, string> = {
  name: 'プロダクト名',
  majorCategory: '機能大カテゴリ',
  minorCategory: '機能小カテゴリ',
  featureName: '機能名称',
  description: '機能概要',
  developmentStatus: '開発ステータス',
  isPublic: '顧客公開可否',
  targetIndustry: 'ターゲット業種',
  targetScale: 'ターゲット規模',
  customerImpact: '顧客インパクト',
  releaseDate: 'リリース予定日',
  actualReleaseDate: '実際のリリース日',
  projectManager: '担当PM',
  productMarketing: '担当PMM',
  documentationUrl: 'ドキュメントURL',
  figmaUrl: 'FigmaURL'
};

export function UpdateHistory({ updates }: UpdateHistoryProps) {
  if (updates.length === 0) {
    return (
      <div className="text-center py-6 bg-gray-50 rounded-lg">
        <History className="mx-auto h-6 w-6 text-gray-400" />
        <p className="mt-2 text-sm text-gray-500">更新履歴はありません</p>
      </div>
    );
  }

  return (
    <div className="flow-root">
      <ul role="list" className="-mb-8">
        {updates.map((update, updateIdx) => (
          <li key={updateIdx}>
            <div className="relative pb-8">
              {updateIdx !== updates.length - 1 ? (
                <span
                  className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                  aria-hidden="true"
                />
              ) : null}
              <div className="relative flex space-x-3">
                <div>
                  <span className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center ring-8 ring-white">
                    <History className="h-4 w-4 text-white" />
                  </span>
                </div>
                <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                  <div>
                    <p className="text-sm text-gray-500">
                      <span className="font-medium text-gray-900">
                        {fieldLabels[update.field]}
                      </span>
                      を更新
                    </p>
                    <div className="mt-1 text-sm">
                      <span className="text-red-500 line-through">
                        {update.oldValue || '(なし)'}
                      </span>
                      {' → '}
                      <span className="text-green-600">
                        {update.newValue || '(なし)'}
                      </span>
                    </div>
                  </div>
                  <div className="whitespace-nowrap text-right text-sm text-gray-500">
                    <time dateTime={update.timestamp}>
                      {new Date(update.timestamp).toLocaleString('ja-JP')}
                    </time>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}