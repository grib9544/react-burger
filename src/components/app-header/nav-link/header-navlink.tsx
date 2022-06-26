import { TIconProps } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/utils';
import { FC, ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './header-navlink.module.css';

type THeaderNavLinkProps = {
  Icon: ({ type }: TIconProps) => JSX.Element;
  to: string;
  children: ReactNode;
};

export const HeaderNavLink: FC<THeaderNavLinkProps> = ({ Icon, to, children }) => {
  return (
    <NavLink exact to={to} className={styles.nav_link} activeClassName={styles.nav_link_active}>
      <span className={styles.nav_link__logo}>
        <Icon type={'secondary'} />
      </span>
      {children}
    </NavLink>
  );
};
