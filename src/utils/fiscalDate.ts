import { addMonths, subMonths } from './dateUtils';

export function getFiscalQuarter(date: Date): { fiscalYear: number; quarter: number } {
  const month = date.getMonth();
  let fiscalYear = date.getFullYear();
  let quarter;

  // Adjust fiscal year calculation
  // If the date is before July, it belongs to the previous fiscal year
  if (month < 6) {
    fiscalYear--;
  }

  // Determine quarter based on month
  if (month >= 6 && month <= 8) {        // Jul-Sep (Q1)
    quarter = 1;
  } else if (month >= 9 && month <= 11) { // Oct-Dec (Q2)
    quarter = 2;
  } else if (month >= 0 && month <= 2) {  // Jan-Mar (Q3)
    quarter = 3;
  } else {                                // Apr-Jun (Q4)
    quarter = 4;
  }

  return { fiscalYear, quarter };
}

export function getQuarterRange(fiscalYear: number, quarter: number): { start: Date; end: Date } {
  let startMonth, endMonth;
  let yearOffset = 0;

  switch (quarter) {
    case 1: // Q1: Jul-Sep
      startMonth = 6;
      endMonth = 8;
      break;
    case 2: // Q2: Oct-Dec
      startMonth = 9;
      endMonth = 11;
      break;
    case 3: // Q3: Jan-Mar
      startMonth = 0;
      endMonth = 2;
      yearOffset = 1; // Next calendar year
      break;
    case 4: // Q4: Apr-Jun
      startMonth = 3;
      endMonth = 5;
      yearOffset = 1; // Next calendar year
      break;
    default:
      throw new Error('Invalid quarter');
  }

  const year = fiscalYear + yearOffset;

  return {
    start: new Date(year, startMonth, 1),
    end: new Date(year, endMonth + 1, 0) // Last day of the end month
  };
}

export function getQuarterLabel(fiscalYear: number, quarter: number): string {
  return `FY${fiscalYear}年度 Q${quarter}`;
}