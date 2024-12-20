import type { Product } from './roadmap';
import type { User } from './user';

export type OperationType = 'create' | 'update' | 'delete';
export type TargetType = 'feature' | 'user';

export interface FieldChange {
  field: keyof (Product | User);
  oldValue: string | null;
  newValue: string | null;
}

export interface OperationLog {
  id: string;
  userId: string;
  userName: string;
  userRole: string;
  operationType: OperationType;
  targetType: TargetType;
  targetId: string;
  targetName: string;
  changes: FieldChange[];
  timestamp: string;
}