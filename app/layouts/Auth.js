import React, { useEffect } from 'react';
import { useLocation, Route, Switch, Redirect } from 'react-router-dom';

import appRoutes from 'appRoutes';

function Auth() {
  const location = useLocation();
  const mainContenRef = React.useRef(null);

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContenRef.current.scrollTop = 0;
    document.body.classList.add('bg-primary');
    return function cleanup() {
      document.body.classList.remove('bg-primary');
    };
  }, []);

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContenRef.current.scrollTop = 0;
  }, [location]);

  const getRoutes = routes =>
    routes.map((prop, key) => {
      if (prop.layout === '/auth') {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            // eslint-disable-next-line react/no-array-index-key
            key={key}
          />
        );
      }
      return null;
    });

  return (
    <div
      className="main-content w-100 h-100 fill-screen d-flex justify-content-center align-items-center"
      ref={mainContenRef}
    >
      <Switch>
        {getRoutes(appRoutes.auth)}
        <Redirect from="*" to="/auth/login" />
      </Switch>
    </div>
  );
}
export default Auth;
