import React from 'react';
import { TimelineFeature } from './TimelineFeature';
import type { QuarterData } from './types';
import type { Product } from '../../types/roadmap';

interface TimelineRowProps {
  productName: string;
  quarterlyData: QuarterData[];
}

export function TimelineRow({ productName, quarterlyData }: TimelineRowProps) {
  return (
    <>
      <div className="bg-white p-4 rounded-lg shadow">
        <h4 className="font-medium text-gray-900">{productName}</h4>
      </div>
      
      {quarterlyData.map(({ quarter, products }) => {
        const productFeatures = products.filter(p => p.name === productName);
        return (
          <div key={`${productName}-${quarter}`} className="bg-white p-4 rounded-lg shadow">
            {productFeatures.map((feature) => (
              <TimelineFeature 
                key={`${feature.id}-${quarter}`}
                feature={feature} 
              />
            ))}
          </div>
        );
      })}
    </>
  );
}