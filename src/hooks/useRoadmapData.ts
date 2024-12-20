import { useState, useMemo } from 'react';
import type { Product, Sort, SortField } from '../types/roadmap';

export function useRoadmapData(initialProducts: Product[]) {
  const [sort, setSort] = useState<Sort>({ field: 'name', direction: 'asc' });
  const [filters, setFilters] = useState<Record<string, string>>({});

  const handleSort = (field: SortField) => {
    setSort(prev => ({
      field,
      direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleFilter = (field: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...initialProducts];

    // Apply filters
    Object.entries(filters).forEach(([field, value]) => {
      if (value) {
        result = result.filter(product => product[field as keyof Product] === value);
      }
    });

    // Sort by product name first, then by release date
    result.sort((a, b) => {
      // First, compare by product name
      const nameComparison = a.name.localeCompare(b.name);
      if (nameComparison !== 0) {
        return nameComparison;
      }

      // If names are equal, compare by release date
      const aDate = new Date(a.releaseDate).getTime();
      const bDate = new Date(b.releaseDate).getTime();
      return aDate - bDate;
    });

    // If user has selected a different sort field, apply that sort
    if (sort.field !== 'name') {
      result.sort((a, b) => {
        const aValue = a[sort.field];
        const bValue = b[sort.field];

        if (aValue === null) return 1;
        if (bValue === null) return -1;

        if (sort.field === 'releaseDate' || sort.field === 'actualReleaseDate') {
          return sort.direction === 'asc' 
            ? new Date(String(aValue)).getTime() - new Date(String(bValue)).getTime()
            : new Date(String(bValue)).getTime() - new Date(String(aValue)).getTime();
        }

        const comparison = String(aValue).localeCompare(String(bValue));
        return sort.direction === 'asc' ? comparison : -comparison;
      });
    }

    return result;
  }, [initialProducts, sort, filters]);

  return {
    products: filteredAndSortedProducts,
    sort,
    filters,
    handleSort,
    handleFilter
  };
}