import { Route, Redirect } from 'react-router-dom';
import { selectCurrentUser } from './../../redux/user/user.selectors';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

function PublicRoute({ children, isAuthenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        !isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
const mapStateToProps = createStructuredSelector({
  isAuthenticated: selectCurrentUser,
});

export default connect(mapStateToProps)(PublicRoute);
