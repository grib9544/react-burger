import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import { APP_ROUTES } from '../../constants';
import styles from './header.module.css';
import { HeaderNavLink } from './nav-link/header-navlink';

export const AppHeader = () => {
  return (
    <header className={styles.main_header}>
      <nav className={styles.main_nav}>
        <ul className={`${styles['main_nav__list']} ${styles['main_nav__list--left']}`}>
          <li>
            <HeaderNavLink to={APP_ROUTES.ORDER} Icon={BurgerIcon}>
              Конструктор
            </HeaderNavLink>
          </li>
          <li>
            <HeaderNavLink to="/mock" Icon={ListIcon}>
              Лента заказов
            </HeaderNavLink>
          </li>
        </ul>
        <a href="/" className={styles.main_nav__logo}>
          <Logo />
        </a>
        <ul className={`${styles['main_nav__list']} ${styles['main_nav__list--right']}`}>
          <li>
            <HeaderNavLink to={APP_ROUTES.PROFILE} Icon={ProfileIcon}>
              Личный кабинет
            </HeaderNavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};
