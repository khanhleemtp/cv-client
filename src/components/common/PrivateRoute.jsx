import { Route, Redirect } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from './../../redux/user/user.selectors';
import { connect } from 'react-redux';

function PrivateRoute({ children, isAuthenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
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

export default connect(mapStateToProps)(PrivateRoute);
