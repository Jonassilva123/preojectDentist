import React, { useEffect, useState } from 'react';
import { Container, Grid, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import ProfileProvider from './contextProfile';
import Results from './Results';
import { useParams } from 'react-router-dom';

import serviceClients from '../../../services/serviceClients';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Perfil = () => {
  const classes = useStyles();
  const { clientId } = useParams();
  const [client, setClient] = useState([]);

  async function getProfile() {
    const res = await serviceClients.search(clientId);
    return res;
  }

  async function handleProfile() {
    const data = await getProfile();
    return data.map((e) => {
      return setClient({
        firstName: e.firstName,
        lastName: e.lastName,
        document: e.document,
        birth: e.birth,
        email: e.email,
        phoneOne: e.phones.map((e) => e.one),
        phoneTwo: e.phones.map((e) => e.two),
        father: e.father,
        mother: e.mother,
        state: e.place.map((e) => e.state),
        city: e.place.map((e) => e.city)
      });
    });
  }
  useEffect(() => {
    handleProfile();
  }, []);

  return (
    <ProfileProvider>
      <Page className={classes.root} title="Perfil">
        <Container maxWidth="lg">
          <Results client={client} id={clientId} />
        </Container>
      </Page>
    </ProfileProvider>
  );
};

export default Perfil;
