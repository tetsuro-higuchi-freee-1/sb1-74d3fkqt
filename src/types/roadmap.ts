export interface Product {
  id: string;
  name: string;
  majorCategory: string;
  minorCategory: string;
  featureName: string;
  isPublic: '確認前' | '可能' | '不可';
  targetIndustry: string;
  targetScale: string;
  customerImpact: string;
  description: string;
  developmentStatus: '開発着手前' | '開発中' | '開発完了' | '開発取りやめ';
  releaseDate: string;
  actualReleaseDate: string | null;
  projectManager: string;
  productMarketing: string;
  documentationUrl: string;
  figmaUrl: string;
  createdAt: string;
  updatedAt: string;
}

export type SortField = keyof Omit<Product, 'id' | 'documentationUrl' | 'figmaUrl' | 'createdAt' | 'updatedAt'>;

export interface Sort {
  field: SortField;
  direction: 'asc' | 'desc';
}

export interface Filters {
  status: string;
  isPublic: string;
  impact: string;
}