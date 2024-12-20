import React from 'react';
import type { QuarterData } from './types';

interface TimelineHeaderProps {
  quarterlyData: QuarterData[];
}

export function TimelineHeader({ quarterlyData }: TimelineHeaderProps) {
  const formatQuarter = (quarterKey: string) => {
    const [year, quarter] = quarterKey.split('-');
    const fiscalYear = parseInt(year) + 1;
    return `FY${fiscalYear}年度 ${quarter}`;
  };

  return (
    <>
      <div className="bg-gray-100 p-4 rounded-lg">
        <h3 className="font-semibold text-gray-700">プロダクト/機能</h3>
      </div>
      {quarterlyData.map(({ quarter }) => (
        <div key={quarter} className="bg-gray-100 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-700">{formatQuarter(quarter)}</h3>
        </div>
      ))}
    </>
  );
}