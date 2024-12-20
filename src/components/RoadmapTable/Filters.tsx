import React from 'react';
import type { Filters } from '../../types/roadmap';

interface FiltersProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
}

export function Filters({ filters, onFilterChange }: FiltersProps) {
  return (
    <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
      <select
        className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
        value={filters.status}
        onChange={(e) => onFilterChange({ ...filters, status: e.target.value })}
      >
        <option value="">ステータス: すべて</option>
        <option value="planning">計画中</option>
        <option value="in-progress">開発中</option>
        <option value="review">レビュー中</option>
        <option value="completed">完了</option>
      </select>

      <select
        className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
        value={filters.isPublic}
        onChange={(e) => onFilterChange({ ...filters, isPublic: e.target.value })}
      >
        <option value="">公開状態: すべて</option>
        <option value="true">公開</option>
        <option value="false">非公開</option>
      </select>

      <select
        className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
        value={filters.impact}
        onChange={(e) => onFilterChange({ ...filters, impact: e.target.value })}
      >
        <option value="">インパクト: すべて</option>
        <option value="高">高</option>
        <option value="中">中</option>
        <option value="低">低</option>
      </select>
    </div>
  );
}