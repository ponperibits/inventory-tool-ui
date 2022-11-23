import React from 'react';
import { useLocation, Route, Switch, Redirect } from 'react-router-dom';
import MbNavBar from 'containers/MbNavBar';
import appRoutes from 'appRoutes';
import { get } from 'lodash';

function Home() {
  const location = useLocation();
  const mainContentRef = React.useRef(null);

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContentRef.current.scrollTop = 0;
  }, [location]);

  const getRoutes = routes =>
    routes.map((prop, key) => {
      if (prop.collapse) {
        return getRoutes(prop.views);
      }
      if (prop.layout === '' && prop.component) {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            // eslint-disable-next-line react/no-array-index-key
            key={key}
            exact={get(prop, 'exact', false)}
          />
        );
      }

      return null;
    });

  return (
    <>
      <div className="main-content ml-1" ref={mainContentRef}>
        <MbNavBar />
        <Switch>
          {getRoutes(appRoutes.home)}
          <Redirect from="*" to="/dashboard" />
        </Switch>
      </div>
    </>
  );
}

export default Home;
