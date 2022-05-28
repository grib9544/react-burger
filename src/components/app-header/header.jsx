import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import { APP_ROUTES } from '../../constants';
import styles from './header.module.css';
import { HeaderLink } from './nav-link/header-link';

export const AppHeader = () => {
  return (
    <header className={styles.main_header}>
      <nav className={styles.main_nav}>
        <ul className={`${styles['main_nav__list']} ${styles['main_nav__list--left']}`}>
          <li>
            <HeaderLink to={APP_ROUTES.ORDER} Icon={BurgerIcon}>
              Конструктор
            </HeaderLink>
          </li>
          <li>
            <HeaderLink to="/mock" Icon={ListIcon}>
              Лента заказов
            </HeaderLink>
          </li>
        </ul>
        <a href="/" className={styles.main_nav__logo}>
          <Logo />
        </a>
        <ul className={`${styles['main_nav__list']} ${styles['main_nav__list--right']}`}>
          <li>
            <HeaderLink to="/mock1" Icon={ProfileIcon}>
              Личный кабинет
            </HeaderLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};
