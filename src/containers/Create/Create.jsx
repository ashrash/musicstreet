/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/sort-prop-types */
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
import { createNFT } from '../../state/ducks/user/actions';

import './Create.scss';

class Create extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: '',
      title: '',
      price: '',
    };
  }

  handleNameChange = (event) => {
    this.setState({ title: event.target.value });
  }

  handlePriceChange = (event) => {
    this.setState({ price: event.target.value });
  }

  handleFileChange = (event) => {
    const { file } = this.state;
    console.log(event.target.files[0]);
    this.setState({ file: event.target.files[0] });
  }

  handleSubmit = (event) => {
    const { createNFTAction } = this.props;
    const { file, title, price } = this.state;

    createNFTAction({ file, title, price });
  }

  render() {
    const { file, title, price } = this.state;
    return (
      <div className="toggle">
        <Paper className="paper-box">
          <h1>Enter NFT details</h1>
          <div style={{ padding: '1rem' }}>
            <TextField
              label="Title"
              onChange={this.handleNameChange}
              required
              value={title}
            />
          </div>
          <div style={{ padding: '1rem' }}>
            <TextField
              label="Price in MATIC"
              onChange={this.handlePriceChange}
              required
              value={price}
            />
          </div>
          <div style={{ padding: '1rem' }}>
            <p>Upload mp3</p>
            <label className="custom-file-upload">
              <input onChange={this.handleFileChange} type="file" />
              <i className="fa fa-cloud-upload" />
              Attach
            </label>
          </div>
          <Button color="default" onClick={this.handleSubmit} variant="contained">
            Mint NFT
          </Button>
        </Paper>

      </div>
    );
  }
}

Create.defaultProps = {
};

Create.propTypes = {
  classes: PropTypes.shape(
    {
      avatar: PropTypes.string,
      paper: PropTypes.string,
      submit: PropTypes.string,
      form: PropTypes.string,
    },
  ).isRequired,
  createNFTAction: PropTypes.func.isRequired,

};

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
  createNFTAction: (payload) => dispatch(createNFT(payload)),
});

const container = connect(mapStateToProps, mapDispatchToProps)(Create);

export default container;
