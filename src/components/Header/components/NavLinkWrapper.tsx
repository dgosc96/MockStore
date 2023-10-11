import { NavLink } from 'react-router-dom';

export const NavLinkWrapper = (props: React.ComponentProps<typeof NavLink>) => {
  return (
    <NavLink
      {...props}
      className={`${props.className} whitespace-pre p-1 align-middle text-lg transition-all active:text-slate-300
      sm:hover:text-slate-300 `}
    />
  );
};
