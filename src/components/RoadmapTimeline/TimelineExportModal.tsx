import React, { useState } from 'react';
import { Modal } from '../Modal/Modal';
import { Download } from 'lucide-react';
import { getFiscalQuarter, getQuarterLabel } from '../../utils/fiscalDate';

interface TimelineExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExport: (startQuarter: { year: number; quarter: number }, endQuarter: { year: number; quarter: number }, selectedProducts: string[]) => void;
  products: string[];
  selectedProducts: string[];
  onProductsChange: (products: string[]) => void;
}

export function TimelineExportModal({
  isOpen,
  onClose,
  onExport,
  products,
  selectedProducts,
  onProductsChange
}: TimelineExportModalProps) {
  const today = new Date();
  const { fiscalYear: currentFiscalYear } = getFiscalQuarter(today);
  const fiscalYears = Array.from(
    { length: 5 },
    (_, i) => currentFiscalYear - 2 + i
  );
  const quarters = [1, 2, 3, 4];

  const [startQuarter, setStartQuarter] = useState<{ year: number; quarter: number } | null>(null);
  const [endQuarter, setEndQuarter] = useState<{ year: number; quarter: number } | null>(null);

  const handleExport = () => {
    if (!startQuarter || !endQuarter) return;
    onExport(startQuarter, endQuarter, selectedProducts);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="ロードマップを画像出力"
    >
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">出力設定</h3>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  開始期間
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <select
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    value={startQuarter?.year || ''}
                    onChange={(e) => setStartQuarter(prev => ({
                      year: parseInt(e.target.value),
                      quarter: prev?.quarter || 1
                    }))}
                  >
                    <option value="">年度</option>
                    {fiscalYears.map(year => (
                      <option key={year} value={year}>
                        FY{year}年度
                      </option>
                    ))}
                  </select>
                  <select
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    value={startQuarter?.quarter || ''}
                    onChange={(e) => setStartQuarter(prev => ({
                      year: prev?.year || currentFiscalYear,
                      quarter: parseInt(e.target.value)
                    }))}
                  >
                    <option value="">Q</option>
                    {quarters.map(q => (
                      <option key={q} value={q}>Q{q}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  終了期間
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <select
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    value={endQuarter?.year || ''}
                    onChange={(e) => setEndQuarter(prev => ({
                      year: parseInt(e.target.value),
                      quarter: prev?.quarter || 4
                    }))}
                  >
                    <option value="">年度</option>
                    {fiscalYears.map(year => (
                      <option key={year} value={year}>
                        FY{year}年度
                      </option>
                    ))}
                  </select>
                  <select
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    value={endQuarter?.quarter || ''}
                    onChange={(e) => setEndQuarter(prev => ({
                      year: prev?.year || currentFiscalYear,
                      quarter: parseInt(e.target.value)
                    }))}
                  >
                    <option value="">Q</option>
                    {quarters.map(q => (
                      <option key={q} value={q}>Q{q}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                出力するプロダクト
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {products.map(product => (
                  <label
                    key={product}
                    className="flex items-center space-x-2 text-sm"
                  >
                    <input
                      type="checkbox"
                      checked={selectedProducts.includes(product)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          onProductsChange([...selectedProducts, product]);
                        } else {
                          onProductsChange(selectedProducts.filter(p => p !== product));
                        }
                      }}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span>{product}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            キャンセル
          </button>
          <button
            onClick={handleExport}
            disabled={!startQuarter || !endQuarter}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download className="h-4 w-4 mr-2" />
            画像を出力
          </button>
        </div>
      </div>
    </Modal>
  );
}