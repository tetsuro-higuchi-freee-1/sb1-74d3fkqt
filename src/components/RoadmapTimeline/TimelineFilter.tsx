import React, { useState } from 'react';
import { Filter, Search, Check } from 'lucide-react';

interface TimelineFilterProps {
  products: string[];
  selectedProducts: string[];
  onFilterChange: (products: string[]) => void;
}

export function TimelineFilter({ products, selectedProducts, onFilterChange }: TimelineFilterProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleProductToggle = (productName: string) => {
    if (selectedProducts.includes(productName)) {
      onFilterChange(selectedProducts.filter(p => p !== productName));
    } else {
      onFilterChange([...selectedProducts, productName]);
    }
  };

  const handleSelectAll = () => {
    onFilterChange(products);
  };

  const handleClearAll = () => {
    onFilterChange([]);
  };

  const filteredProducts = products.filter(product =>
    product.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mb-6 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">プロダクトで絞り込み</span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-500">
            選択中: {selectedProducts.length} / {products.length}
          </div>
          <div className="flex space-x-2">
            <button
              onClick={handleSelectAll}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              すべて選択
            </button>
            <span className="text-gray-300">|</span>
            <button
              onClick={handleClearAll}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              すべて解除
            </button>
          </div>
        </div>
      </div>

      <div className="relative mb-4">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="プロダクト名で検索..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        {filteredProducts.map(product => (
          <button
            key={product}
            onClick={() => handleProductToggle(product)}
            className={`
              flex items-center justify-between px-4 py-2 rounded-lg text-sm font-medium 
              transition-all duration-200 relative overflow-hidden
              ${selectedProducts.includes(product)
                ? 'bg-blue-50 text-blue-700 border-2 border-blue-500'
                : 'bg-gray-50 text-gray-700 border border-gray-200 hover:border-gray-300'
              }
            `}
          >
            <span className="truncate">{product}</span>
            {selectedProducts.includes(product) && (
              <Check className="h-4 w-4 text-blue-500 flex-shrink-0 ml-2" />
            )}
          </button>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-4 text-sm text-gray-500">
          検索結果が見つかりません
        </div>
      )}
    </div>
  );
}