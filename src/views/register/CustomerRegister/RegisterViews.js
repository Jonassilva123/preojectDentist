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
  makeStyles,
  Snackbar,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import serviceClient from '../../../services/serviceClients';
import { SearchZip } from '../../../services/serviceZip';

const useStyles = makeStyles(() => ({
  root: {}
}));

const ProfileDetails = ({ className, ...rest }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const classes = useStyles();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [document, setDocument] = useState('');
  const [birth, setBirth] = useState('');
  const [email, setEmail] = useState('');
  const [phoneOne, setPhoneOne] = useState('');
  const [phoneTwo, setPhoneTwo] = useState('');
  const [father, setFather] = useState('');
  const [mother, setMother] = useState('');
  const [zip, setZip] = useState('');
  const [street, setStreet] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [number, setNumber] = useState('');
  const [complement, setComplement] = useState('');
  const [payingResp, setPayingResp] = useState('');
  const [docPayingResp, setDocPayingResp] = useState('');
  const [genre, setGenre] = useState('');

  const getZip = async () => {
    try {
      if (zip.length === 8) {
        const response = await SearchZip.find(zip);
        setCity(response.city);
        setZip(response.cep);
        setStreet(response.street);
        setState(response.state);
        setNeighborhood(response.neighborhood);
      } else {
        return;
      }
    } catch (err) {
      console.error(err);
    }
  };

  function nameRespPayment() {
    if (payingResp === 'mãe') {
      return mother;
    }
    if (payingResp === 'pai') {
      return father;
    }

    return '';
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    getZip();
  }, [zip]);

  const handleChange = async (event) => {
    event.preventDefault();
    const data = {
      firstName,
      lastName,
      genre,
      document,
      birth,
      email,
      phoneOne,
      phoneTwo,
      father,
      mother,
      zip,
      street,
      neighborhood,
      city,
      state,
      number,
      complement,
      bondsman: {
        parent: payingResp,
        document: docPayingResp,
        name: nameRespPayment()
      }
    };
    try {
      if (data.firstName.length === 0) {
        setMessage('Campo Nome está vázio');
        setError(true);
        return setOpen(true);
      }
      if (data.lastName.length === 0) {
        setMessage('Campo Sobrenome está vázio!');
        setError(true);
        return setOpen(true);
      }
      if (data.document.length <= 8 || data.document.length === 0) {
        setMessage('Campo CPF/RG está vázio ou é inválido!');
        setError(true);
        return setOpen(true);
      }
      if (data.birth.length <= 9) {
        setMessage(
          'Campo Data de Nascimento está vázio ou é inválido! ex: DD/MM/AAAA'
        );
        setError(true);
        return setOpen(true);
      }
      if (data.email.length === 0) {
        setMessage('Campo E-mail está vázio ou é inválido!');
        setError(true);
        return setOpen(true);
      }
      if (data.phoneOne.length <= 10 || data.phoneOne.length === 0) {
        setMessage('Campo Celular está vázio ou é inválido!');
        setError(true);
        return setOpen(true);
      }
      if (data.phoneTwo.length <= 10 && data.phoneTwo.length > 0) {
        setMessage('Campo Telefone Fixo é inválido!');
        setError(true);
        return setOpen(true);
      }
      if (data.father.length === 0) {
        setMessage('Campo Nome do Pai está vázio!');
        setError(true);
        return setOpen(true);
      }
      if (data.mother.length === 0) {
        setMessage('Campo Nome da mãe está vázio!');
        setError(true);
        return setOpen(true);
      }
      if (data.bondsman.name.length === 0) {
        setMessage('Precisa escolher O responsável pagante');
        setError(true);
        return setOpen(true);
      }
      if (data.bondsman.document.length <= 10) {
        setMessage(
          'Campo CPF do Responsável Pagante  está vázio ou é inválido!'
        );
        setError(true);
        return setOpen(true);
      }
      if (data.state.length === 0) {
        setMessage('Campo Estado  está vázio!');
        setError(true);
        return setOpen(true);
      }
      if (data.city.length === 0) {
        setMessage('Campo Cidade está vázio!');
        setError(true);
        return setOpen(true);
      }
      if (data.neighborhood.length === 0) {
        setMessage('Campo Bairro/Distrito está vázio!');
        setError(true);
        return setOpen(true);
      }
      // if (data.zip.length !== 8) {
      //   setMessage('Campo CEP está está vázio ou está inválido! Ex: 25444000');
      //   setError(true);
      //   return setOpen(true);
      // }
      if (data.street.length === 0) {
        setMessage('Campo logradouro está está vázio!');
        setError(true);
        return setOpen(true);
      }
      if (data.number.length === 0) {
        setMessage(
          'Campo Número está vázio! se não tiver numero coloque o valor 0 !'
        );
        setError(true);
        return setOpen(true);
      }
      const res = await serviceClient.create(data);
      console.log(res);
      if (res === 'Email already exists!') {
        setMessage('Este Email já está sendo usado!!');
        setError(true);
        setOpen(true);
        return;
      }
      if (res === 'Client already exists!') {
        setMessage('Documento do Cliente já está cadastrado!!');
        setError(true);
        setOpen(true);
        return;
      }
      setMessage('Cliente cadastrado com sucesso!!!');
      setError(false);
      setOpen(true);
      return setTimeout(() => {
        window.location.href = 'app/dashboard';
      }, 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <form
      autoComplete="off"
      noValidate
      className={clsx(classes.root, className)}
      {...rest}
      onSubmit={handleChange}
    >
      <Card>
        <CardHeader
          subheader="As informações podem ser editadas."
          title="Cadastrar Novos Pacientes"
        />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              Informações do Paciente
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Nome"
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
                label="Sobrenome"
                name="lastName"
                onChange={(e) => setLastName(e.target.value)}
                required
                value={lastName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Sexo</FormLabel>
                <FormGroup aria-label="position" row>
                  <FormControlLabel
                    value="Masculino"
                    control={
                      <Checkbox
                        color="primary"
                        checked={genre === 'Masculino'}
                      />
                    }
                    label="Masculino"
                    labelPlacement="end"
                    onChange={(e) => setGenre(e.target.value)}
                  />
                  <FormControlLabel
                    value="Feminino"
                    control={
                      <Checkbox
                        color="primary"
                        checked={genre === 'Feminino'}
                      />
                    }
                    label="Feminino"
                    labelPlacement="end"
                    onChange={(e) => setGenre(e.target.value)}
                  />
                </FormGroup>
              </FormControl>
            </Grid>
            <Grid item md={4} xs={12}>
              <TextField
                fullWidth
                label="CPF/RG (Apenas os números)"
                name="text"
                onChange={(e) => setDocument(e.target.value)}
                required
                value={document}
                variant="outlined"
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <TextField
                type="date"
                defaultValue="2017-05-24"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true
                }}
                fullWidth
                label="Data de nascimento"
                name="dateOfBirth"
                onChange={(e) => setBirth(e.target.value)}
                required
                value={birth}
                variant="outlined"
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <TextField
                fullWidth
                label="Email"
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                value={email}
                variant="outlined"
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <TextField
                fullWidth
                label="WhatsApp com o DDD"
                onChange={(e) => setPhoneOne(e.target.value)}
                type="text"
                value={phoneOne}
                variant="outlined"
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <TextField
                fullWidth
                label="Telefone Fixo"
                onChange={(e) => setPhoneTwo(e.target.value)}
                type="text"
                value={phoneTwo}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              Informações dos Responsáveis
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Nome do Pai"
                onChange={(e) => setFather(e.target.value)}
                type="text"
                value={father}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Nome da mãe"
                onChange={(e) => setMother(e.target.value)}
                type="text"
                value={mother}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Responsável Financeiro</FormLabel>
                <FormGroup aria-label="position" row>
                  <FormControlLabel
                    value="pai"
                    control={
                      <Checkbox
                        color="primary"
                        checked={payingResp === 'pai'}
                      />
                    }
                    label="Pai"
                    labelPlacement="end"
                    onChange={(e) => setPayingResp(e.target.value)}
                  />
                  <FormControlLabel
                    value="mãe"
                    control={
                      <Checkbox
                        color="primary"
                        checked={payingResp === 'mãe'}
                      />
                    }
                    label="Mãe"
                    labelPlacement="end"
                    onChange={(e) => setPayingResp(e.target.value)}
                  />
                </FormGroup>
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              {payingResp && payingResp.length > 0 ? (
                <TextField
                  fullWidth
                  label={
                    payingResp === 'mãe'
                      ? 'CPF da Mãe (apenas os números)'
                      : 'CPF do Pai (apenas os números)'
                  }
                  onChange={(e) => setDocPayingResp(e.target.value)}
                  type="text"
                  value={docPayingResp}
                  variant="outlined"
                />
              ) : (
                <></>
              )}
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              Informações de Endereço
            </Grid>
            <Grid item md={4} xs={12}>
              <TextField
                fullWidth
                label="CEP (apenas números)"
                name="zip"
                onChange={(e) => setZip(e.target.value)}
                required
                type="text"
                value={zip}
                variant="outlined"
              />
            </Grid>

            <Grid item md={4} xs={12}>
              <TextField
                fullWidth
                label="Estado"
                name="estado"
                onChange={(e) => setState(e.target.value)}
                required
                value={state}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Selecione a cidade"
                name="cidade"
                onChange={(e) => setCity(e.target.value)}
                required
                value={city}
                variant="outlined"
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <TextField
                fullWidth
                label="Distrito ou  Bairro"
                name="district"
                onChange={(e) => setNeighborhood(e.target.value)}
                required
                value={neighborhood}
                variant="outlined"
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Logradouro"
                name="adress"
                onChange={(e) => setStreet(e.target.value)}
                required
                value={street}
                variant="outlined"
              />
            </Grid>
            <Grid item md={3} xs={12}>
              <TextField
                fullWidth
                label="Número"
                name="Number"
                onChange={(e) => setNumber(e.target.value)}
                required
                value={number}
                variant="outlined"
                helperText="Se não tiver número, coloque o valor zero. EX: 0"
              />
            </Grid>
            <Grid item md={3} xs={12}>
              <TextField
                fullWidth
                label="Complemento"
                name="estado"
                onChange={(e) => setComplement(e.target.value)}
                value={complement}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box display="flex" justifyContent="flex-end" p={2}>
          <Button onClick={handleChange} color="primary" variant="contained">
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
