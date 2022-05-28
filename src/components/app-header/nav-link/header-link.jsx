import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import styles from './header-link.module.css';

export const HeaderLink = ({ Icon, to, children }) => {
  return (
    <NavLink exact to={to} className={styles.nav_link} activeClassName={styles.nav_link_active}>
      <span className={styles.nav_link__logo}>
        <Icon />
      </span>
      {children}
    </NavLink>
  );
};

HeaderLink.defaultProps = {
  type: 'secondary'
};

HeaderLink.propTypes = {
  Icon: PropTypes.elementType,
  to: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired
};
