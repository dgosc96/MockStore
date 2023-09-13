import { NavLink } from "react-router-dom";
import { isMobile } from "react-device-detect";

export const NavLinkWrapperComponent = (
  props: React.ComponentProps<typeof NavLink>,
) => {
  return (
    <NavLink
      {...props}
      className={`${
        props.className
      } whitespace-pre p-1 align-middle text-lg transition-all ${
        !isMobile ? "hover:text-slate-300" : " active:text-slate-300"
      } `}
    />
  );
};
