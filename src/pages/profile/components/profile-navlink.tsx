import { FC, ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './profile-navlink.module.css';

type TProfileNavLinkProps = {
  to: string;
  children: ReactNode;
};

export const ProfileNavLink: FC<TProfileNavLinkProps> = ({ to, children }) => {
  return (
    <NavLink exact to={to} className={styles.nav_link} activeClassName={styles.nav_link_active}>
      {children}
    </NavLink>
  );
};
