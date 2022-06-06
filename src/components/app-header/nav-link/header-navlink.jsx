import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import styles from './header-navlink.module.css';

export const HeaderNavLink = ({ Icon, to, children }) => {
  return (
    <NavLink exact to={to} className={styles.nav_link} activeClassName={styles.nav_link_active}>
      <span className={styles.nav_link__logo}>
        <Icon />
      </span>
      {children}
    </NavLink>
  );
};

HeaderNavLink.defaultProps = {
  type: 'secondary'
};

HeaderNavLink.propTypes = {
  Icon: PropTypes.elementType,
  to: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired
};
