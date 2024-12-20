import React, { useState } from 'react';
import { Filter } from 'lucide-react';
import { FilterPopover } from './FilterPopover';
import type { Sort, SortField } from '../../types/roadmap';

interface TableHeaderProps {
  onSort: (field: SortField) => void;
  onFilter: (field: string, value: string) => void;
  sort: Sort;
  filters: Record<string, string>;
}

export function TableHeader({ onSort, onFilter, sort, filters }: TableHeaderProps) {
  const [activePopover, setActivePopover] = useState<string | null>(null);
  const [popoverPosition, setPopoverPosition] = useState({ top: 0, left: 0 });

  const handleFilterClick = (event: React.MouseEvent, field: string) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setPopoverPosition({
      top: rect.bottom + window.scrollY + 5,
      left: rect.left + window.scrollX
    });
    setActivePopover(activePopover === field ? null : field);
  };

  const renderHeader = (label: string, field: SortField, hasFilter = false) => {
    return (
      <th className="px-3 py-3 bg-gray-50 text-left">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
            {label}
          </span>
          {hasFilter && (
            <button
              onClick={(e) => handleFilterClick(e, field)}
              className={`p-1 rounded-full hover:bg-gray-200 ${
                filters[field] ? 'text-blue-600' : 'text-gray-400'
              }`}
            >
              <Filter className="h-4 w-4" />
            </button>
          )}
        </div>

        {activePopover === field && (
          <FilterPopover
            isOpen={true}
            onClose={() => setActivePopover(null)}
            position={popoverPosition}
            field={field}
            label={label}
            sort={sort}
            onSort={onSort}
            onFilterChange={onFilter}
            currentFilter={filters[field] || ''}
            filterOptions={getFilterOptions(field)}
          />
        )}
      </th>
    );
  };

  const getFilterOptions = (field: string) => {
    switch (field) {
      case 'name':
        return [
          { value: 'クラウド会計', label: 'クラウド会計' },
          { value: 'クラウド給与', label: 'クラウド給与' },
          { value: 'クラウド請求書', label: 'クラウド請求書' },
          { value: 'クラウドマイナンバー', label: 'クラウドマイナンバー' }
        ];
      case 'developmentStatus':
        return [
          { value: '開発着手前', label: '開発着手前' },
          { value: '開発中', label: '開発中' },
          { value: '開発完了', label: '開発完了' },
          { value: '開発取りやめ', label: '開発取りやめ' }
        ];
      case 'isPublic':
        return [
          { value: '確認前', label: '確認前' },
          { value: '可能', label: '可能' },
          { value: '不可', label: '不可' }
        ];
      case 'customerImpact':
        return [
          { value: '高', label: '高' },
          { value: '中', label: '中' },
          { value: '低', label: '低' }
        ];
      default:
        return [];
    }
  };

  return (
    <thead className="bg-gray-50">
      <tr>
        {renderHeader('プロダクト名', 'name', true)}
        {renderHeader('機能大カテゴリ', 'majorCategory')}
        {renderHeader('機能小カテゴリ', 'minorCategory')}
        {renderHeader('機能名称', 'featureName')}
        {renderHeader('開発ステータス', 'developmentStatus', true)}
        {renderHeader('顧客公開可否', 'isPublic', true)}
        {renderHeader('ターゲット業種', 'targetIndustry')}
        {renderHeader('ターゲット規模', 'targetScale')}
        {renderHeader('顧客インパクト', 'customerImpact', true)}
        {renderHeader('リリース予定日', 'releaseDate')}
        {renderHeader('実際のリリース日', 'actualReleaseDate')}
      </tr>
    </thead>
  );
}