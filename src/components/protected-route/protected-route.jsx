import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Redirect, Route, useLocation } from 'react-router-dom';
import { APP_ROUTES } from '../../constants';

export const ProtectedRoute = ({ path, isAuth, children }) => {
  const user = useSelector((state) => state.user);
  const location = useLocation();

  return (
    <Route to={path} exact>
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

ProtectedRoute.propTypes = {
  path: PropTypes.string.isRequired,
  isAuth: PropTypes.bool,
  children: PropTypes.node.isRequired
};
