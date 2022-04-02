import React from 'react';
import { connect } from 'react-redux';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/src/styles.scss';

class Player extends React.PureComponent {
  render() {
    return (
      <AudioPlayer
        autoPlay
        onPlay={(e) => console.log('onPlay')}
        src="http://example.com/audio.mp3"
      />
    );
  }
}

Player.defaultProps = {
  newUser: null,
};

Player.propTypes = {
  newUser: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  newUser: selectors.getNewUser(state),
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Player);
