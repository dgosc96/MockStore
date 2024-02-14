import { type ReactNode, useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

type DropdownMenuProps = {
  btnChildren: ReactNode;
  btnClassName?: string;
  btnClassNameOpen?: string;
  children?: ReactNode;
};
export const DropdownMenu = ({
  children,
  btnChildren,
  btnClassName,
  btnClassNameOpen,
}: DropdownMenuProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const popupRef = useRef<HTMLDivElement>(null);

  const location = useLocation();

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [popupRef]);

  useEffect(() => setIsOpen(false), [location]);

  return (
    <div ref={popupRef} className={`relative `}>
      <button
        className={`group/dropdown inline-flex h-full w-full items-center justify-center ${btnClassName} ${
          isOpen && btnClassNameOpen
        }`}
        onClick={() => toggleDropdown()}
      >
        {btnChildren}
        <svg
          className={`-mr-1 ml-2 h-5 w-5 transition-transform duration-300 group-hover/dropdown:-translate-y-[1px] group-hover/dropdown:scale-110 ${
            isOpen && 'rotate-180'
          }`}
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 20 20'
          fill='currentColor'
          aria-hidden='true'
        >
          <path
            fillRule='evenodd'
            d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
            clipRule='evenodd'
          />
        </svg>
      </button>

      {/* Dropdown menu items */}
      <div
        className={`absolute right-0 mt-2 flex min-w-[12em] origin-top flex-col overflow-clip whitespace-nowrap rounded-md bg-white pt-1 shadow-lg ring-1 ring-black ring-opacity-5 transition-all duration-200   ${
          isOpen ? 'scale-100 opacity-100 ' : ' scale-0 opacity-0 '
        }`}
      >
        {children}
      </div>
    </div>
  );
};
