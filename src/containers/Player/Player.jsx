/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable no-undef */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/src/styles.scss';

class Player extends React.PureComponent {
  render() {
    return (
      <AudioPlayer
        autoPlay
        onPlay={(e) => console.log('onPlay')}
        src="https://ipfs.io/ipfs/bafybeiguije2i465rj4u6e73psuylfdked7byepotckrd2m2rw6srtlteq/MyExampleNFT.mp3"
      />
    );
  }
}

Player.defaultProps = {
  newUser: null,
};

Player.propTypes = {
};

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Player);
