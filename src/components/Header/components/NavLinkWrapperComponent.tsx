import { NavLink, NavLinkProps } from 'react-router-dom';

export const NavLinkWrapperComponent = (
    props: NavLinkProps & React.RefAttributes<HTMLAnchorElement>
) => {
    return (
        <NavLink
            {...props}
            className={`${props.className} text-lg p-1 align-middle transition-all hover:text-slate-300 hover:translate-y-[1px]`}
        />
    );
};
