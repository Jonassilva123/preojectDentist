import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles
} from '@material-ui/core';

import { useProfile } from './contextProfile';

const useStyles = makeStyles(() => ({
  root: {}
}));

const ProfileDetails = ({ className, ...rest }) => {
  const classes = useStyles();

  const { client } = useProfile();

  const handleChange = event => {};

  return (
    <form
      autoComplete="off"
      noValidate
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader
          subheader="As informações podem ser editadas."
          title="Responsável"
        />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                label="Nome do pai"
                name="firstName"
                onChange={handleChange}
                required
                value={client.father}
                variant="outlined"
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                label="Nome da mãe"
                onChange={handleChange}
                required
                value={client.mother}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box display="flex" justifyContent="flex-end" p={2}>
          <Button color="primary" variant="contained">
            Salvar Informações
          </Button>
        </Box>
      </Card>
    </form>
  );
};

ProfileDetails.propTypes = {
  className: PropTypes.string
};

export default ProfileDetails;
