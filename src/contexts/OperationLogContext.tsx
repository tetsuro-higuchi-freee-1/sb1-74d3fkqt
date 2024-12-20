import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { OperationLog, OperationType, FieldChange, TargetType } from '../types/operationLog';
import { useAuth } from './AuthContext';
import { sampleOperationLogs } from '../data/sampleData';

interface OperationLogContextType {
  logs: OperationLog[];
  addLog: (
    operationType: OperationType,
    targetType: TargetType,
    targetId: string,
    targetName: string,
    changes?: FieldChange[]
  ) => void;
}

const OperationLogContext = createContext<OperationLogContextType | null>(null);

export function OperationLogProvider({ children }: { children: ReactNode }) {
  const [logs, setLogs] = useState<OperationLog[]>(sampleOperationLogs);
  const { user } = useAuth();

  const addLog = (
    operationType: OperationType,
    targetType: TargetType,
    targetId: string,
    targetName: string,
    changes?: FieldChange[]
  ) => {
    if (!user) return;

    const newLog: OperationLog = {
      id: Math.random().toString(36).substr(2, 9),
      userId: user.id,
      userName: user.name,
      userRole: user.role,
      operationType,
      targetType,
      targetId,
      targetName,
      changes: changes || [],
      timestamp: new Date().toISOString()
    };

    setLogs(prev => [newLog, ...prev]);
  };

  return (
    <OperationLogContext.Provider value={{ logs, addLog }}>
      {children}
    </OperationLogContext.Provider>
  );
}

export function useOperationLog() {
  const context = useContext(OperationLogContext);
  if (!context) {
    throw new Error('useOperationLog must be used within an OperationLogProvider');
  }
  return context;
}