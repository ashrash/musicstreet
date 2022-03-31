import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Route, Switch, withRouter,
} from 'react-router-dom';
import App from 'components/App';
import Login from 'containers/Login';
import Landing from 'containers/Landing';
import selectors from '../state/ducks/user/selectors';

class ProtectedRoutes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { isAuthenticated, history } = this.props;
    if (!isAuthenticated) {
      history.push('/login');
    } else {
      history.push('/player');
    }
  }

  renderLogin = () => {
    const { isAuthenticated, history } = this.props;
    return <Login history={history} isAuthenticated={isAuthenticated} />;
  }

  renderLanding = () => <Landing />

  render() {
    return (
      <App>
        <Switch>
          <Route path="/login" render={this.renderLogin} />
          <Route path="/landing" render={this.renderLanding} />
        </Switch>
      </App>
    );
  }
}

ProtectedRoutes.defaultProps = {
  isAuthenticated: false,
};

ProtectedRoutes.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: selectors.isAuthenticated(state),
});

const container = connect(mapStateToProps, null)(ProtectedRoutes);

export default withRouter(container);
