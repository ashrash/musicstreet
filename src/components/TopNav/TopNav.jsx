import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './TopNav.scss';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import selectors from '../../state/ducks/user/selectors';

class TopNav extends React.PureComponent {
  render() {
    const { userName } = this.props;
    return (
      <AppBar
        className="top-navbar"
        elevation={0}
        position="static"
      >
        <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography noWrap style={{ color: '#1ed760' }} variant="h6">
            Music Street
          </Typography>
          <IconButton
            aria-controls="menu-appbar"
            aria-haspopup="true"
            aria-label="account of current user"
            color="inherit"
            edge="end"
          >
            <AccountCircle />
            <Typography>{userName}</Typography>
          </IconButton>
        </Toolbar>

      </AppBar>
    );
  }
}

TopNav.defaultProps = {
  userName: '',
};

TopNav.propTypes = {
  userName: PropTypes.string,
};

const mapStateToProps = (state) => ({
  userName: selectors.getUserName(state),
});

export default connect(mapStateToProps, null)(TopNav);
