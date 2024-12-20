import React, { useMemo, useEffect, useRef, useState } from 'react';
import { TimelineFeature } from './TimelineFeature';
import { TimelineFilter } from './TimelineFilter';
import { FeatureDetailsModal } from '../RoadmapTable/FeatureDetailsModal';
import { getFiscalQuarter, getQuarterRange, getQuarterLabel } from '../../utils/fiscalDate';
import type { Product } from '../../types/roadmap';

interface TimelineProps {
  products: Product[];
  selectedProducts: string[];
  onProductsChange: (products: string[]) => void;
}

export function RoadmapTimeline({ products, selectedProducts, onProductsChange }: TimelineProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [selectedFeature, setSelectedFeature] = useState<Product | null>(null);
  
  const { quarterlyData, uniqueProducts, currentQuarterIndex } = useMemo(() => {
    const today = new Date();
    const { fiscalYear: currentFiscalYear, quarter: currentQuarter } = getFiscalQuarter(today);

    // Generate quarters for 2 years before and after the current fiscal year
    const quarters: Array<{ fiscalYear: number; quarter: number }> = [];
    for (let year = currentFiscalYear - 2; year <= currentFiscalYear + 2; year++) {
      for (let quarter = 1; quarter <= 4; quarter++) {
        quarters.push({ fiscalYear: year, quarter });
      }
    }

    // Group products by fiscal quarter
    const productsByQuarter = new Map<string, Product[]>();
    quarters.forEach(({ fiscalYear, quarter }) => {
      productsByQuarter.set(`${fiscalYear}-Q${quarter}`, []);
    });

    products.forEach(product => {
      const date = new Date(product.releaseDate);
      const { fiscalYear, quarter } = getFiscalQuarter(date);
      const quarterKey = `${fiscalYear}-Q${quarter}`;
      
      if (productsByQuarter.has(quarterKey)) {
        productsByQuarter.get(quarterKey)!.push(product);
      }
    });

    // Get unique product names
    const uniqueProductNames = Array.from(new Set(products.map(p => p.name)))
      .sort((a, b) => a.localeCompare(b));

    const quarterlyData = Array.from(productsByQuarter.entries())
      .map(([quarter, products]) => ({ quarter, products }))
      .sort((a, b) => a.quarter.localeCompare(b.quarter));

    // Find index of current quarter
    const currentQuarterKey = `${currentFiscalYear}-Q${currentQuarter}`;
    const currentIndex = quarterlyData.findIndex(
      ({ quarter }) => quarter === currentQuarterKey
    );

    return {
      quarterlyData,
      uniqueProducts: uniqueProductNames,
      currentQuarterIndex: currentIndex >= 0 ? currentIndex : 0
    };
  }, [products]);

  // Calculate column widths
  const quarterWidth = 300; // Increased width for quarter columns
  const productNameColumnWidth = 200;
  const totalWidth = productNameColumnWidth + (quarterlyData.length * quarterWidth);

  // Scroll to center the current quarter
  useEffect(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollLeft = (currentQuarterIndex * quarterWidth) - (container.clientWidth / 2) + (quarterWidth / 2) + productNameColumnWidth;
      container.scrollLeft = Math.max(0, scrollLeft);
    }
  }, [currentQuarterIndex, quarterWidth, productNameColumnWidth]);

  return (
    <div>
      <TimelineFilter
        products={uniqueProducts}
        selectedProducts={selectedProducts}
        onFilterChange={onProductsChange}
      />

      <div className="relative border border-gray-200 rounded-lg shadow-sm">
        <div className="overflow-x-auto" ref={scrollContainerRef}>
          <div style={{ minWidth: `${totalWidth}px` }} className="relative timeline-content">
            {/* Header Row */}
            <div className="flex sticky top-0 z-30 bg-white border-b border-gray-200">
              {/* Fixed Product Column Header */}
              <div 
                className="sticky left-0 z-40 bg-white border-r border-gray-200"
                style={{ width: `${productNameColumnWidth}px`, minWidth: `${productNameColumnWidth}px` }}
              >
                <div className="h-16 flex items-center px-6">
                  <h3 className="font-semibold text-gray-700">プロダクト/機能</h3>
                </div>
              </div>

              {/* Quarter Headers */}
              <div className="flex flex-1">
                {quarterlyData.map(({ quarter }) => {
                  const [year, q] = quarter.split('-');
                  const fiscalYear = parseInt(year);
                  const quarterNum = parseInt(q.substring(1));
                  
                  return (
                    <div 
                      key={`header-${quarter}`}
                      data-quarter={quarter}
                      className="border-r border-gray-200 h-16 flex items-center justify-center"
                      style={{ width: `${quarterWidth}px`, minWidth: `${quarterWidth}px` }}
                    >
                      <h3 className="font-semibold text-gray-700">
                        {getQuarterLabel(fiscalYear, quarterNum)}
                      </h3>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Timeline Content */}
            {uniqueProducts.filter(name => selectedProducts.includes(name)).map((productName, productIndex) => (
              <div 
                key={`row-${productIndex}`} 
                className={`flex ${productIndex !== uniqueProducts.length - 1 ? 'border-b border-gray-200' : ''}`}
              >
                {/* Fixed Product Name Column */}
                <div 
                  className="sticky left-0 z-20 bg-white border-r border-gray-200"
                  style={{ width: `${productNameColumnWidth}px`, minWidth: `${productNameColumnWidth}px` }}
                >
                  <div className="p-6">
                    <h4 className="font-medium text-gray-900">{productName}</h4>
                  </div>
                </div>

                {/* Quarter Cells */}
                <div className="flex flex-1">
                  {quarterlyData.map(({ quarter, products }) => {
                    const productFeatures = products.filter(p => p.name === productName);
                    return (
                      <div
                        key={`${productName}-${quarter}`}
                        className="p-4 border-r border-gray-200"
                        style={{ width: `${quarterWidth}px`, minWidth: `${quarterWidth}px` }}
                      >
                        {productFeatures.map((feature) => (
                          <TimelineFeature 
                            key={`${feature.id}-${quarter}`}
                            feature={feature}
                            onFeatureClick={setSelectedFeature}
                          />
                        ))}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <FeatureDetailsModal
        product={selectedFeature}
        onClose={() => setSelectedFeature(null)}
      />
    </div>
  );
}