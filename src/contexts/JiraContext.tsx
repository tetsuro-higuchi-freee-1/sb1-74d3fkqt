import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { 
  saveJiraConfig, 
  loadJiraConfig, 
  clearJiraConfig,
  saveJiraEmail,
  loadJiraEmail,
  clearJiraEmail,
  saveProjectKey,
  loadProjectKey,
  clearProjectKey,
  saveAdapterType,
  loadAdapterType,
  clearAdapterType
} from '../services/jira/config/storage';
import type { JiraApiConfig } from '../services/jira/types';
import type { JiraAdapterType } from '../services/jira/factory';

interface JiraContextType {
  config: JiraApiConfig | null;
  email: string | null;
  projectKey: string | null;
  adapterType: JiraAdapterType;
  setConfig: (config: JiraApiConfig) => void;
  setEmail: (email: string) => void;
  setProjectKey: (key: string) => void;
  clearConfig: () => void;
  setAdapterType: (type: JiraAdapterType) => void;
}

const JiraContext = createContext<JiraContextType | null>(null);

export function JiraProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<JiraApiConfig | null>(() => loadJiraConfig());
  const [email, setEmail] = useState<string | null>(() => loadJiraEmail());
  const [projectKey, setProjectKey] = useState<string | null>(() => loadProjectKey());
  const [adapterType, setAdapterType] = useState<JiraAdapterType>(() => 
    (loadAdapterType() as JiraAdapterType) || 'mock'
  );

  const handleSetConfig = useCallback((newConfig: JiraApiConfig) => {
    setConfig(newConfig);
    saveJiraConfig(newConfig);
  }, []);

  const handleSetEmail = useCallback((newEmail: string) => {
    setEmail(newEmail);
    saveJiraEmail(newEmail);
  }, []);

  const handleSetProjectKey = useCallback((newKey: string) => {
    setProjectKey(newKey);
    saveProjectKey(newKey);
  }, []);

  const handleSetAdapterType = useCallback((type: JiraAdapterType) => {
    setAdapterType(type);
    saveAdapterType(type);
  }, []);

  const handleClearConfig = useCallback(() => {
    setConfig(null);
    clearJiraConfig();
    setEmail(null);
    clearJiraEmail();
    setProjectKey(null);
    clearProjectKey();
    setAdapterType('mock');
    clearAdapterType();
  }, []);

  return (
    <JiraContext.Provider value={{
      config,
      email,
      projectKey,
      adapterType,
      setConfig: handleSetConfig,
      setEmail: handleSetEmail,
      setProjectKey: handleSetProjectKey,
      clearConfig: handleClearConfig,
      setAdapterType: handleSetAdapterType
    }}>
      {children}
    </JiraContext.Provider>
  );
}

export function useJira() {
  const context = useContext(JiraContext);
  if (!context) {
    throw new Error('useJira must be used within a JiraProvider');
  }
  return context;
}