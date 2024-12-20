import React, { useState } from 'react';
import { Pencil, Trash, Clock, ExternalLink } from 'lucide-react';
import { Modal } from '../Modal/Modal';
import { ProductForm } from '../ProductForm/ProductForm';
import { CommentSection } from '../Comments/CommentSection';
import { getJiraIssueUrl, isJiraKey } from '../../services/jira/utils/url';
import type { Product } from '../../types/roadmap';
import { useAuth } from '../../contexts/AuthContext';
import { rolePermissions } from '../../types/auth';
import { useOperationLog } from '../../contexts/OperationLogContext';

interface FeatureDetailsModalProps {
  product: Product | null;
  onClose: () => void;
  onEdit?: (product: Product) => void;
  onDelete?: (productId: string) => void;
}

export function FeatureDetailsModal({ product, onClose, onEdit, onDelete }: FeatureDetailsModalProps) {
  const { user } = useAuth();
  const { logs } = useOperationLog();
  const permissions = user ? rolePermissions[user.role] : rolePermissions.sales;
  const [isEditing, setIsEditing] = useState(false);

  if (!product) return null;

  const handleEdit = (updatedProduct: Omit<Product, 'id'>) => {
    onEdit?.({ ...updatedProduct, id: product.id });
    setIsEditing(false);
    onClose();
  };

  const handleDelete = () => {
    if (window.confirm('本当に削除しますか？')) {
      onDelete?.(product.id);
      onClose();
    }
  };

  const updates = logs
    .filter(log => log.targetId === product.id && log.operationType === 'update')
    .flatMap(log => log.changes.map(change => ({
      field: change.field,
      oldValue: change.oldValue,
      newValue: change.newValue,
      timestamp: log.timestamp
    })));

  if (isEditing) {
    return (
      <Modal
        isOpen={true}
        onClose={() => setIsEditing(false)}
        title="機能を編集"
      >
        <ProductForm
          product={product}
          onSubmit={handleEdit}
          onCancel={() => setIsEditing(false)}
        />
      </Modal>
    );
  }

  return (
    <Modal
      isOpen={!!product}
      onClose={onClose}
      title={
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-4">
            <span className="mr-8">{product.featureName}</span>
            <span className="flex items-center text-sm text-gray-500">
              <Clock className="h-4 w-4 mr-1" />
              最終更新: {new Date(product.updatedAt).toLocaleString('ja-JP')}
            </span>
          </div>
          <div className="flex items-center space-x-4">
            {permissions.canEdit && (
              <button
                onClick={() => setIsEditing(true)}
                className="p-1 text-blue-600 hover:text-blue-800 transition-colors"
                title="編集"
              >
                <Pencil className="h-5 w-5" />
              </button>
            )}
            {permissions.canDelete && (
              <button
                onClick={handleDelete}
                className="p-1 text-red-600 hover:text-red-800 transition-colors"
                title="削除"
              >
                <Trash className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>
      }
    >
      <div className="space-y-6">
        <div>
          <h4 className="text-sm font-medium text-gray-500">機能概要</h4>
          <p className="mt-2 text-sm text-gray-900">{product.description}</p>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-medium text-gray-500">プロダクト名</h4>
            {isJiraKey(product.name) ? (
              <a
                href={getJiraIssueUrl(product.name)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 text-sm text-blue-600 hover:text-blue-800 flex items-center"
              >
                {product.name}
                <ExternalLink className="h-4 w-4 ml-1" />
              </a>
            ) : (
              <p className="mt-2 text-sm text-gray-900">{product.name}</p>
            )}
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-500">機能大カテゴリ</h4>
            <p className="mt-2 text-sm text-gray-900">{product.majorCategory}</p>
          </div>

          {/* 残りのフィールドは変更なし */}
          {/* ... */}
        </div>

        <CommentSection featureId={product.id} updates={updates} />
      </div>
    </Modal>
  );
}