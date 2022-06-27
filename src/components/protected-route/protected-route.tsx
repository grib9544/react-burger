import { FC } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, useLocation } from 'react-router-dom';
import { APP_ROUTES } from '../../constants';
import { TRootState } from '../../types';

type TProtectedRouteProps = {
  path: APP_ROUTES;
  isAuth?: boolean;
  children: React.ReactNode;
};

export const ProtectedRoute: FC<TProtectedRouteProps> = ({ path, isAuth, children }) => {
  // FIXME: fix when store will be changed to ts
  const user = useSelector((state: TRootState) => state.user);
  const location = useLocation();

  return (
    <Route path={path} exact>
      {(isAuth && user.email) || (!isAuth && !user.email) ? (
        children
      ) : (
        <Redirect
          to={{
            pathname: isAuth ? APP_ROUTES.LOGIN : APP_ROUTES.ORDER,
            state: { from: location.pathname }
          }}
        />
      )}
    </Route>
  );
};
