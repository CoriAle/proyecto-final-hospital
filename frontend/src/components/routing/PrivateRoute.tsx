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
            <section id="main-content">
              <section className="wrapper site-min-height">
                <Route {...props} component={component} render={undefined} />
              </section>
            </section>
          )
        }
      />
    </div>
  );
};

export default PrivateRoute;
