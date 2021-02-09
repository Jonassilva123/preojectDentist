import React from 'react';
import { Box, Container, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import Results from './Results';
import Toolbar from './Toolbar';
import ClientProvider from './clientContext';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const CustomerListView = () => {
  const classes = useStyles();
  return (
    <ClientProvider>
      <Page className={classes.root} title="Customers">
        <Container maxWidth={false}>
          <Toolbar />
          <Box mt={3}>
            <Results />
          </Box>
        </Container>
      </Page>
    </ClientProvider>
  );
};

export default CustomerListView;
