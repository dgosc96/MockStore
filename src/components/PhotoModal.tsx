import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from 'body-scroll-lock';

import QuickPinchZoom, { make2dTransformValue } from 'react-quick-pinch-zoom';

import { useRef, useEffect, useCallback } from 'react';

import { CgClose as CloseIcon } from 'react-icons/cg';

import { useBoolStateURL } from '../utils/hooks/useStateURL';
import { DivFadeIn } from './DivFadeIn';

type PhotoModalProps = {
  className?: string;
  src: string;
  alt?: string;
};

export const PhotoModal = (props: PhotoModalProps) => {
  const imgContainerRef = useRef<HTMLDivElement>(null);

  const [isOpenParam, setIsOpenParam] = useBoolStateURL('modal');

  const onUpdate = useCallback(
    ({ x, y, scale }: { x: number; y: number; scale: number }) => {
      const { current: img } = imgContainerRef;

      if (img) {
        const value = make2dTransformValue({ x, y, scale });
        img.style.setProperty('transform', value);
      }
    },
    [],
  );

  useEffect(() => {
    if (imgContainerRef.current) {
      if (isOpenParam) {
        disableBodyScroll(imgContainerRef.current);
      } else {
        enableBodyScroll(imgContainerRef.current);
      }
    }
    return () => clearAllBodyScrollLocks();
  }, [isOpenParam]);

  return (
    <>
      <img {...props} onClick={() => setIsOpenParam(true)} />
      {isOpenParam && (
        <DivFadeIn className='fixed inset-0 z-50 grid '>
          <div
            className='absolute inset-0 bg-black bg-opacity-50'
            onClick={() => setIsOpenParam(false)}
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
              className={`w-fit cursor-grab bg-white p-4 active:cursor-grabbing `}
            >
              <img src={props.src} alt={props.alt} width={500} height={500} />
            </div>
          </QuickPinchZoom>
          <button
            onClick={() => setIsOpenParam(false)}
            className='absolute right-5 top-5 rounded-lg bg-black bg-opacity-30 text-white'
          >
            <CloseIcon size={34} />
          </button>
        </DivFadeIn>
      )}
    </>
  );
};
