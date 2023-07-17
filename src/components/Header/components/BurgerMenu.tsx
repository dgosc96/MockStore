import { PropsWithChildren, useState } from 'react';

type BurgerMenuProps = {
    className?: string;
};

export const BurgerMenu = (props: PropsWithChildren<BurgerMenuProps>) => {
    const [isActive, setIsActive] = useState(false);

    const size = 36;
    const bar_width = 70;
    const bar_height = 8;
    const bar_rx = bar_height / 2;
    const vb_size = 100;

    const handleMouseClick = () => {
        setIsActive((current) => !current);
    };

    return (
        <div className={`${props.className}  `}>
            <button className=' relative z-10' onClick={handleMouseClick}>
                <svg
                    className='fill-white'
                    viewBox={`0 0 ${vb_size} ${vb_size}`}
                    width={size}>
                    <rect
                        className={`transition-all origin-center duration-500 ${
                            isActive &&
                            'translate-y-[-17.5%] translate-x-[-17.5%] rotate-[135deg] scale-x-110'
                        }`}
                        width={bar_width}
                        height={bar_height}
                        x={(100 - bar_width) / 2}
                        y={25 - bar_height / 2}
                        rx={bar_rx}
                    />
                    <rect
                        className={`transition-all origin-center duration-500 
                        ${isActive && 'opacity-0 scale-0'}`}
                        width={bar_width}
                        height={bar_height}
                        x={(100 - bar_width) / 2}
                        y={50 - bar_height / 2}
                        rx={bar_rx}
                    />
                    <rect
                        className={`transition-all origin-center duration-500 ${
                            isActive &&
                            'translate-x-[-17.5px] translate-y-[17.5px] rotate-[225deg] scale-x-110'
                        }`}
                        width={bar_width}
                        height={bar_height}
                        x={(100 - bar_width) / 2}
                        y={75 - bar_height / 2}
                        rx={bar_rx}
                    />
                </svg>
            </button>
            <aside
                className={`flex flex-col absolute top-0 right-0 transition-all origin-right duration-[500ms] bg-slate-500 pt-16 w-2/3 md:w-1/3 min-h-screen items-center gap-3  ${
                    isActive ? 'scale-x-1 ' : 'scale-x-0 '
                }`}>
                {props.children}
            </aside>
        </div>
    );
};
