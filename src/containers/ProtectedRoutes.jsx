import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Route, Switch, withRouter,
} from 'react-router-dom';
import App from 'components/App';
import Login from 'containers/Login';
import Profile from 'containers/Profile';
import Landing from 'containers/Landing';
import Create from 'containers/Create';
import selectors from '../state/ducks/user/selectors';

class ProtectedRoutes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.shouldRedirect = false;
  }

  componentDidMount() {
    const { isAuthenticated, history, newUser } = this.props;
    this.shouldRedirect = true;
    if (isAuthenticated || newUser) {
      history.push('/landing');
    } else {
      history.push('/login');
    }
  }

  renderLogin = () => {
    const { isAuthenticated, history, newUser } = this.props;
    return <Login history={history} isAuthenticated={isAuthenticated} newUser={newUser} />;
  }

  renderProfile = () => {
    const { isAuthenticated, history } = this.props;
    return <Profile history={history} isAuthenticated={isAuthenticated} />;
  }

  renderLanding = () => {
    const { history } = this.props;
    return <Landing history={history} />;
  }

  renderCreate = () => <Create />

  render() {
    return (
      <App>
        <Switch>
          <Route path="/login" render={this.renderLogin} />
          <Route path="/profile" render={this.renderProfile} />
          <Route path="/landing" render={this.renderLanding} />
          <Route path="/createnft" render={this.renderCreate} />
        </Switch>
      </App>
    );
  }
}

ProtectedRoutes.defaultProps = {
  isAuthenticated: false,
  newUser: null,
};

ProtectedRoutes.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  isAuthenticated: PropTypes.bool,
  newUser: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: selectors.isAuthenticated(state),
  newUser: selectors.getNewUser(state),
});

const container = connect(mapStateToProps, null)(ProtectedRoutes);

export default withRouter(container);
