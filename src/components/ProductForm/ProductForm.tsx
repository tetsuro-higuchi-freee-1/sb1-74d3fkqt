import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useProductMaster } from '../../contexts/ProductMasterContext';
import { rolePermissions } from '../../types/auth';
import type { Product } from '../../types/roadmap';

interface ProductFormProps {
  product?: Product;
  onSubmit: (data: Omit<Product, 'id'>) => void;
  onCancel: () => void;
}

export function ProductForm({ product, onSubmit, onCancel }: ProductFormProps) {
  const { user } = useAuth();
  const { products: productMaster } = useProductMaster();
  const permissions = user ? rolePermissions[user.role] : rolePermissions.sales;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const newProduct: Omit<Product, 'id'> = {
      name: formData.get('name') as string,
      majorCategory: formData.get('majorCategory') as string,
      minorCategory: formData.get('minorCategory') as string,
      featureName: formData.get('featureName') as string,
      description: formData.get('description') as string,
      developmentStatus: formData.get('developmentStatus') as Product['developmentStatus'],
      isPublic: formData.get('isPublic') as Product['isPublic'],
      targetIndustry: formData.get('targetIndustry') as string,
      targetScale: formData.get('targetScale') as string,
      customerImpact: formData.get('customerImpact') as string,
      releaseDate: formData.get('releaseDate') as string,
      actualReleaseDate: formData.get('actualReleaseDate') as string || null,
      projectManager: formData.get('projectManager') as string,
      productMarketing: formData.get('productMarketing') as string,
      documentationUrl: formData.get('documentationUrl') as string,
      figmaUrl: formData.get('figmaUrl') as string,
    };

    onSubmit(newProduct);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            プロダクト名
          </label>
          <select
            name="name"
            id="name"
            required
            defaultValue={product?.name || ''}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          >
            <option value="" disabled>プロダクトを選択してください</option>
            {productMaster.map((p) => (
              <option key={p.id} value={p.name}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="majorCategory" className="block text-sm font-medium text-gray-700">
            機能大カテゴリ
          </label>
          <input
            type="text"
            name="majorCategory"
            id="majorCategory"
            required
            defaultValue={product?.majorCategory}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="minorCategory" className="block text-sm font-medium text-gray-700">
            機能小カテゴリ
          </label>
          <input
            type="text"
            name="minorCategory"
            id="minorCategory"
            required
            defaultValue={product?.minorCategory}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="featureName" className="block text-sm font-medium text-gray-700">
            機能名称
          </label>
          <input
            type="text"
            name="featureName"
            id="featureName"
            required
            defaultValue={product?.featureName}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>

        <div className="col-span-2">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            機能概要
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

        <div>
          <label htmlFor="developmentStatus" className="block text-sm font-medium text-gray-700">
            開発ステータス
          </label>
          <select
            name="developmentStatus"
            id="developmentStatus"
            required
            defaultValue={product?.developmentStatus || '開発着手前'}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          >
            <option value="開発着手前">開発着手前</option>
            <option value="開発中">開発中</option>
            <option value="開発完了">開発完了</option>
            <option value="開発取りやめ">開発取りやめ</option>
          </select>
        </div>

        {permissions.canEditPublicStatus && (
          <div>
            <label htmlFor="isPublic" className="block text-sm font-medium text-gray-700">
              顧客公開可否
            </label>
            <select
              name="isPublic"
              id="isPublic"
              required
              defaultValue={product?.isPublic || '確認前'}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            >
              <option value="確認前">確認前</option>
              <option value="可能">可能</option>
              <option value="不可">不可</option>
            </select>
          </div>
        )}

        <div>
          <label htmlFor="targetIndustry" className="block text-sm font-medium text-gray-700">
            ターゲット業種
          </label>
          <input
            type="text"
            name="targetIndustry"
            id="targetIndustry"
            required
            defaultValue={product?.targetIndustry}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="targetScale" className="block text-sm font-medium text-gray-700">
            ターゲット規模
          </label>
          <input
            type="text"
            name="targetScale"
            id="targetScale"
            required
            defaultValue={product?.targetScale}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="customerImpact" className="block text-sm font-medium text-gray-700">
            顧客インパクト
          </label>
          <select
            name="customerImpact"
            id="customerImpact"
            required
            defaultValue={product?.customerImpact || '中'}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          >
            <option value="高">高</option>
            <option value="中">中</option>
            <option value="低">低</option>
          </select>
        </div>

        <div>
          <label htmlFor="releaseDate" className="block text-sm font-medium text-gray-700">
            リリース予定日
          </label>
          <input
            type="date"
            name="releaseDate"
            id="releaseDate"
            required
            defaultValue={product?.releaseDate}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="actualReleaseDate" className="block text-sm font-medium text-gray-700">
            実際のリリース日
          </label>
          <input
            type="date"
            name="actualReleaseDate"
            id="actualReleaseDate"
            defaultValue={product?.actualReleaseDate || ''}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="projectManager" className="block text-sm font-medium text-gray-700">
            担当PM
          </label>
          <input
            type="text"
            name="projectManager"
            id="projectManager"
            required
            defaultValue={product?.projectManager}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="productMarketing" className="block text-sm font-medium text-gray-700">
            担当PMM
          </label>
          <input
            type="text"
            name="productMarketing"
            id="productMarketing"
            required
            defaultValue={product?.productMarketing}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="documentationUrl" className="block text-sm font-medium text-gray-700">
            ドキュメントURL
          </label>
          <input
            type="url"
            name="documentationUrl"
            id="documentationUrl"
            defaultValue={product?.documentationUrl}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="figmaUrl" className="block text-sm font-medium text-gray-700">
            FigmaURL
          </label>
          <input
            type="url"
            name="figmaUrl"
            id="figmaUrl"
            defaultValue={product?.figmaUrl}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>
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