import React from 'react';
import { Box, Container, Typography, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  image: {
    marginTop: 50,
    display: 'inline-block',
    maxWidth: '100%',
    width: 560
  }
}));

const NotFoundView = () => {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="Cadastro de usuário">
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="md">
          <Typography align="center" color="textPrimary" variant="h1">
            Este usuário não tem permissão a esta página.
          </Typography>
          <Typography align="center" color="textPrimary" variant="subtitle2">
            Criação de usuário é permitido somente ao Administrador. Volte ao
            cadastro de clientes ou faça o login com usuário administrador.
          </Typography>
          <Box textAlign="center">
            <img
              alt="Under development"
              className={classes.image}
              src="/static/images/undraw_page_not_found_su7k.svg"
            />
          </Box>
        </Container>
      </Box>
    </Page>
  );
};

export default NotFoundView;
