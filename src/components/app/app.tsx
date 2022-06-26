import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { APP_ROUTES } from '../../constants';
import {
  ForgotPasswordPage,
  OrderPage,
  ProfilePage,
  RegisterPage,
  ResetPasswordPage,
  SignInPage
} from '../../pages';
import { fetchIngredientsThunk } from '../../services/slices/burger';
import { fetchUserThunk } from '../../services/slices/user';
import { TAppDispatch, TLocation } from '../../types';
import { AppHeader } from '../app-header/header';
import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { Modal } from '../modal/modal';
import { ProtectedRoute } from '../protected-route/protected-route';
import styles from './app.module.css';

export const App = () => {
  const dispatch = useDispatch<TAppDispatch>();
  const location = useLocation<TLocation>();
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchUserThunk());
  }, []);

  useEffect(() => {
    dispatch(fetchIngredientsThunk());
  }, []);

  const background = location.state?.background;

  return (
    <>
      <AppHeader />
      <div className={styles.container}>
        <main className={styles.main}>
          <Switch location={background || location}>
            <ProtectedRoute path={APP_ROUTES.LOGIN}>
              <SignInPage />
            </ProtectedRoute>
            <ProtectedRoute path={APP_ROUTES.REGISTRATION}>
              <RegisterPage />
            </ProtectedRoute>
            <ProtectedRoute path={APP_ROUTES.FORGOT_PASSWORD}>
              <ForgotPasswordPage />
            </ProtectedRoute>
            <ProtectedRoute path={APP_ROUTES.RESET_PASSWORD}>
              <ResetPasswordPage />
            </ProtectedRoute>
            <Route path={APP_ROUTES.ORDER} exact>
              <OrderPage />
            </Route>
            <Route path={APP_ROUTES.INGREDIENT_DEATILS} exact>
              <IngredientDetails />
            </Route>
            <ProtectedRoute path={APP_ROUTES.PROFILE} isAuth>
              <ProfilePage />
            </ProtectedRoute>
            <Route>
              <h1>404 Not Found</h1>
            </Route>
          </Switch>
          {background && (
            <Route path={APP_ROUTES.INGREDIENT_DEATILS} exact>
              <Modal title="Детали ингредиента" onClose={() => history.goBack()}>
                <IngredientDetails />
              </Modal>
            </Route>
          )}
        </main>
      </div>
    </>
  );
};
