/* eslint-disable react/no-unused-prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { connect } from 'react-redux';
import Fab from '@material-ui/core/Fab';
import PropTypes from 'prop-types';
import AddIcon from '@material-ui/icons/Add';
import Signup from '../../components/Signup';
import selectors from '../../state/ducks/user/selectors';
import './Landing.scss';

class Landing extends React.PureComponent {
  handleClick = () => {
    const { history } = this.props;
    history.push('/createnft');
  }

  render() {
    const { newUser } = this.props;
    const fabStyle = {
      right: '3rem',
      bottom: '10rem',
      position: 'fixed',
    };
    let landing = null;
    if (newUser) {
      landing = <Signup />;
    }
    return (
      <div className="toggle">
        {landing}
        <Fab aria-label="add" color="inherit" onClick={this.handleClick} style={fabStyle}>
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
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  newUser: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  newUser: selectors.getNewUser(state),
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
