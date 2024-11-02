import { useState, useEffect } from 'react';

interface UseLocalStorageResult<T> {
  value: T;
  setValue: (value: T | ((val: T) => T)) => void;
  getStoredValue: () => T;
}

function useLocalStorage<T>(key: string, initialValue: T): UseLocalStorageResult<T> {
  // Obtener el valor inicial
  const [storedValue, setStoredValue] = useState<T>(() => {
    return getValueFromLocalStorage(key, initialValue);
  });

  // Función para obtener el valor de localStorage
  function getValueFromLocalStorage(key: string, defaultValue: T): T {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(error);
      return defaultValue;
    }
  }

  // Función para actualizar el valor en localStorage y en el estado
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  // Función para consultar el valor actual en localStorage
  const getStoredValue = (): T => {
    return getValueFromLocalStorage(key, initialValue);
  };

  useEffect(() => {
    // Actualizar localStorage cuando cambia la clave o el valor almacenado
    window.localStorage.setItem(key, JSON.stringify(storedValue));
  }, [key, storedValue]);

  return {
    value: storedValue,
    setValue,
    getStoredValue
  };
}

export default useLocalStorage;