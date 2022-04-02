/* eslint-disable react/no-unused-prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { connect } from 'react-redux';
import Fab from '@material-ui/core/Fab';
import PropTypes from 'prop-types';
import AddIcon from '@material-ui/icons/Add';
import Paper from '@material-ui/core/Paper';
import Player from '../Player';
import Signup from '../../components/Signup';
import selectors from '../../state/ducks/user/selectors';
import './Landing.scss';

class Landing extends React.PureComponent {
  render() {
    const { newUser } = this.props;
    const fabStyle = {
      right: 50,
      bottom: 50,
      position: 'fixed',
    };
    let landing = null;
    if (newUser) {
      landing = <Signup />;
    } else {
      landing = <Player className="footer" />;
    }
    return (
      <div className="toggle">
        {landing}
        <Fab aria-label="add" color="inherit" style={fabStyle}>
          <AddIcon />
        </Fab>
      </div>
    );
  }
}

Landing.defaultProps = {
  newUser: null,
};

Landing.propTypes = {
  newUser: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  newUser: selectors.getNewUser(state),
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
