import React, { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

const PrivateRoute = ({ component, ...rest }: any) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, loading, loadUser } = authContext;

  useEffect(()=> {
    loadUser();
    // eslint-disable-next-line
  },[])
  return (
    <div>
      <Route
        {...rest}
        render={(props) =>
          !isAuthenticated && !loading ? (
            <Redirect to='/login' />
          ) : (
            <Route {...props} component={component} render={undefined} />
          )
        }
      />
    </div>
  );
};

export default PrivateRoute;
