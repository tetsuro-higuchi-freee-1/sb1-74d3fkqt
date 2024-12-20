import React from 'react';
import { ArrowDown, ArrowUp, X } from 'lucide-react';
import type { Sort, SortField } from '../../types/roadmap';

interface FilterOption {
  value: string;
  label: string;
}

interface FilterPopoverProps {
  isOpen: boolean;
  onClose: () => void;
  position: { top: number; left: number };
  field: SortField;
  label: string;
  sort: Sort;
  onSort: (field: SortField) => void;
  onFilterChange: (field: string, value: string) => void;
  currentFilter: string;
  filterOptions: FilterOption[];
}

export function FilterPopover({
  isOpen,
  onClose,
  position,
  field,
  label,
  sort,
  onSort,
  onFilterChange,
  currentFilter,
  filterOptions
}: FilterPopoverProps) {
  if (!isOpen) return null;

  const handleSortAsc = () => {
    onSort(field);
    if (sort.field === field && sort.direction === 'desc') {
      onSort(field);
    }
  };

  const handleSortDesc = () => {
    onSort(field);
    if (sort.field === field && sort.direction === 'asc') {
      onSort(field);
    }
  };

  return (
    <div
      className="fixed z-50 bg-white rounded-lg shadow-lg border border-gray-200 w-64"
      style={{ top: `${position.top}px`, left: `${position.left}px` }}
    >
      <div className="p-2 border-b border-gray-200 flex justify-between items-center">
        <span className="font-medium text-sm">{label}</span>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="p-2 space-y-2">
        <div className="space-y-1">
          <button
            onClick={handleSortAsc}
            className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded flex items-center space-x-2 ${
              sort.field === field && sort.direction === 'asc' ? 'bg-blue-50 text-blue-600' : ''
            }`}
          >
            <ArrowUp className="h-4 w-4" />
            <span>昇順で並び替え</span>
          </button>
          <button
            onClick={handleSortDesc}
            className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded flex items-center space-x-2 ${
              sort.field === field && sort.direction === 'desc' ? 'bg-blue-50 text-blue-600' : ''
            }`}
          >
            <ArrowDown className="h-4 w-4" />
            <span>降順で並び替え</span>
          </button>
        </div>
        {filterOptions.length > 0 && (
          <div className="border-t border-gray-200 pt-2">
            <select
              className="w-full text-sm border-gray-300 rounded-md"
              value={currentFilter}
              onChange={(e) => onFilterChange(field, e.target.value)}
            >
              <option value="">すべて表示</option>
              {filterOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </div>
  );
}