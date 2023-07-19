import { NavLink } from 'react-router-dom';
import { isMobile } from 'react-device-detect';

export const NavLinkWrapperComponent = (
    props: React.ComponentProps<typeof NavLink>
) => {
    return (
        <NavLink
            {...props}
            className={`${
                props.className
            } text-lg whitespace-pre p-1 align-middle transition-all ${
                !isMobile ? 'hover:text-slate-300' : ' active:text-slate-300'
            } `}
        />
    );
};
