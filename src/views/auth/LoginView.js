import React, { useState } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  makeStyles,
  Snackbar
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import Page from 'src/components/Page';
import { useAuth } from '../../context/AuthContext';

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
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const { username, setUsername, password, setPassword, signIn } = useAuth();

  function handleSubmit(event) {
    event.preventDefault();
    if (username.length === 0 && password.length === 0) {
      setMessage('Campo Usuário e Senha estão vázios.');
      setOpen(true);
    } else if (username.length === 0) {
      setMessage('Campo Usuário está vázio.');
      setOpen(true);
    } else if (password.length === 0) {
      setMessage('Campo Senha está vázio.');
      setOpen(true);
    } else {
      signIn(username, password).then(() => window.location.reload());
      return;
    }
  }

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Page className={classes.root} title="Login">
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <Formik
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email('Must be a valid email')
                .max(255)
                .required('Email is required'),
              password: Yup.string()
                .max(255)
                .required('Password is required')
            })}
          >
            {({ errors, handleBlur, isSubmitting, touched }) => (
              <form onSubmit={handleSubmit}>
                <Box mb={3}>
                  <Typography color="textPrimary" variant="h2" align="center">
                    Entre
                  </Typography>
                  <Typography
                    align="center"
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Faça o login na Plataforma
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="Email Address"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={e => setUsername(e.target.value)}
                  type="email"
                  value={username}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Password"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={e => setPassword(e.target.value)}
                  type="password"
                  value={password}
                  variant="outlined"
                />
                <Box my={2}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Enviar
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
          <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
          >
            <Alert onClose={handleClose} severity="error">
              {message}
            </Alert>
          </Snackbar>
        </Container>
      </Box>
    </Page>
  );
};

export default LoginView;
