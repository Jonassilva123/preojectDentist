import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles
} from '@material-ui/core';

import serviceClients from 'src/services/serviceClients';
import { useParams } from 'react-router-dom';
import moment from 'moment';

const useStyles = makeStyles(() => ({
  root: {}
}));

const ProfileDetails = ({ className, ...rest }) => {
  const classes = useStyles();
  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    age: '',
    birth: '',
    start: '',
    state: '',
    city: ''
  });

  const { clientId } = useParams();

  const getClients = async () => {
    const clients = await serviceClients.search(clientId);
    return clients.map((client) => {
      setValues({
        firstName: client.firstName,
        lastName: client.lastName,
        age: moment().diff(client.birth, 'years'),
        birth: client.birth,
        state: client.state,
        city: client.city
      });
    });
  };
  useEffect(() => {
    getClients();
  }, []);

  return (
    <form
      autoComplete="off"
      noValidate
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader title="Paciente" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Nome"
                name="firstName"
                required
                value={`${values.firstName} ${values.lastName}`}
                variant="outlined"
                disabled
              />
            </Grid>

            <Grid item md={3} xs={12}>
              <TextField
                fullWidth
                label="Idade"
                name="text"
                disabled
                required
                value={values.age}
                variant="outlined"
              />
            </Grid>
            <Grid item md={3} xs={12}>
              <TextField
                fullWidth
                label="Data de nascimento"
                name="dateOfBirth"
                disabled
                type="text"
                value={values.birth}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </form>
  );
};

ProfileDetails.propTypes = {
  className: PropTypes.string
};

export default ProfileDetails;
