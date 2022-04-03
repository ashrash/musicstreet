/* eslint-disable no-unused-vars */
import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './TopNav.scss';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Link } from 'react-router-dom';
import selectors from '../../state/ducks/user/selectors';

class TopNav extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
    };
  }

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  }

  handleClose = () => {
    this.setState({ anchorEl: null });
  }

  render() {
    const { userName } = this.props;
    const { anchorEl } = this.state;
    return (
      <AppBar
        className="top-navbar"
        elevation={0}
        position="static"
      >
        <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Link style={{ textDecoration: 'none' }} to="/landing">
            <Typography noWrap style={{ color: '#1ed760' }} variant="h6">
              Music Street
            </Typography>
          </Link>
          <Button
            className="text"
            color="primary"
            onClick={this.handleClick}
            startIcon={<AccountCircle />}
          >
            {userName}
          </Button>
          <Menu
            anchorEl={anchorEl}
            id="simple-menu"
            keepMounted
            onClose={this.handleClose}
            open={Boolean(anchorEl)}
          >
            <Link style={{ textDecoration: 'none', color: 'black' }} to="/profile">
              <MenuItem onClick={this.handleClose}>Profile</MenuItem>
            </Link>
            <Link style={{ textDecoration: 'none', color: 'black' }} to="/profile">
              <MenuItem onClick={this.handleClose}>My NFTs</MenuItem>
            </Link>
            <MenuItem onClick={this.handleClose}>Logout</MenuItem>
          </Menu>
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
