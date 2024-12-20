import React, { useState } from 'react';
import { Download, Calendar } from 'lucide-react';
import html2canvas from 'html2canvas';
import { getFiscalQuarter, getQuarterLabel } from '../../utils/fiscalDate';

interface TimelineExportProps {
  containerRef: React.RefObject<HTMLDivElement>;
  products: string[];
  selectedProducts: string[];
  onProductsChange: (products: string[]) => void;
}

export function TimelineExport({ containerRef, products, selectedProducts, onProductsChange }: TimelineExportProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [showExportOptions, setShowExportOptions] = useState(false);
  const [startQuarter, setStartQuarter] = useState<{ year: number; quarter: number } | null>(null);
  const [endQuarter, setEndQuarter] = useState<{ year: number; quarter: number } | null>(null);

  // Generate fiscal years and quarters options
  const today = new Date();
  const { fiscalYear: currentFiscalYear } = getFiscalQuarter(today);
  const fiscalYears = Array.from(
    { length: 5 },
    (_, i) => currentFiscalYear - 2 + i
  );
  const quarters = [1, 2, 3, 4];

  const handleExport = async () => {
    if (!containerRef.current || !startQuarter || !endQuarter) return;
    
    setIsExporting(true);
    try {
      // Get the timeline container element
      const timelineContainer = containerRef.current;
      const timelineContent = timelineContainer.querySelector('.timeline-content');
      
      if (!timelineContent) return;

      // Calculate the visible quarters based on selected range
      const startKey = `${startQuarter.year}-Q${startQuarter.quarter}`;
      const endKey = `${endQuarter.year}-Q${endQuarter.quarter}`;
      
      // Find all quarter columns
      const quarterColumns = timelineContainer.querySelectorAll('[data-quarter]');
      let startIndex = -1;
      let endIndex = -1;

      quarterColumns.forEach((col, index) => {
        const quarter = col.getAttribute('data-quarter');
        if (quarter === startKey) startIndex = index;
        if (quarter === endKey) endIndex = index;
      });

      if (startIndex === -1 || endIndex === -1) return;

      // Calculate dimensions for the selected range
      const productNameColumnWidth = 200; // Width of the fixed product name column
      const quarterWidth = 300; // Width of each quarter column
      const selectedQuartersCount = endIndex - startIndex + 1;
      const totalWidth = productNameColumnWidth + (selectedQuartersCount * quarterWidth);
      
      // Calculate height based on 16:9 aspect ratio
      const aspectRatio = 16 / 9;
      const targetHeight = Math.round(totalWidth / aspectRatio);

      // Create a temporary container for the selected range
      const tempContainer = document.createElement('div');
      tempContainer.style.width = `${totalWidth}px`;
      tempContainer.style.height = `${targetHeight}px`;
      tempContainer.style.position = 'absolute';
      tempContainer.style.left = '-9999px';
      document.body.appendChild(tempContainer);

      // Clone and modify the timeline content for the selected range
      const clonedContent = timelineContent.cloneNode(true) as HTMLElement;
      
      // Remove quarters outside the selected range
      const quarters = clonedContent.querySelectorAll('[data-quarter]');
      quarters.forEach((quarter, index) => {
        if (index < startIndex || index > endIndex) {
          quarter.remove();
        }
      });

      // Adjust the scale to fit the target height
      const contentHeight = clonedContent.offsetHeight;
      const scale = targetHeight / contentHeight;
      clonedContent.style.transform = `scale(${scale})`;
      clonedContent.style.transformOrigin = 'top left';

      tempContainer.appendChild(clonedContent);

      // Capture the image
      const canvas = await html2canvas(tempContainer, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: totalWidth,
        height: targetHeight
      });

      // Add title and metadata
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.font = 'bold 24px sans-serif';
        ctx.fillStyle = '#000000';
        ctx.fillText('プロダクトロードマップ', 20, 40);

        const startLabel = getQuarterLabel(startQuarter.year, startQuarter.quarter);
        const endLabel = getQuarterLabel(endQuarter.year, endQuarter.quarter);
        ctx.font = '16px sans-serif';
        ctx.fillText(`期間: ${startLabel} 〜 ${endLabel}`, 20, 70);
      }

      // Convert to image and download
      const link = document.createElement('a');
      link.download = 'roadmap.png';
      link.href = canvas.toDataURL('image/png');
      link.click();

      // Clean up
      document.body.removeChild(tempContainer);
    } catch (error) {
      console.error('Error exporting timeline:', error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="mb-4">
      <button
        onClick={() => setShowExportOptions(!showExportOptions)}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <Calendar className="h-4 w-4 mr-2" />
        画像出力
      </button>

      {showExportOptions && (
        <div className="mt-4 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
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

            <div className="flex justify-end">
              <button
                onClick={handleExport}
                disabled={isExporting || !startQuarter || !endQuarter}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Download className="h-4 w-4 mr-2" />
                {isExporting ? '出力中...' : '画像を出力'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}