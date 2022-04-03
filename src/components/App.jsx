/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/no-unused-state */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import TopNav from './TopNav';
import Player from '../containers/Player';
import selectors from '../state/ducks/user/selectors';

import './App.scss';

class App extends React.PureComponent {
  render() {
    const { children, isAuthenticated } = this.props;
    return (
      <>
        <Grid
          alignItems="stretch"
          className="base-layout"
          container
          direction="column"
          elevation={0}
          justifyContent="space-between"
          spacing={2}
        >
          <Grid item xs={12}>
            <TopNav />
          </Grid>
          <Grid item style={{ minHeight: '48.5rem' }} xs={12}>
            {children}
          </Grid>
          {isAuthenticated && (
          <Grid item xs={12}>
            <Player className="footer" />
          </Grid>
          )}
        </Grid>
      </>
    );
  }
}
App.propTypes = {
};

App.defaultProps = {
  isAuthenticated: false,
};

App.propTypes = {
  children: PropTypes.node.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: selectors.isAuthenticated(state),
});

const container = connect(mapStateToProps, null)(App);

const TestExports = { App };

export { TestExports };

export default container;
