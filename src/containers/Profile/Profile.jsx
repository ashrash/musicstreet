/* eslint-disable no-unused-vars */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Album from '../../components/Album';
import { fetchNFTData } from '../../state/ducks/user/actions';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { getNFTData } = this.props;
    getNFTData();
  }

  render() {
    return (<Album />);
  }
}

Profile.defaultProps = {
};

Profile.propTypes = {
  getNFTData: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
  getNFTData: () => dispatch(fetchNFTData()),
});

const container = connect(mapStateToProps, mapDispatchToProps)(Profile);

export default container;
