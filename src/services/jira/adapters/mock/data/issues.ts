import type { JiraIssue } from '../../../types';

export const mockIssues: JiraIssue[] = [
  {
    id: '307894',
    key: 'KNOQ-894',
    summary: 'クラウド会計の請求書自動作成機能の実装',
    status: 'In Progress',
    priority: 'High',
    assignee: '山田太郎',
    created: '2024-03-01T09:00:00.000Z',
    updated: '2024-03-15T14:30:00.000Z'
  },
  {
    id: '307893',
    key: 'KNOQ-893',
    summary: 'マイナンバー管理システムのセキュリティ強化',
    status: 'To Do',
    priority: 'Highest',
    assignee: '佐藤めぐみ',
    created: '2024-03-05T10:15:00.000Z',
    updated: '2024-03-14T16:45:00.000Z'
  },
  {
    id: '307892',
    key: 'KNOQ-892',
    summary: 'クラウド給与の年末調整機能の改善',
    status: 'Done',
    priority: 'Medium',
    assignee: '鈴木花子',
    created: '2024-02-28T08:30:00.000Z',
    updated: '2024-03-13T11:20:00.000Z'
  },
  {
    id: '307891',
    key: 'KNOQ-891',
    summary: 'クラウド会計の経費精算機能のUI改善',
    status: 'In Progress',
    priority: 'Medium',
    assignee: '田中一郎',
    created: '2024-03-08T13:45:00.000Z',
    updated: '2024-03-12T15:10:00.000Z'
  },
  {
    id: '307890',
    key: 'KNOQ-890',
    summary: 'マイナンバー管理システムの監査ログ機能の実装',
    status: 'To Do',
    priority: 'High',
    assignee: '高橋健一',
    created: '2024-03-10T11:30:00.000Z',
    updated: '2024-03-11T09:15:00.000Z'
  }
];