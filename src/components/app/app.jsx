import { Route, Switch } from 'react-router-dom';
import { LoginPage, OrderPage } from '../../pages';
import { AppHeader } from '../app-header/header';
import styles from './app.module.css';

export const App = () => {
  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        <Switch>
          <Route path="/login" exact={true}>
            <LoginPage />
          </Route>
          <Route path="/" exact={true}>
            <OrderPage />
          </Route>
        </Switch>
      </main>
    </>
  );
};
