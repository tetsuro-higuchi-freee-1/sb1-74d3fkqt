import React from 'react';
import type { Product } from '../../types/roadmap';

interface TableRowProps {
  product: Product;
  onFeatureClick: (product: Product) => void;
}

const statusColors = {
  '開発着手前': 'bg-gray-100 text-gray-800',
  '開発中': 'bg-blue-100 text-blue-800',
  '開発完了': 'bg-green-100 text-green-800',
  '開発取りやめ': 'bg-red-100 text-red-800'
};

const publicStatusColors = {
  '確認前': 'bg-gray-100 text-gray-800',
  '可能': 'bg-green-100 text-green-800',
  '不可': 'bg-red-100 text-red-800'
};

export function TableRow({ product, onFeatureClick }: TableRowProps) {
  return (
    <tr 
      onClick={() => onFeatureClick(product)}
      className="hover:bg-gray-50 cursor-pointer transition-colors"
    >
      <td className="px-3 py-4 text-sm font-medium text-gray-900 truncate">{product.name}</td>
      <td className="px-3 py-4 text-sm text-gray-500 truncate">{product.majorCategory}</td>
      <td className="px-3 py-4 text-sm text-gray-500 truncate">{product.minorCategory}</td>
      <td className="px-3 py-4 text-sm text-gray-500 truncate">
        <span className="text-blue-600 hover:text-blue-800">
          {product.featureName}
        </span>
      </td>
      <td className="px-3 py-4 text-sm text-gray-500">
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[product.developmentStatus]}`}>
          {product.developmentStatus}
        </span>
      </td>
      <td className="px-3 py-4 text-sm text-gray-500">
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${publicStatusColors[product.isPublic]}`}>
          {product.isPublic}
        </span>
      </td>
      <td className="px-3 py-4 text-sm text-gray-500 truncate">{product.targetIndustry}</td>
      <td className="px-3 py-4 text-sm text-gray-500 truncate">{product.targetScale}</td>
      <td className="px-3 py-4 text-sm text-gray-500 truncate">{product.customerImpact}</td>
      <td className="px-3 py-4 text-sm text-gray-500 truncate">{product.releaseDate}</td>
      <td className="px-3 py-4 text-sm text-gray-500 truncate">{product.actualReleaseDate || '-'}</td>
    </tr>
  );
}