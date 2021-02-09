import React from 'react';
import { Box, Container, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import Results from './Results';
import Toolbar from './Toolbar';
import UserProvider from './userContext';

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
    <UserProvider>
      <Page className={classes.root} title="Users">
        <Container maxWidth={false}>
          <Toolbar />
          <Box mt={3}>
            <Results />
          </Box>
        </Container>
      </Page>
    </UserProvider>
  );
};

export default CustomerListView;
