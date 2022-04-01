/* eslint-disable no-unused-vars */
import React from 'react';
import { connect } from 'react-redux';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Paper from '@material-ui/core/Paper';
import './Landing.scss';

class Landing extends React.PureComponent {
  render() {
    const fabStyle = {
      right: 50,
      bottom: 50,
      position: 'fixed',
    };
    return (
      <div className="toggle">
        <Paper className="filterFields" />
        <Fab aria-label="add" color="inherit" style={fabStyle}>
          <AddIcon />
        </Fab>
      </div>
    );
  }
}

const mapStateToProps = (dispatch) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
