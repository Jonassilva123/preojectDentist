import React from 'react';
import Results from './Results';
import FormProvider from './formContext';
import { Box, Container, makeStyles, Grid } from '@material-ui/core';
import Page from 'src/components/Page';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const LoginView = () => {
  const classes = useStyles();

  return (
    <FormProvider>
      <Page className={classes.root} title="Perguntas">
        <Box
          display="flex"
          flexDirection="column"
          width="100%"
          justifyContent="center"
        >
          <Container>
            <Grid container spacing={3}>
              <Grid item lg={12} md={12} xs={12}>
                <Results />
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Page>
    </FormProvider>
  );
};

export default LoginView;
