/**
 *  O objetivo dessa feature é montar uma formulário de acordo aos dados da API,
 *  mas para isso os states são criados e lidos dinamicamente.
 *
 *  Entretanto algumas regras foram criadas para trabalhar com a leitura dos
 *  formulários dinâmicos e com suas respectivas respostas e sub respostas, abaixo
 *  deixei algumas regras determinantes para o entendimento desse arquivo.
 *
 *  # Uma resposta contém apenas um state e nas questões o state e criado usando os
 *  seus repectivos ids de questões.
 *
 *  # As questões multiplá escolha apesar de conter mais de uma opções de resposta
 *  elas são criadas usando o mesmo state que são nomeados com os ids de suas respectivas
 *  questões.
 *
 *  # As sub respostas que são input de textos criam os seus states de acordo aos ids das
 *  respectivas questões.
 *
 *  # As sub respostas que são multiplá escolhas criam state através de seu tipo, pois foi preciso
 *  guarda-las em um mesmo name de state, porque no react não podemos repetir nome de state, por isso
 *  não seguimos o padrão.
 *
 *  # Para criar um state dinâmico usamos onChange que pega o name do input e nomea o state e o value
 *  através do id do input.
 *
 *  # Para ler os states dinamicamente usamos o values[aqui dentro é os ids de questões ou id de input ou tipo do radio]
 */

import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box,
  Link,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles,
  Checkbox,
  FormGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  Typography
} from '@material-ui/core';
import serviceReply from 'src/services/serviceReply';
import serviceTerm from 'src/services/serviceTerm';
import { useParams } from 'react-router-dom';

import DialogMessageConfirm from 'src/components/DialogMessageConfirm';
import { Alert, AlertTitle } from '@material-ui/lab';
import { useForm } from './formContext';

const useStyles = makeStyles(() => ({
  terms: {
    cursor: 'pointer'
  }
}));

const GeneralHealth = ({ className, ...rest }) => {
  const classes = useStyles();

  const { questions, replyed } = useForm();

  const [checkedTerms, setCheckedTerms] = useState('');
  const [termsOpen, setTermsOpen] = useState(false);
  const [values, setValues] = useState([]);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [messageResquest, setMessageResquest] = useState({
    title: '',
    description: ''
  });

  const { formId, clientId } = useParams();

  const handleOnChange = (event) => {
    const stateNameDynamicForSub = event.target.name;
    const keySubAnswers = stateNameDynamicForSub.match(/sub/g);

    setValues({
      ...values,
      [event.target.name]: {
        form: formId,
        client: clientId,
        question: event.target.id,
        answer: {
          subAnswer: !!(keySubAnswers && keySubAnswers[0] === 'sub'),
          value: event.target.value
        }
      }
    });
  };

  function objectForArray(obj) {
    const arr = [];
    for (const key of Object.keys(obj)) {
      arr.push([key, obj[key]]);
    }
    return arr;
  }

  const handleOnSubmit = async (e) => {
    await serviceTerm.create({
      client: clientId,
      form: formId,
      term: checkedTerms
    });

    e.preventDefault();
    const arrayValues = objectForArray(values);
    for (let i = 0; i < arrayValues.length > 0; i++) {
      const request = await serviceReply.create(arrayValues[i][1]);

      if (request.message === 'Reply created!') {
        setConfirmOpen(true);
        setMessageResquest({
          title: 'Parabéns e obrigado pela a sua resposta.',
          description: 'As suas respostas foram enviadas com sucesso! 😎'
        });
        setTimeout(() => {
          window.location.href = './';
        }, 2000);
      }
    }
  };

  if (replyed === false) {
    return (
      <form
        autoComplete="off"
        noValidate
        className={clsx(classes.root, className)}
        {...rest}
      >
        <Card>
          <CardHeader
            subheader="Este questionário deve ser respondido pelo responsável do (a) paciente, e tem por finalidade informar dados que possam influir no tratamento. Os dados enviados são CONFIDENCIAIS e de uso exclusivo desta profissional, sendo armazenados com total segurança em um banco de dados."
            title="Questinário de Saúde"
          />
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              {questions.map((mountQuestion) => {
                return (
                  <Grid key={mountQuestion._id} item md={6} xs={12}>
                    <p>{mountQuestion.question.ask}</p>
                    {mountQuestion.question.input.map((mountInput) =>
                      mountInput.type === 'c' ? (
                        <>
                          <FormControl component="fieldset">
                            <RadioGroup
                              aria-label={mountInput.value}
                              name={mountQuestion._id}
                              id={mountQuestion._id}
                              value={
                                values[mountQuestion._id] &&
                                values[mountQuestion._id].answer.value
                                  ? values[mountQuestion._id].answer.value
                                  : false
                              }
                              onChange={(e) => handleOnChange(e)}
                            >
                              <FormControlLabel
                                value={mountInput.value}
                                control={
                                  <Radio
                                    color="primary"
                                    id={mountQuestion._id}
                                  />
                                }
                                label={mountInput.value}
                              />
                            </RadioGroup>
                          </FormControl>
                        </>
                      ) : (
                        <>
                          <TextField
                            fullWidth
                            label="Qual a sua resposta?"
                            onChange={(e) => handleOnChange(e)}
                            name={mountQuestion._id}
                            id={mountQuestion._id}
                            required
                            variant="outlined"
                          />
                        </>
                      )
                    )}

                    <>
                      {mountQuestion.subQuestion.input.length > 0 ? (
                        <>
                          {values[mountQuestion._id] &&
                          values[mountQuestion._id].answer.value &&
                          values[mountQuestion._id].answer.value ===
                            mountQuestion.subQuestion.valueKey ? (
                            <>
                              {mountQuestion.subQuestion.input.map((sub) =>
                                sub.type === 'c' ? (
                                  <>
                                    <FormControl component="fieldset">
                                      <RadioGroup
                                        aria-label={sub.value}
                                        name={`sub${sub.type}`}
                                        id={mountQuestion._id}
                                        value={
                                          values[`sub${sub.type}`] &&
                                          values[`sub${sub.type}`].answer.value
                                            ? values[`sub${sub.type}`].answer
                                                .value
                                            : false
                                        }
                                        onChange={(e) => handleOnChange(e)}
                                      >
                                        <FormControlLabel
                                          value={sub.value}
                                          control={
                                            <Radio
                                              color="primary"
                                              id={mountQuestion._id}
                                            />
                                          }
                                          label={sub.value}
                                        />
                                      </RadioGroup>
                                    </FormControl>
                                  </>
                                ) : (
                                  <>
                                    <TextField
                                      fullWidth
                                      label={mountQuestion.subQuestion.ask}
                                      onChange={(e) => handleOnChange(e)}
                                      required
                                      variant="outlined"
                                      name={`sub${sub._id}`}
                                      id={mountQuestion._id}
                                    />
                                  </>
                                )
                              )}
                            </>
                          ) : (
                            <></>
                          )}
                        </>
                      ) : (
                        <></>
                      )}
                    </>
                  </Grid>
                );
              })}
            </Grid>
          </CardContent>
          <Divider />

          <Box display="flex" justifyContent="flex-end" p={2}>
            <Grid container justifyContent="center" alignItems="center">
              <Grid item md={3} lg={4} xs={12}>
                <Link
                  className={classes.terms}
                  onClick={() => setTermsOpen(true)}
                  color="primary"
                >
                  Ler termos de concientimento livre e esclarecido
                </Link>
              </Grid>
              <Grid item md={6} xs={12}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">
                    Você precisa aceitar os termos
                  </FormLabel>
                  <FormGroup aria-label="position" row>
                    <FormControlLabel
                      value="Aceito"
                      control={
                        <Checkbox
                          checked={checkedTerms === 'Aceito'}
                          color="primary"
                        />
                      }
                      label="Aceito"
                      labelPlacement="end"
                      onChange={(e) => setCheckedTerms(e.target.value)}
                    />
                    <FormControlLabel
                      value="Não aceito"
                      control={
                        <Checkbox
                          checked={checkedTerms === 'Não aceito'}
                          color="primary"
                        />
                      }
                      label="Não aceito"
                      labelPlacement="end"
                      onChange={(e) => setCheckedTerms(e.target.value)}
                    />
                  </FormGroup>
                </FormControl>

                <DialogMessageConfirm
                  title="Termos"
                  description={
                    <>
                      <Typography variant="h5" component="h2">
                        Termos
                      </Typography>

                      <Typography variant="body2" component="p">
                        Lorem ipsum aliquam curae tempus orci malesuada nisi
                        odio cras aliquam, consectetur dictum suscipit sociosqu
                        ac aenean fermentum diam nunc. arcu ut tellus
                        suspendisse et posuere mauris quis et at malesuada a,
                        nunc feugiat vivamus leo senectus egestas magna tortor
                        malesuada. aliquam condimentum lorem cras phasellus ac
                        platea vitae ad bibendum lobortis quam diam, ullamcorper
                        augue neque etiam pharetra nec tempus potenti vitae enim
                        pellentesque justo odio, bibendum phasellus varius enim
                        facilisis fringilla imperdiet augue massa ut etiam.
                        tortor posuere blandit sit vitae ligula fames neque,
                        volutpat ultrices bibendum in molestie vel vehicula
                        sodales, netus ad commodo augue class interdum.
                      </Typography>
                      <Typography variant="body2" component="p">
                        Lorem ipsum aliquam curae tempus orci malesuada nisi
                        odio cras aliquam, consectetur dictum suscipit sociosqu
                        ac aenean fermentum diam nunc. arcu ut tellus
                        suspendisse et posuere mauris quis et at malesuada a,
                        nunc feugiat vivamus leo senectus egestas magna tortor
                        malesuada. aliquam condimentum lorem cras phasellus ac
                        platea vitae ad bibendum lobortis quam diam, ullamcorper
                        augue neque etiam pharetra nec tempus potenti vitae enim
                        pellentesque justo odio, bibendum phasellus varius enim
                        facilisis fringilla imperdiet augue massa ut etiam.
                        tortor posuere blandit sit vitae ligula fames neque,
                        volutpat ultrices bibendum in molestie vel vehicula
                        sodales, netus ad commodo augue class interdum.
                      </Typography>
                      <Typography variant="body2" component="p">
                        Hac platea placerat massa amet inceptos urna curabitur
                        cubilia et, primis taciti massa per sollicitudin
                        bibendum tellus pretium placerat, erat placerat aptent
                        fames praesent pulvinar quisque fermentum. nec feugiat
                        sed etiam mauris viverra vulputate aliquam leo,
                        tristique mattis quisque purus nisl condimentum sem ad,
                        nostra dictumst tincidunt curae augue tempus ut.
                        faucibus venenatis lobortis orci nostra laoreet nullam
                        porta, mollis praesent donec litora ullamcorper dui,
                        etiam vel pulvinar nostra nullam id. viverra himenaeos
                        pulvinar sagittis libero a pretium auctor, ac dui mollis
                        aenean imperdiet arcu molestie, velit consequat ipsum
                        hendrerit nisl arcu.
                      </Typography>
                      <Typography variant="body2" component="p">
                        Dictum vehicula platea viverra dictum fringilla vivamus
                        vulputate commodo fames habitant ullamcorper, viverra
                        consectetur quisque ipsum etiam laoreet sed rutrum
                        congue odio ligula, vitae enim imperdiet sagittis nam
                        hendrerit cubilia dictum etiam congue. diam a volutpat
                        fringilla sapien id nibh conubia diam blandit mi
                        dictumst feugiat, elementum a fames consequat varius
                        erat pretium velit pulvinar class felis. nullam lacus
                        conubia est ut aliquam vivamus metus magna posuere
                        phasellus sit, imperdiet etiam lorem urna lobortis eros
                        ornare himenaeos habitasse lacus. ante euismod vehicula
                        malesuada consequat venenatis varius gravida ligula
                        dictumst est, lacus curabitur posuere donec habitasse
                        porttitor massa ipsum litora varius, commodo leo
                        himenaeos aliquam vel felis elementum nam faucibus.{' '}
                      </Typography>
                      <Typography variant="body2" component="p">
                        {' '}
                        Fermentum felis litora sem senectus phasellus aenean per
                        integer interdum, nulla sed proin etiam aenean elit
                        cubilia. elit tortor aenean venenatis curabitur quis
                        ullamcorper turpis vehicula neque, torquent tristique
                        suspendisse aliquet tempus etiam donec leo tempus,
                        taciti fermentum himenaeos venenatis sit fames fringilla
                        rhoncus. nec vulputate amet augue sem ornare id aptent
                        donec, himenaeos habitant laoreet a urna magna pulvinar
                        fringilla commodo, eget dictumst id ac sit curabitur
                        purus. netus porttitor leo hac lectus conubia quis
                        rutrum mauris porttitor, suspendisse ipsum hendrerit
                        vivamus ultricies donec consequat rutrum, turpis aliquet
                        risus eleifend feugiat nisi nisl varius.{' '}
                      </Typography>
                      <Typography variant="body2" component="p">
                        Sagittis lobortis eget velit duis convallis, vel est
                        cras curae, dolor urna diam pellentesque. ornare orci
                        lacus mollis odio ornare in nulla ultrices nec fermentum
                        elementum, volutpat velit nostra sagittis proin quis
                        nisi convallis sed odio. feugiat suspendisse sapien
                        dictum ad orci adipiscing sit est rutrum, elit curae
                        taciti malesuada feugiat nulla lobortis egestas, litora
                        conubia maecenas nunc quis diam luctus risus. integer
                        platea nam congue justo cras conubia cubilia, leo
                        torquent inceptos cursus porta rutrum conubia, etiam
                        ornare nam duis litora donec. viverra fusce imperdiet ut
                        mattis dictumst pellentesque vitae egestas mi, primis
                        iaculis tincidunt non venenatis laoreet senectus cursus
                        hac vel, morbi et nullam a sit donec platea elit.{' '}
                      </Typography>
                    </>
                  }
                  cancel="Fechar"
                  open={termsOpen}
                  setOpen={setTermsOpen}
                />
              </Grid>
            </Grid>
            <Grid item md={3} xs={12}>
              <Button
                color="primary"
                variant="contained"
                onClick={handleOnSubmit}
                disabled={checkedTerms === 'Não aceito' || checkedTerms === ''}
              >
                Enviar as Respostas
              </Button>
            </Grid>
          </Box>
          <DialogMessageConfirm
            open={confirmOpen}
            setOpen={setConfirmOpen}
            title={messageResquest.title}
            description={messageResquest.description}
            cancel="Fechar"
          />
        </Card>
      </form>
    );
  }
  return (
    <Alert severity="error">
      <AlertTitle>Ops!!!</AlertTitle>
      Você não pode responder o mesmo formulário mais de uma vez!
    </Alert>
  );
};

GeneralHealth.propTypes = {
  className: PropTypes.string
};

export default GeneralHealth;
