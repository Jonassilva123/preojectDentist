import React from 'react';
import { Container, Grid, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import Users from './Users';
import LatestOrders from './LatestOrders';
import FormResp from './FormResp';
import Patient from './Patient';
import DashboardProvider from './dashboardContext';
import Toolbar from './Toolbar';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Dashboard = () => {
  const classes = useStyles();

  return (
    <DashboardProvider>
      <Page className={classes.root} title="Dashboard">
        <Container maxWidth={false}>
          <Grid container spacing={3}>
            <Grid item lg={4} sm={6} xl={3} xs={12}>
              <Users />
            </Grid>
            <Grid item lg={4} sm={6} xl={3} xs={12}>
              <Patient />
            </Grid>
            <Grid item lg={4} sm={6} xl={3} xs={12}>
              <FormResp />
            </Grid>
            <Grid item lg={12} md={12} xl={9} xs={12}>
              <Toolbar />
            </Grid>
            <Grid item lg={12} md={12} xl={9} xs={12}>
              <LatestOrders />
            </Grid>
          </Grid>
        </Container>
      </Page>
    </DashboardProvider>
  );
};

export default Dashboard;
