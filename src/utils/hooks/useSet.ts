import { useState } from 'react';

const useSet = <T>() => {
  const [data, setData] = useState(new Set<T>());
  const add = (key: T) => setData((prev) => new Set(prev.add(key)));
  const remove = (key: T) =>
    setData((prev) => {
      prev.delete(key);
      return new Set(prev);
    });
  const isEmpty = () => (data.size === 0 ? true : false);

  return { data, add, remove, isEmpty };
};

export default useSet;
