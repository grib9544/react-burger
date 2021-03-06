import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch, useHistory } from 'react-router-dom';
import { APP_ROUTES } from '../../constants';
import { signOutThunk } from '../../services/slices/auth';
import { resetUser } from '../../services/slices/user';
import { TAppDispatch } from '../../types';
import { ProfileNavLink } from './components/profile-navlink';
import styles from './profile.module.css';
import { ProfileOrders } from './routes/orders';
import { ProfileUserForm } from './routes/profile';

export const ProfilePage: FC = () => {
  const dispatch = useDispatch<TAppDispatch>();
  const history = useHistory();

  const onSignOut = () => {
    dispatch(signOutThunk())
      .unwrap()
      .then(() => {
        dispatch(resetUser());

        history.push(APP_ROUTES.LOGIN);
      });
  };

  return (
    <div className={styles.profile_container}>
      <div>
        <div className={styles.profile_nav}>
          <ProfileNavLink to={APP_ROUTES.PROFILE}>Профиль</ProfileNavLink>
          <ProfileNavLink to={APP_ROUTES.PROFILE_ORDER}>История заказов</ProfileNavLink>
          <span className={styles.profile_nav__logout_btn} onClick={onSignOut}>
            Выход
          </span>
        </div>
        <p className={styles.profile_info_text}>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
      <div className={styles.profile_data}>
        <Switch>
          <Route path={APP_ROUTES.PROFILE} exact={true}>
            <ProfileUserForm />
          </Route>
          <Route path={APP_ROUTES.PROFILE_ORDER} exact={true}>
            <ProfileOrders />
          </Route>
        </Switch>
      </div>
    </div>
  );
};
