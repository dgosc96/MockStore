import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from 'body-scroll-lock';

import QuickPinchZoom, { make2dTransformValue } from 'react-quick-pinch-zoom';

import { useRef, useState, useEffect, useCallback } from 'react';

import { CgClose as CloseIcon } from 'react-icons/cg';

type LightboxProps = {
  className?: string;
  src: string;
  alt?: string;
};

export const Lightbox = (props: LightboxProps) => {
  const lightboxRef = useRef<HTMLDivElement>(null);
  const imgContainerRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);

  const onUpdate = useCallback(
    ({ x, y, scale }: { x: number; y: number; scale: number }) => {
      const { current: img } = imgContainerRef;
      if (scale <= 1) {
        setIsZoomed(false);
      } else {
        setIsZoomed(true);
      }

      if (img) {
        const value = make2dTransformValue({ x, y, scale });

        img.style.setProperty('transform', value);
      }
    },
    [],
  );

  useEffect(() => {
    if (lightboxRef.current) {
      if (isOpen) {
        disableBodyScroll(lightboxRef.current);
      } else {
        enableBodyScroll(lightboxRef.current);
      }
    }
    return () => clearAllBodyScrollLocks();
  }, [isOpen]);

  return (
    <>
      <img {...props} onClick={() => setIsOpen(true)} />
      {isOpen && (
        <div ref={lightboxRef} className='fixed inset-0 z-50 grid '>
          <div
            className='absolute inset-0 bg-black bg-opacity-50'
            onClick={() => setIsOpen(false)}
          ></div>
          <QuickPinchZoom
            onUpdate={onUpdate}
            centerContained
            wheelScaleFactor={200}
            tapZoomFactor={2}
            doubleTapToggleZoom
            draggableUnZoomed={false}
            shouldInterceptWheel={() => false}
            horizontalPadding={50}
            verticalPadding={50}
          >
            <div
              ref={imgContainerRef}
              className={`w-fit rounded-md bg-white p-4 ${
                isZoomed
                  ? 'cursor-grab active:cursor-grabbing'
                  : 'cursor-pointer '
              }`}
            >
              <img src={props.src} alt={props.alt} />
            </div>
          </QuickPinchZoom>
          <button
            onClick={() => setIsOpen(false)}
            className='absolute right-5 top-5 rounded-lg bg-black bg-opacity-30 text-white'
          >
            <CloseIcon size={34} />
          </button>
        </div>
      )}
    </>
  );
};
