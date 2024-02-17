import { signOut } from '../../../lib/firebase/firebase';
import { NavLink } from 'react-router-dom';
import { useAuthUser } from '../../../context/AuthContext';
import { ROUTER_PATH } from '../../../routes';
import { DropdownMenu } from '../../DropdownMenu';
import { toastSingedOut } from '../../../lib/notifications/toasts';

type ProfileButtonProps = {
  onExpand?: () => void;
  onCollapse?: () => void;
};

export const ProfileButton = (props: ProfileButtonProps) => {
  const { user } = useAuthUser();

  if (user) {
    return (
      <DropdownMenu
        btnChildren={user.displayName ? user.displayName : user.email}
        btnClassName={`px-3 font-medium rounded-xl transition-colors hover:bg-neutral-100/60 active:bg-transparent `}
        btnClassNameOpen='bg-neutral-100/50'
        onExpand={props.onExpand}
        onCollapse={props.onCollapse}
      >
        <NavLink
          className={({ isActive }) =>
            `px-4 py-2 text-sm hover:bg-neutral-100 ${
              isActive && 'pointer-events-none font-medium '
            }`
          }
          to={ROUTER_PATH.PROFILE}
        >
          Account details
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `px-4 py-2 text-sm hover:bg-neutral-100 ${
              isActive && 'pointer-events-none font-medium '
            }`
          }
          to={'/'}
        >
          Wishlist
        </NavLink>
        <button
          onClick={() => signOut().then(() => toastSingedOut())}
          className=' bg-neutral-50 px-3 py-1 text-sm font-medium  hover:bg-neutral-100'
        >
          Sign out
        </button>
      </DropdownMenu>
    );
  }

  return (
    <NavLink
      className={({ isActive }) =>
        `inline-flex items-center rounded-md px-2 ${
          isActive
            ? ' pointer-events-none font-medium  '
            : 'hover:bg-gray-100 active:bg-gray-200'
        }`
      }
      to={ROUTER_PATH.LOGIN}
    >
      Login
    </NavLink>
  );
};
