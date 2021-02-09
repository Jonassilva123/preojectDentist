import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  makeStyles,
  Avatar
} from '@material-ui/core';
import {
  BarChart as BarChartIcon,
  User as UserIcon,
  Users as UsersIcon
} from 'react-feather';
import { GroupAdd } from '@material-ui/icons';
import UserAvatar from 'src/assets/img/avatar.png';
import QuestionAnswerOutlinedIcon from '@material-ui/icons/QuestionAnswerOutlined';
import AssignmentTurnedInOutlinedIcon from '@material-ui/icons/AssignmentTurnedInOutlined';
import NavItem from './NavItem';

import serviceUser from 'src/services/serviceUser';
import { useAuth } from 'src/context/AuthContext';
import serviceClients from 'src/services/serviceClients';

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)'
  },
  avatar: {
    cursor: 'pointer',
    width: 80,
    height: 80
  }
}));

const NavBar = ({ onMobileClose, openMobile }) => {
  const classes = useStyles();
  const location = useLocation();
  const _id = localStorage.getItem('_id');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState('');
  const FORM_ID = process.env.REACT_APP_FORM_ID;

  const [currentClient, setCurrentClient] = useState({});
  const { currentUserEmail } = useAuth();

  const getClients = async () => {
    const { clients } = await serviceClients.find();
    return clients;
  };

  const filterCurrentClient = async () => {
    const data = await getClients();
    const client = data.filter((e) => e.email === currentUserEmail);

    if (client) {
      const clientId = client.map((e) => e._id);
      return setCurrentClient(clientId);
    }
  };

  async function getUser() {
    const res = await serviceUser.search(_id);
    if (res.length === 0) return;
    res.map(function (e) {
      setFirstName(e.firstName);
      setLastName(e.lastName);
      setRole(e.role);
    });
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    filterCurrentClient();
  }, [currentUserEmail]);

  function authNavigation() {
    if (role === 'client') {
      return [
        {
          href: '/app/account',
          icon: UserIcon,
          title: 'Perfil'
        },
        {
          href: '/app/answers',
          icon: QuestionAnswerOutlinedIcon,
          title: 'Respostas'
        },
        {
          href: `/app/questions/${FORM_ID}/${currentClient}`,
          icon: AssignmentTurnedInOutlinedIcon,
          title: 'Formulário'
        }
      ];
    } else {
      return [
        {
          href: '/app/dashboard',
          icon: BarChartIcon,
          title: 'Dashboard'
        },
        {
          href: '/app/users',
          icon: UsersIcon,
          title: 'Usuários'
        },
        {
          href: '/app/customers',
          icon: UsersIcon,
          title: 'Pacientes'
        },
        {
          href: '/app/account',
          icon: UserIcon,
          title: 'Perfil'
        },
        {
          href: '/app/register',
          icon: GroupAdd,
          title: 'Cadastrar'
        }
      ];
    }
  }

  function resolveTitlejob() {
    if (role === 'admin') {
      return 'Administrador';
    }
    if (role === 'mod') {
      return 'Moderador';
    }
    if (role === 'client') {
      return 'Cliente';
    }
  }

  const items = authNavigation();

  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const content = (
    <Box height="100%" display="flex" flexDirection="column">
      <Box alignItems="center" display="flex" flexDirection="column" p={2}>
        <Avatar
          className={classes.avatar}
          component={RouterLink}
          src={UserAvatar}
          to="/app/account"
        />

        <Typography className={classes.name} color="textPrimary" variant="h5">
          {`${firstName} ${lastName}`}
        </Typography>
        <Typography color="textSecondary" variant="body2">
          {resolveTitlejob()}
        </Typography>
      </Box>
      <Divider />
      <Box p={2}>
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
              onClick={item.onClick}
            />
          ))}
        </List>
      </Box>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

NavBar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false
};

export default NavBar;
