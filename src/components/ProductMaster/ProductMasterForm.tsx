import React from 'react';
import type { ProductMaster, ProductMasterFormData } from '../../types/productMaster';

interface ProductMasterFormProps {
  product?: ProductMaster;
  onSubmit: (data: ProductMasterFormData) => void;
  onCancel: () => void;
}

export function ProductMasterForm({ product, onSubmit, onCancel }: ProductMasterFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const productData: ProductMasterFormData = {
      name: formData.get('name') as string,
      description: formData.get('description') as string,
    };

    onSubmit(productData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          プロダクト名
        </label>
        <input
          type="text"
          name="name"
          id="name"
          required
          defaultValue={product?.name}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          説明
        </label>
        <textarea
          name="description"
          id="description"
          rows={3}
          required
          defaultValue={product?.description}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        />
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          キャンセル
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {product ? '更新' : '追加'}
        </button>
      </div>
    </form>
  );
}