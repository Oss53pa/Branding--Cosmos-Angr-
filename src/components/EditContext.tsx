import React, { createContext, useContext, useState, useCallback } from 'react';

interface EditContextType {
  isEditing: boolean;
  toggleEditing: () => void;
  getValue: (key: string, defaultValue: string) => string;
  setValue: (key: string, value: string) => void;
  getList: <T>(key: string, defaultValue: T[]) => T[];
  setList: <T>(key: string, value: T[]) => void;
}

const STORAGE_PREFIX = 'cosmos-edit-';

const EditContext = createContext<EditContextType>({
  isEditing: false,
  toggleEditing: () => {},
  getValue: (_k, d) => d,
  setValue: () => {},
  getList: (_k, d) => d,
  setList: () => {},
});

export const useEdit = () => useContext(EditContext);

export const EditProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEditing = useCallback(() => setIsEditing((v) => !v), []);

  const getValue = useCallback((key: string, defaultValue: string): string => {
    const stored = localStorage.getItem(STORAGE_PREFIX + key);
    return stored !== null ? stored : defaultValue;
  }, []);

  const setValue = useCallback((key: string, value: string) => {
    localStorage.setItem(STORAGE_PREFIX + key, value);
  }, []);

  const getList = useCallback(<T,>(key: string, defaultValue: T[]): T[] => {
    const stored = localStorage.getItem(STORAGE_PREFIX + key);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return defaultValue;
      }
    }
    return defaultValue;
  }, []);

  const setList = useCallback(<T,>(key: string, value: T[]) => {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
  }, []);

  return (
    <EditContext.Provider value={{ isEditing, toggleEditing, getValue, setValue, getList, setList }}>
      {children}
    </EditContext.Provider>
  );
};

export default EditContext;
