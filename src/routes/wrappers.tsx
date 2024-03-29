import { type LinkProps, Link as RouterLink } from 'react-router-dom';
import type { T_RouterPathUnion } from './CONSTANTS';

interface CustomLinkProps extends Omit<LinkProps, 'to'> {
  to: T_RouterPathUnion;
}

export const Link = (props: CustomLinkProps) => {
  return <RouterLink {...props} />;
};
