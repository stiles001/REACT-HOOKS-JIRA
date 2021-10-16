import { useEffect, useRef, useState } from "react";

export const isFalsy = (value: unknown) => (value === 0 ? false : !value);

export const isVoid = (value: unknown) => value === undefined || value === null || value === "";

export const cleanObject = (obj: { [key: string]: unknown }) => {
  let result = { ...obj };

  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isVoid(value)) {
      delete result[key];
    }
  });

  return result;
};

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
  }, []);
};

/*
export const debounce = (func, delay) => {
  let timeout;
  return () => {
    if(timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      func();
    }, delay);
  }
}
*/

export const useDebounce = <V>(value: V, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
};


export const resetRoute = () => window.location.href = window.location.origin;


/**
 * 用来返回组件的加载状态，如果还没挂载或者已经卸载，返回false；反之，返回true
 */
export const useMountRef = () => {
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    }
  });

  return mountedRef;
}
