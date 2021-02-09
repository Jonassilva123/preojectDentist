import React, { useState } from 'react';
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
  makeStyles
} from '@material-ui/core';

import { useProfile } from './contextProfile';

const useStyles = makeStyles(() => ({
  root: {}
}));

const ProfileDetails = ({ className, ...rest }) => {
  const classes = useStyles();
  const [values, setValues] = useState({});

  const { client } = useProfile();

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  function calcAge() {
    const dataAtual = new Date();
    const anoAtual = dataAtual.getFullYear();
    if (!client.birth) {
      return;
    }
    const anoNascParts = client.birth.split('/');
    const diaNasc = anoNascParts[0];
    const mesNasc = anoNascParts[1];
    const anoNasc = anoNascParts[2];
    let idade = anoAtual - anoNasc;
    const mesAtual = dataAtual.getMonth() + 1;

    //Se mes atual for menor que o nascimento, nao fez aniversario ainda;
    if (mesAtual < mesNasc) {
      idade--;
    } else {
      //Se estiver no mes do nascimento, verificar o dia
      if (mesAtual == mesNasc) {
        if (new Date().getDate() < diaNasc) {
          //Se a data atual for menor que o dia de nascimento ele ainda nao fez aniversario
          idade--;
        }
      }
    }
    return idade;
  }

  return (
    <form
      autoComplete="off"
      noValidate
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader
          subheader="As informações podem ser editadas."
          title="Perfil"
        />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Nome"
                name="firstName"
                onChange={handleChange}
                required
                value={client.firstName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Sobrenome"
                name="lastName"
                onChange={handleChange}
                required
                value={client.lastName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <TextField
                fullWidth
                label="Idade"
                name="text"
                onChange={handleChange}
                required
                value={calcAge()}
                variant="outlined"
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <TextField
                fullWidth
                label="Data de nascimento"
                name="dateOfBirth"
                onChange={handleChange}
                type="text"
                value={client.birth}
                variant="outlined"
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <TextField
                fullWidth
                label="Inicio do Tratamento"
                name="startOfTreatment"
                onChange={handleChange}
                type="text"
                value={client.start}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Estado"
                name="estado"
                onChange={handleChange}
                required
                value={client.state}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Selecione a cidade"
                onChange={handleChange}
                value={client.city}
                variant="outlined"
              ></TextField>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box display="flex" justifyContent="flex-end" p={2}>
          <Button color="primary" variant="contained">
            Salvar Informações
          </Button>
        </Box>
      </Card>
    </form>
  );
};

ProfileDetails.propTypes = {
  className: PropTypes.string
};

export default ProfileDetails;
