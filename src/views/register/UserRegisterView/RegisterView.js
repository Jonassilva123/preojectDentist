import React, { useState } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  TextField,
  Typography,
  makeStyles,
  Snackbar
} from '@material-ui/core';
import Page from 'src/components/Page';
import User from '../../../services/serviceUser';
import { Alert } from '@material-ui/lab';
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const RegisterView = () => {
  const classes = useStyles();
  const [role, setRole] = useState('');
  const [open, setOpen] = useState(true);
  const [message, setMessage] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  async function handleUser(event) {
    event.preventDefault();
    const data = {
      firstName,
      lastName,
      email,
      password,
      role
    };
    await User.create(data);
    setMessage('Usuário cadastrado com sucesso!');
    setOpen(true);
    setError(false);
    return setTimeout(() => {
      window.location.href = '/app/dashboard';
    }, 2000);
  }

  return (
    <Page className={classes.root} title="Register">
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
                .email('Email está inválido')
                .max(255)
                .required('O Email é Obrigatório'),
              firstName: Yup.string().max(255).required('O Nome é Obrigatório'),
              lastName: Yup.string()
                .max(255)
                .required('O Sobrenome é Obrigatório'),
              password: Yup.string().max(255).required('A Senha é Obrigatória'),
              policy: Yup.boolean().oneOf([true], 'This field must be checked')
            })}
          >
            {({
              errors,
              handleBlur,

              touched
            }) => (
              <form>
                <Box mb={3}>
                  <Typography color="textPrimary" variant="h2">
                    Cadastrar Novo Usuário
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Use seu e-mail para criar uma nova conta.
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.firstName && errors.firstName)}
                  fullWidth
                  helperText={touched.firstName && errors.firstName}
                  label="Nome"
                  margin="normal"
                  name="firstName"
                  onBlur={handleBlur}
                  onChange={(e) => setFirstName(e.target.value)}
                  value={firstName}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.lastName && errors.lastName)}
                  fullWidth
                  helperText={touched.lastName && errors.lastName}
                  label="Sobrenome"
                  margin="normal"
                  name="lastName"
                  onBlur={handleBlur}
                  onChange={(e) => setLastName(e.target.value)}
                  value={lastName}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="E-mail"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  value={email}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Senha"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  value={password}
                  variant="outlined"
                />
                <Box my={2}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">
                      Selecione o tipo de usuário
                    </FormLabel>
                    <FormGroup aria-label="position" row>
                      <FormControlLabel
                        value="admin"
                        control={
                          <Checkbox
                            color="primary"
                            checked={role === 'admin'}
                          />
                        }
                        label="Administrador"
                        labelPlacement="end"
                        onChange={(e) => setRole(e.target.value)}
                      />
                      <FormControlLabel
                        value="mod"
                        control={
                          <Checkbox color="primary" checked={role === 'mod'} />
                        }
                        label="Moderador"
                        labelPlacement="end"
                        onChange={(e) => setRole(e.target.value)}
                      />
                    </FormGroup>
                  </FormControl>
                </Box>

                <Box my={2}>
                  <Button
                    onClick={handleUser}
                    color="primary"
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Salvar Informações
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
          <Snackbar
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
          >
            <Alert
              onClose={handleClose}
              severity={error === true ? 'error' : 'success'}
            >
              {message}
            </Alert>
          </Snackbar>
        </Container>
      </Box>
    </Page>
  );
};

export default RegisterView;
