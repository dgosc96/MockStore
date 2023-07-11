import { NavLink, NavLinkProps } from 'react-router-dom';

export const NavLinkWrapperComponent = (
    props: NavLinkProps & React.RefAttributes<HTMLAnchorElement>
) => {
    return (
        <NavLink
            {...props}
            className={`${props.className} text-lg p-1 hover:underline underline-offset-4 `}>
            {props.children}
        </NavLink>
    );
};
