import React from 'react';
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

const useStyles = makeStyles(() => ({
  root: {}
}));

const ProfileDetails = ({ className, customers, ...rest }) => {
  const classes = useStyles();

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
            {customers.map(customer => (
              <>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Nome"
                    name="firstName"
                    required
                    value={`${customer.firstName} ${customer.lastName}`}
                    variant="outlined"
                  />
                </Grid>

                <Grid item md={3} xs={12}>
                  <TextField
                    fullWidth
                    label="documento"
                    name="text"
                    value={customer.document}
                    required
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={3} xs={12}>
                  <TextField
                    fullWidth
                    label="Data de nascimento"
                    name="dateOfBirth"
                    value={customer.birth}
                    type="text"
                    variant="outlined"
                  />
                </Grid>
              </>
            ))}
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
