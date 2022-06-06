import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import styles from './profile-navlink.module.css';

export const ProfileNavLink = ({ to, children }) => {
  return (
    <NavLink exact to={to} className={styles.nav_link} activeClassName={styles.nav_link_active}>
      {children}
    </NavLink>
  );
};

ProfileNavLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired
};
