import React from 'react';
import GeneralHealth from './GeneralHealth';
import InformationsClient from './InformationsClient';
import { Container, Grid } from '@material-ui/core';

const LoginView = () => {
  return (
    <div>
      <Container>
        <Grid container spacing={3}>
          <Grid item lg={12} md={12} xs={12}>
            <InformationsClient />
          </Grid>
          <Grid item lg={12} md={12} xs={12}>
            <GeneralHealth />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default LoginView;
