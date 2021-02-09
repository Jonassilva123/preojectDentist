import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  FormGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  Checkbox,
  makeStyles,
  Snackbar
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useAuth } from 'src/context/AuthContext';
import serviceUser from '../../../services/serviceUser';

const useStyles = makeStyles(() => ({
  root: {}
}));

const ProfileDetails = ({ className, ...rest }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const [user, setUser] = useState([]);
  const [role, setRole] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currentEmail, setCurrentEmail] = useState('');
  const [currentFirstName, setCurrentFirstName] = useState('');
  const [currentLastName, setCurrentLastName] = useState('');

  const { currentUserRole } = useAuth();

  const _id = localStorage.getItem('_id');

  const handleClose = () => {
    setOpen(false);
  };

  async function getClient() {
    try {
      const response = await serviceUser.search(_id);
      return setUser(response);
    } catch (err) {
      console.error(err);
    }
  }

  function handleClient() {
    const data = user;
    data.map((e) => {
      setCurrentEmail(e.email);
      setCurrentFirstName(e.firstName);
      setCurrentLastName(e.lastName);
    });
    return data.map((res) => {
      setFirstName(res.firstName);
      setLastName(res.lastName);
      setEmail(res.email);
      setRole(res.role);
    });
  }

  function handleChangeUpdate() {
    if (email !== currentEmail) {
      return { email };
    }
    if (firstName !== currentFirstName) {
      return { firstName };
    }
    if (lastName !== currentLastName) {
      return { lastName };
    }
    if (password) {
      return { password };
    }
    if (role) {
      return { role };
    }
  }

  async function onSubmitUpDate() {
    try {
      const data = handleChangeUpdate();
      const res = await serviceUser.update(_id, data);
      console.log(res);
      setMessage('Informações foram salvas com sucesso!');
      setError(false);
      return setOpen(true);
    } catch (err) {
      if (err.response.data.error === 'User already exists!') {
        setMessage('Este email ja está cadastrado com outro usuário!');
        setError(true);
        return setOpen(true);
      }
    }
  }
  useEffect(() => {
    getClient();
  }, []);

  useEffect(() => {
    handleClient();
  }, [user]);

  return (
    <form
      onSubmit={onSubmitUpDate}
      autoComplete="off"
      noValidate
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader subheader="The information can be edited" title="Profile" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText="Please specify the first name"
                label="First name"
                name="firstName"
                onChange={(e) => setFirstName(e.target.value)}
                required
                value={firstName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Last name"
                name="lastName"
                onChange={(e) => setLastName(e.target.value)}
                required
                value={lastName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                required
                value={email}
                variant="outlined"
                disabled={
                  !(currentUserRole === 'mod' || currentUserRole === 'admin')
                }
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Nova Senha"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                required
                value={password}
                type="password"
                variant="outlined"
              />
            </Grid>
            {currentUserRole === 'admin' ? (
              <>
                <Grid item md={6} xs={12}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">
                      Selecione o tipo de usuário
                    </FormLabel>
                    <FormGroup aria-label="position" row>
                      <FormControlLabel
                        value="admin"
                        control={(
                          <Checkbox
                            color="primary"
                            checked={role === 'admin'}
                          />
                        )}
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
                </Grid>
              </>
            ) : (
              <></>
            )}
          </Grid>
        </CardContent>
        <Divider />
        <Box display="flex" justifyContent="flex-end" p={2}>
          <Button onClick={onSubmitUpDate} color="primary" variant="contained">
            Salvar Informações
          </Button>
        </Box>
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
      </Card>
    </form>
  );
};

ProfileDetails.propTypes = {
  className: PropTypes.string
};

export default ProfileDetails;
