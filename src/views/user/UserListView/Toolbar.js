import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  makeStyles,
  Grid
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useUser } from './userContext';
import serviceUser from '../../../services/serviceUser';

const useStyles = makeStyles(theme => ({
  root: {},
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  }
}));

const Toolbar = ({ className, ...rest }) => {
  const classes = useStyles();
  const [user, setUser] = useState('');
  const { filterUser, getUsers, autocompleteUsers } = useUser();
  const [currentUserRole, setCurrentUserRole] = useState('');

  const handleFilter = () => {
    if (!user) {
      return getUsers();
    }
    const data = user._id;
    return filterUser(data);
  };

  const _id = localStorage.getItem('_id');

  const getCorrentRole = async () => {
    const res = await serviceUser.search(_id);
    if (!res) {
      return;
    }
    return res.map(e => {
      return setCurrentUserRole(e.role);
    });
  };

  useEffect(() => {
    getCorrentRole();
  }, []);

  useEffect(() => {
    handleFilter();
  }, [user]);

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      {currentUserRole === 'admin' ? (
        <Box display="flex" justifyContent="flex-end">
          <Button href="/app/register" color="primary" variant="contained">
            Novo Usuário
          </Button>
        </Box>
      ) : (
        <></>
      )}
      <Box mt={3}>
        <Card>
          <CardContent>
            <Box maxWidth={500} display="flex">
              <Grid container spacing={3}>
                <Autocomplete
                  id="combo-box-demo"
                  onChange={(e, v) => setUser(v)}
                  options={autocompleteUsers}
                  getOptionLabel={option =>
                    `${option.firstName} ${option.lastName}`
                  }
                  style={{ width: 300 }}
                  renderInput={params => (
                    <TextField {...params} label="Busca" variant="outlined" />
                  )}
                />
              </Grid>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;
