import React, { useState, useRef } from 'react';
import { Table2, CalendarDays, Download } from 'lucide-react';
import { RoadmapTable } from '../components/RoadmapTable/RoadmapTable';
import { RoadmapTimeline } from '../components/RoadmapTimeline/RoadmapTimeline';
import { TimelineExportModal } from '../components/RoadmapTimeline/TimelineExportModal';
import { AddFeatureButton } from '../components/RoadmapTable/AddFeatureButton';
import { RefreshButton } from '../components/RoadmapTable/RefreshButton';
import { Modal } from '../components/Modal/Modal';
import { ProductForm } from '../components/ProductForm/ProductForm';
import { useProducts } from '../hooks/useProducts';
import { useJiraData } from '../hooks/useJiraData';
import html2canvas from 'html2canvas';
import type { Product } from '../types/roadmap';

type ViewMode = 'table' | 'timeline';

export function RoadmapPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('table');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const { addProduct, updateProduct, deleteProduct } = useProducts([]);
  const { features: jiraFeatures, isLoading, refresh } = useJiraData();
  const timelineRef = useRef<HTMLDivElement>(null);

  const handleAddFeature = () => {
    setIsModalOpen(true);
  };

  const handleSubmit = (data: Omit<Product, 'id'>) => {
    addProduct(data);
    setIsModalOpen(false);
  };

  const handleExport = async (
    startQuarter: { year: number; quarter: number },
    endQuarter: { year: number; quarter: number },
    selectedProducts: string[]
  ) => {
    if (!timelineRef.current) return;

    try {
      const canvas = await html2canvas(timelineRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff'
      });

      const link = document.createElement('a');
      link.download = 'roadmap.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Error exporting timeline:', error);
    }
  };

  // Jiraのデータのみを使用
  const allProducts = jiraFeatures;
  const uniqueProducts = Array.from(new Set(allProducts.map(p => p.name))).sort();

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <AddFeatureButton onClick={handleAddFeature} />
          <RefreshButton onClick={refresh} isLoading={isLoading} />
        </div>
        <div className="flex items-center space-x-4">
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button
              onClick={() => setViewMode('table')}
              className={`px-4 py-2 text-sm font-medium rounded-l-lg border ${
                viewMode === 'table'
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              <Table2 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('timeline')}
              className={`px-4 py-2 text-sm font-medium rounded-r-lg border-t border-b border-r ${
                viewMode === 'timeline'
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              <CalendarDays className="w-5 h-5" />
            </button>
          </div>
          {viewMode === 'timeline' && (
            <button
              onClick={() => setIsExportModalOpen(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Download className="h-4 w-4 mr-2" />
              画像出力
            </button>
          )}
        </div>
      </div>

      <div ref={timelineRef}>
        {viewMode === 'table' ? (
          <RoadmapTable
            products={allProducts}
            onEdit={updateProduct}
            onDelete={deleteProduct}
          />
        ) : (
          <RoadmapTimeline
            products={allProducts}
            selectedProducts={selectedProducts}
            onProductsChange={setSelectedProducts}
          />
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="機能を追加"
      >
        <ProductForm
          onSubmit={handleSubmit}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>

      <TimelineExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        onExport={handleExport}
        products={uniqueProducts}
        selectedProducts={selectedProducts}
        onProductsChange={setSelectedProducts}
      />
    </div>
  );
}