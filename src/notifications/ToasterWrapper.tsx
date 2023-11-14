import { useEffect } from 'react';
import toast, { Toaster, useToasterStore } from 'react-hot-toast';

export const ToasterWrapper = () => {
  const { toasts } = useToasterStore();

  useEffect(() => {
    const MAX_TOASTS = 1;
    if (toasts.length > MAX_TOASTS) {
      toasts.forEach((currToast, index, toastArr) => {
        if (toastArr.length - index <= toastArr.length - MAX_TOASTS)
          toast.dismiss(currToast.id);
      });
    }
  }, [toasts.length]);

  return <Toaster />;
};
