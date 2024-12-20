import React from 'react';
import { useOperationLog } from '../../contexts/OperationLogContext';
import type { OperationLog } from '../../types/operationLog';

const operationTypeLabels = {
  create: '追加',
  update: '編集',
  delete: '削除'
};

function formatFieldName(field: string): string {
  const fieldLabels: Record<string, string> = {
    // Feature fields
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
    figmaUrl: 'FigmaURL',
    // User fields
    email: 'メールアドレス',
    role: 'ロール',
    isAdmin: '管理者権限'
  };

  return fieldLabels[field] || field;
}

function formatFieldValue(field: string, value: string | null): string {
  if (value === null) return '(なし)';

  switch (field) {
    case 'role':
      switch (value) {
        case 'sales': return '営業担当';
        case 'product_manager': return 'プロダクトマネージャー';
        case 'product_owner': return 'プロダクトオーナー';
        default: return value;
      }
    case 'isAdmin':
      return value === 'true' ? '有効' : '無効';
    default:
      return value;
  }
}

function LogDetails({ log }: { log: OperationLog }) {
  return (
    <div className="mt-2 text-sm text-gray-500">
      {log.operationType === 'update' && log.changes.length > 0 && (
        <div className="space-y-1">
          {log.changes.map((change, index) => (
            <div key={index} className="grid grid-cols-3 gap-2">
              <div>{formatFieldName(change.field)}</div>
              <div className="text-red-500 line-through">
                {formatFieldValue(change.field, change.oldValue)}
              </div>
              <div className="text-green-500">
                {formatFieldValue(change.field, change.newValue)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function OperationLogList() {
  const { logs } = useOperationLog();

  return (
    <div className="flow-root">
      <ul role="list" className="-mb-8">
        {logs.map((log, logIdx) => (
          <li key={log.id}>
            <div className="relative pb-8">
              {logIdx !== logs.length - 1 ? (
                <span
                  className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                  aria-hidden="true"
                />
              ) : null}
              <div className="relative flex space-x-3">
                <div>
                  <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white
                    ${log.operationType === 'create' ? 'bg-green-500' : ''}
                    ${log.operationType === 'update' ? 'bg-blue-500' : ''}
                    ${log.operationType === 'delete' ? 'bg-red-500' : ''}
                  `}>
                    <span className="text-white text-xs font-medium">
                      {operationTypeLabels[log.operationType].charAt(0)}
                    </span>
                  </span>
                </div>
                <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                  <div>
                    <p className="text-sm text-gray-500">
                      <span className="font-medium text-gray-900">{log.userName}</span>
                      {' '}が{' '}
                      <span className="font-medium text-gray-900">
                        {log.targetType === 'user' ? 'メンバー' : '機能'}: {log.targetName}
                      </span>
                      {' '}を{operationTypeLabels[log.operationType]}しました
                    </p>
                    <LogDetails log={log} />
                  </div>
                  <div className="whitespace-nowrap text-right text-sm text-gray-500">
                    <time dateTime={log.timestamp}>
                      {new Date(log.timestamp).toLocaleString('ja-JP')}
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