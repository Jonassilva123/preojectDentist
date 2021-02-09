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
import { useDashboard } from './dashboardContext';

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
  const [client, setClient] = useState('');
  const { filterClient, getClients, autocompleteClients } = useDashboard();

  const handleFilter = () => {
    if (!client) {
      return getClients();
    }
    const data = client._id;
    return filterClient(data);
  };

  useEffect(() => {
    handleFilter();
  }, [client]);

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Box mt={3}>
        <Card>
          <CardContent>
            <Box maxWidth={500} display="flex">
              <Grid container spacing={3}>
                <Autocomplete
                  id="combo-box-demo"
                  onChange={(e, v) => setClient(v)}
                  options={autocompleteClients}
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
