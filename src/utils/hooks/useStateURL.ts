import { useSearchParams } from 'react-router-dom';

export const useBoolStateURL = (
  name: string,
  initVal?: boolean,
): [boolean, (val: boolean) => void] => {
  const [searchParams, setSearchParams] = useSearchParams();
  const isKey = searchParams.has(name);

  const setIsKey = (val: boolean) =>
    setSearchParams((prev) => {
      if (val) prev.set(name, val.toString());
      else prev.delete(name);
      return prev;
    });

  if (initVal) {
    setIsKey(initVal);
  }

  return [isKey, setIsKey];
};
