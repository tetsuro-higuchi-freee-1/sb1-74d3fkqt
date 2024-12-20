export const tableColumns = [
  { id: 'name', width: 'w-48', label: 'プロダクト名' },
  { id: 'majorCategory', width: 'w-48', label: '機能大カテゴリ' },
  { id: 'minorCategory', width: 'w-48', label: '機能小カテゴリ' },
  { id: 'featureName', width: 'w-64', label: '機能名称' },
  { id: 'developmentStatus', width: 'w-36', label: '開発ステータス' },
  { id: 'isPublic', width: 'w-36', label: '顧客公開可否' },
  { id: 'targetIndustry', width: 'w-48', label: 'ターゲット業種' },
  { id: 'targetScale', width: 'w-48', label: 'ターゲット規模' },
  { id: 'customerImpact', width: 'w-36', label: '顧客インパクト' },
  { id: 'releaseDate', width: 'w-40', label: 'リリース予定日' },
  { id: 'actualReleaseDate', width: 'w-40', label: '実際のリリース日' }
] as const;