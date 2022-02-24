import styles from './nav-link.module.css'
import PropTypes from 'prop-types';


export const NavLink = ({ Icon, type, href, children }) => {

    const className = type === 'primary' ? styles.nav_link_active : styles.nav_link

    return (
        <a href={href} className={className}>
            <span className={styles.nav_link__logo}>
                <Icon type={type}/>
            </span>
            {children}
        </a>
    )
}

NavLink.defaultProps = {
    type: 'secondary'
}; 

NavLink.propTypes = {
    Icon: PropTypes.elementType,
    href: PropTypes.string.isRequired,
    children: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['primary', 'secondary'])
}