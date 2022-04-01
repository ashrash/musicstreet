/* eslint-disable react/no-unused-prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import FormLabel from '@material-ui/core/FormLabel';
import { saveUser } from '../../state/ducks/user/actions';

import './Signup.scss';

class Signup extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      role: 'user',
    };
  }

    handleNameChange = (event) => {
      this.setState({ name: event.target.value });
    };

    handleEmailChange = (event) => {
      this.setState({ email: event.target.value });
    };

    handleUserTypeChange = (event) => {
      this.setState({ role: event.target.value === 'Yes' ? 'artist' : 'User' });
    };

    handleSubmit = () => {
      const {
        name, email, role,
      } = this.state;
      const { saveUserAction } = this.props;
      if (name || email || role) {
        saveUserAction({ name, email, role });
      }
    };

    render() {
      const fabStyle = {
        right: 50,
        bottom: 50,
        position: 'fixed',
      };
      const { name, email, role } = this.state;
      return (
        <div className="toggle">
          <Paper className="paper-box">
            <h1>Enter User details</h1>
            <div style={{ padding: '1rem' }}>
              <TextField
                label="Name"
                onChange={this.handleNameChange}
                required
                value={name}
              />
            </div>
            <div style={{ padding: '1rem' }}>
              <TextField
                label="Email"
                onChange={this.handleEmailChange}
                required
                value={email}
              />
            </div>
            <div style={{ padding: '1rem' }}>
              <FormLabel component="legend">Are you an Artist ?</FormLabel>
              <RadioGroup onChange={this.handleUserTypeChange} value={role === 'artist' ? 'Yes' : 'No'}>
                <FormControlLabel control={<Radio />} label="Yes" value="Yes" />
                <FormControlLabel control={<Radio />} label="No" value="No" />
              </RadioGroup>
            </div>
            <Button color="default" onClick={this.handleSubmit} variant="contained">
              Proceed
            </Button>
          </Paper>

        </div>
      );
    }
}

Signup.defaultProps = {
};

Signup.propTypes = {
  saveUserAction: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
  saveUserAction: (payload) => dispatch(saveUser(payload)),
});

export default connect(null, mapDispatchToProps)(Signup);
