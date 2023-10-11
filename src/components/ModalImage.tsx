import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from 'body-scroll-lock';
import { useRef, useState, useEffect } from 'react';

type ModalImageProps = {
  className?: string;
  src?: string;
  alt?: string;
};
export const ModalImage = (props: ModalImageProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null!);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      dialogRef.current.showModal();
      disableBodyScroll(dialogRef.current);
    } else {
      dialogRef.current.close();
      enableBodyScroll(dialogRef.current);
    }
    return () => clearAllBodyScrollLocks();
  }, [isOpen]);

  return (
    <>
      <img {...props} onClick={() => setIsOpen(true)} />
      <dialog
        ref={dialogRef}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            e.currentTarget.close();
            setIsOpen(false);
          }
        }}
        className='rounded-lg p-0'
      >
        <div className='  p-5'>
          <img
            src={props.src}
            alt={props.alt}
            className='max-h-[80vh] overflow-scroll  
            '
          />
        </div>
        <button onClick={() => setIsOpen(false)} className=' bg-slate-300'>
          Close
        </button>
      </dialog>
    </>
  );
};
