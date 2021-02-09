import React, { useState, useEffect } from 'react';
import { Container, Grid, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import { useParams } from 'react-router-dom';
import SettingsClient from './settingsClient';
import InformationsClient from './informationsClient';

import serviceClients from '../../../../services/serviceClients';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const NewRegister = () => {
  const classes = useStyles();
  const { id } = useParams();

  const [customers, setCustomers] = useState([]);

  async function getClient() {
    const res = await serviceClients.search(id);
    return setCustomers(res);
  }

  useEffect(() => {
    getClient();
  }, []);

  return (
    <Page className={classes.root} title="Register">
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item lg={12} md={12} xs={12}>
            <SettingsClient _id={id} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default NewRegister;
