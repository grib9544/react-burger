import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './header.module.css';
import { NavLink } from './nav-link/nav-link';

export const AppHeader = () => {
  return (
    <header className={styles.main_header}>
      <nav className={styles.main_nav}>
        <ul className={`${styles['main_nav__list']} ${styles['main_nav__list--left']}`}>
          <li>
            <NavLink href="/" Icon={BurgerIcon} type="primary">
              Конструктор
            </NavLink>
          </li>
          <li>
            <NavLink href="/" Icon={ListIcon}>
              Лента заказов
            </NavLink>
          </li>
        </ul>
        <a href="/" className={styles.main_nav__logo}>
          <Logo />
        </a>
        <ul className={`${styles['main_nav__list']} ${styles['main_nav__list--right']}`}>
          <li>
            <NavLink href="/" Icon={ProfileIcon}>
              Личный кабинет
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};
