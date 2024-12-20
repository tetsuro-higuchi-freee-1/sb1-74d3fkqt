import React, { useState } from 'react';
import { TableHeader } from './TableHeader';
import { TableRow } from './TableRow';
import { FeatureDetailsModal } from './FeatureDetailsModal';
import { useRoadmapData } from '../../hooks/useRoadmapData';
import type { Product } from '../../types/roadmap';

interface RoadmapTableProps {
  products: Product[];
  onEdit?: (product: Product) => void;
  onDelete?: (productId: string) => void;
}

export function RoadmapTable({ products: initialProducts, onEdit, onDelete }: RoadmapTableProps) {
  const {
    products: filteredProducts,
    sort,
    filters,
    handleSort,
    handleFilter
  } = useRoadmapData(initialProducts);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <TableHeader 
                onSort={handleSort}
                onFilter={handleFilter}
                sort={sort}
                filters={filters}
              />
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProducts.map((product) => (
                  <TableRow
                    key={product.id}
                    product={product}
                    onFeatureClick={setSelectedProduct}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <FeatureDetailsModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </div>
  );
}