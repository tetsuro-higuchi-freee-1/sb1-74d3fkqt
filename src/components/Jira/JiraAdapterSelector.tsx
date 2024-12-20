import React from 'react';
import { Settings } from 'lucide-react';
import type { JiraAdapterType } from '../../services/jira/factory';

interface JiraAdapterSelectorProps {
  value: JiraAdapterType;
  onChange: (type: JiraAdapterType) => void;
}

export function JiraAdapterSelector({ value, onChange }: JiraAdapterSelectorProps) {
  return (
    <div className="flex items-center space-x-2">
      <Settings className="h-4 w-4 text-gray-500" />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as JiraAdapterType)}
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
      >
        <option value="direct">直接接続</option>
        <option value="proxy">バックエンドProxy</option>
        <option value="mock">モックデータ</option>
      </select>
    </div>
  );
}