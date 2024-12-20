import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { ProductMasterList } from './ProductMasterList';
import { ProductMasterForm } from './ProductMasterForm';
import { Modal } from '../Modal/Modal';
import { useProductMaster } from '../../contexts/ProductMasterContext';
import type { ProductMaster } from '../../types/productMaster';

export function ProductMasterManagement() {
  const { addProduct, updateProduct } = useProductMaster();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductMaster | null>(null);

  const handleAdd = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleEdit = (product: ProductMaster) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleSubmit = (data: ProductMasterFormData) => {
    if (editingProduct) {
      updateProduct(editingProduct.id, data);
    } else {
      addProduct(data);
    }
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="mb-4">
        <button
          onClick={handleAdd}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Plus className="h-5 w-5 mr-2" />
          プロダクトを追加
        </button>
      </div>

      <ProductMasterList onEdit={handleEdit} />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingProduct ? 'プロダクトを編集' : 'プロダクトを追加'}
      >
        <ProductMasterForm
          product={editingProduct || undefined}
          onSubmit={handleSubmit}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
}