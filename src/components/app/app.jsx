import { Route, Switch } from 'react-router-dom';
import { APP_ROUTES } from '../../constants';
import { ForgotPasswordPage, LoginPage, OrderPage, RegisterPage } from '../../pages';
import { AppHeader } from '../app-header/header';
import styles from './app.module.css';

export const App = () => {
  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        <Switch>
          <Route path={APP_ROUTES.LOGIN} exact={true}>
            <LoginPage />
          </Route>
          <Route path={APP_ROUTES.REGISTRATION} exact={true}>
            <RegisterPage />
          </Route>
          <Route path={APP_ROUTES.FORGOT_PASSWORD} exact={true}>
            <ForgotPasswordPage />
          </Route>
          <Route path={APP_ROUTES.ORDER} exact={true}>
            <OrderPage />
          </Route>
        </Switch>
      </main>
    </>
  );
};
