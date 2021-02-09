import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  AppBar,
  Badge,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  makeStyles
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import InputIcon from '@material-ui/icons/Input';
import Logo from 'src/components/Logo';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness5Icon from '@material-ui/icons/Brightness5';
import { useAuth } from '../../context/AuthContext';

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    width: 60,
    height: 60
  }
}));

const TopBar = ({ className, onMobileNavOpen, ...rest }) => {
  const classes = useStyles();
  const { logout, handleTheme, currentUserTheme } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    return navigate('/login', { replace: false });
  }
  function changeTheme(valueTheme) {
    return handleTheme(valueTheme);
  }

  return (
    <AppBar className={clsx(classes.root, className)} elevation={0} {...rest}>
      <Toolbar>
        <Hidden lgUp>
          <RouterLink to="/">
            <Logo />
          </RouterLink>
        </Hidden>
        <Box flexGrow={1} />
        <Hidden mdDown>
          <IconButton
            onClick={() => handleLogout()}
            color="inherit"
            title="Sair"
          >
            <InputIcon />
          </IconButton>
          {currentUserTheme === 'dark' ? (
            <IconButton
              onClick={() => changeTheme('light')}
              color="inherit"
              title="Mude o tema para Light"
            >
              <Brightness5Icon />
            </IconButton>
          ) : (
            <IconButton
              onClick={() => changeTheme('dark')}
              color="inherit"
              title="Mude o tema para Dark"
            >
              <Brightness4Icon />
            </IconButton>
          )}
        </Hidden>
        <Hidden lgUp>
          <IconButton color="inherit" onClick={onMobileNavOpen}>
            <MenuIcon />
          </IconButton>
          <IconButton
            onClick={() => handleLogout()}
            color="inherit"
            title="Sair"
          >
            <InputIcon />
          </IconButton>
          {currentUserTheme === 'dark' ? (
            <IconButton
              onClick={() => changeTheme('light')}
              color="inherit"
              title="Mude o tema para Light"
            >
              <Brightness5Icon />
            </IconButton>
          ) : (
            <IconButton
              onClick={() => changeTheme('dark')}
              color="inherit"
              title="Mude o tema para Dark"
            >
              <Brightness4Icon />
            </IconButton>
          )}
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func
};

export default TopBar;
