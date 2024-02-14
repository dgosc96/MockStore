import { useEffect } from 'react';
import toast, { ToastBar, Toaster, useToasterStore } from 'react-hot-toast';

import { HiOutlineTrash as DismissIcon } from 'react-icons/hi';

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

  return (
    <Toaster containerClassName='mt-9'>
      {(t) => (
        <ToastBar toast={t}>
          {({ icon, message }) => (
            <>
              {icon}
              {message}
              {t.type !== 'loading' && (
                <button
                  className=' rounded-md p-[1px] text-neutral-300 transition-all duration-200 hover:scale-110 hover:bg-red-600 hover:text-neutral-100 active:scale-90'
                  onClick={() => toast.dismiss(t.id)}
                >
                  <DismissIcon size={'1.5rem'} />
                </button>
              )}
            </>
          )}
        </ToastBar>
      )}
    </Toaster>
  );
};
