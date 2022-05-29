import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch, useLocation } from 'react-router-dom';
import { APP_ROUTES } from '../../constants';
import {
  ForgotPasswordPage,
  OrderPage,
  ProfilePage,
  RegisterPage,
  ResetPasswordPage,
  SignInPage
} from '../../pages';
import { fetchUserThunk } from '../../services/slices/user';
import { AppHeader } from '../app-header/header';
import styles from './app.module.css';

export const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(fetchUserThunk());
  }, []);

  const background = location.state && location.state.background;

  return (
    <>
      <AppHeader />
      <div className={styles.container}>
        <main className={styles.main}>
          <Switch location={background || location}>
            <Route path={APP_ROUTES.LOGIN} exact={true}>
              <SignInPage />
            </Route>
            <Route path={APP_ROUTES.REGISTRATION} exact={true}>
              <RegisterPage />
            </Route>
            <Route path={APP_ROUTES.FORGOT_PASSWORD} exact={true}>
              <ForgotPasswordPage />
            </Route>
            <Route path={APP_ROUTES.RESET_PASSWORD} exact={true}>
              <ResetPasswordPage />
            </Route>
            <Route path={APP_ROUTES.ORDER} exact={true}>
              <OrderPage />
            </Route>
            <Route path={APP_ROUTES.PROFILE} exact={true}>
              <ProfilePage />
            </Route>
          </Switch>
        </main>
      </div>
    </>
  );
};
