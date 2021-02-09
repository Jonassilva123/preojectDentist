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
  makeStyles,
  Checkbox,
  FormGroup,
  FormControlLabel,
  FormControl,
  FormLabel
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {}
}));

const OralHealth = ({ className, ...rest }) => {
  const classes = useStyles();
  const [values, setValues] = useState({
    firstName: 'Katarina',
    lastName: 'Smith',
    email: 'demo@devias.io',
    phone: '21 99154-6800',
    state: 'RJ',
    city: 'Rio de Janeiro'
  });
  const [questionOne, setQuestionOne] = useState('');
  const [questionTwo, setQuestionTwo] = useState('');
  const [questionThree, setQuestionThree] = useState('');
  const [questionFour, setQuestionFour] = useState('');
  const [questionFive, setQuestionFive] = useState('');
  const [questionSix, setQuestionSix] = useState('');
  const [questionSeven, setQuestionSeven] = useState('');
  const [questionEight, setQuestionEight] = useState('');
  const [questionNine, setQuestionNine] = useState('');
  const [questionTen, setQuestionTen] = useState('');
  const [questionEleven, setQuestionEleven] = useState('');
  const [questionTwelve, setQuestionTwelve] = useState('');
  const [questionThirteen, setQuestionThirteen] = useState('');
  const [questionFourteen, setQuestionFourteen] = useState('');
  const [questionFifteen, setQuestionFifteen] = useState('');
  const [questionSixteen, setQuestionSixteen] = useState('');
  const [questionSeventeen, setQuestionSeventeen] = useState('');
  const [questionEighteen, setQuestionEighteen] = useState('');
  const [questionNineteen, setQuestionNineteen] = useState('');

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

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
            <Grid item md={6} xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Mama/mamou no peito?</FormLabel>
                <FormGroup aria-label="position" row>
                  <FormControlLabel
                    value={questionOne}
                    control={
                      <Checkbox
                        color="primary"
                        checked={questionOne === 'sim'}
                      />
                    }
                    label="sim"
                    labelPlacement="end"
                    onChange={() => setQuestionOne('sim')}
                  />
                  <FormControlLabel
                    value={questionOne}
                    control={
                      <Checkbox
                        color="primary"
                        checked={questionOne === 'não'}
                      />
                    }
                    label="não"
                    labelPlacement="end"
                    onChange={() => setQuestionOne('não')}
                  />
                </FormGroup>
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Usa/usou mamadeira?</FormLabel>
                <FormGroup aria-label="position" row>
                  <FormControlLabel
                    value="top"
                    control={
                      <Checkbox
                        color="primary"
                        checked={questionTwo === 'sim'}
                      />
                    }
                    label="Sim"
                    labelPlacement="end"
                    onChange={() => setQuestionTwo('sim')}
                  />
                  <FormControlLabel
                    value="start"
                    control={
                      <Checkbox
                        color="primary"
                        checked={questionTwo === 'não'}
                      />
                    }
                    label="Não"
                    labelPlacement="end"
                    onChange={() => setQuestionTwo('não')}
                  />
                  {questionTwo === 'sim' ? (
                    <TextField
                      fullWidth
                      label="Qual o conteúdo?"
                      onChange={handleChange}
                      required
                      variant="outlined"
                    />
                  ) : (
                    <></>
                  )}
                </FormGroup>
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend">
                  Alimenta-se (mamadeira) durante a madrugada?
                </FormLabel>
                <FormGroup aria-label="position" row>
                  <FormControlLabel
                    value="top"
                    control={
                      <Checkbox
                        color="primary"
                        checked={questionThree === 'sim'}
                      />
                    }
                    label="Sim"
                    labelPlacement="end"
                    onChange={() => setQuestionThree('sim')}
                  />
                  <FormControlLabel
                    value="start"
                    control={
                      <Checkbox
                        color="primary"
                        checked={questionThree === 'não'}
                      />
                    }
                    label="Não"
                    labelPlacement="end"
                    onChange={() => setQuestionThree('não')}
                  />
                </FormGroup>
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend">
                  Já foi alguma vez ao dentista?
                </FormLabel>
                <FormGroup aria-label="position" row>
                  <FormControlLabel
                    value={questionFour}
                    control={
                      <Checkbox
                        color="primary"
                        checked={questionFour === 'sim'}
                      />
                    }
                    label="sim"
                    labelPlacement="end"
                    onChange={() => setQuestionFour('sim')}
                  />
                  <FormControlLabel
                    value={questionFour}
                    control={
                      <Checkbox
                        color="primary"
                        checked={questionFour === 'não'}
                      />
                    }
                    label="não"
                    labelPlacement="end"
                    onChange={() => setQuestionFour('não')}
                  />
                </FormGroup>
                {questionFour === 'sim' ? (
                  <TextField
                    fullWidth
                    label="Qual foi a última vez?"
                    onChange={handleChange}
                    required
                    variant="outlined"
                  />
                ) : (
                  <></>
                )}
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend">
                  Escova os dentes ou faz algum tipo de limpeza na boca?
                </FormLabel>
                <FormGroup aria-label="position" row>
                  <FormControlLabel
                    value={questionFive}
                    control={
                      <Checkbox
                        color="primary"
                        checked={questionFive === 'sim'}
                      />
                    }
                    label="sim"
                    labelPlacement="end"
                    onChange={() => setQuestionFive('sim')}
                  />
                  <FormControlLabel
                    value={questionFive}
                    control={
                      <Checkbox
                        color="primary"
                        checked={questionFive === 'não'}
                      />
                    }
                    label="não"
                    labelPlacement="end"
                    onChange={() => setQuestionFive('não')}
                  />
                </FormGroup>
                {questionFive === 'sim' ? (
                  <>
                    <Grid container spacing={3}>
                      <Grid item>
                        <TextField
                          fullWidth
                          label="Com o que?"
                          onChange={handleChange}
                          required
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item>
                        <TextField
                          fullWidth
                          label="Quantas vezes ao dia?"
                          onChange={handleChange}
                          required
                          variant="outlined"
                        />
                      </Grid>
                    </Grid>
                  </>
                ) : (
                  <></>
                )}
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Usa creme dental?</FormLabel>
                <FormGroup aria-label="position" row>
                  <FormControlLabel
                    value="top"
                    control={
                      <Checkbox
                        color="primary"
                        checked={questionSix === 'sim'}
                      />
                    }
                    label="Sim"
                    labelPlacement="end"
                    onChange={() => setQuestionSix('sim')}
                  />
                  <FormControlLabel
                    value="start"
                    control={
                      <Checkbox
                        color="primary"
                        checked={questionSix === 'não'}
                      />
                    }
                    label="Não"
                    labelPlacement="end"
                    onChange={() => setQuestionSix('não')}
                  />
                </FormGroup>
              </FormControl>
              {questionSix === 'sim' ? (
                <>
                  <FormLabel component="legend">COM ou SEM flúor?</FormLabel>
                  <FormGroup aria-label="position" row>
                    <FormControlLabel
                      value="top"
                      control={
                        <Checkbox
                          color="primary"
                          checked={questionSix === 'sim'}
                        />
                      }
                      label="Com"
                      labelPlacement="end"
                      onChange={() => setQuestionSix('sim')}
                    />
                    <FormControlLabel
                      value="start"
                      control={
                        <Checkbox
                          color="primary"
                          checked={questionSix === 'não'}
                        />
                      }
                      label="Sem"
                      labelPlacement="end"
                      onChange={() => setQuestionSix('não')}
                    />
                  </FormGroup>
                </>
              ) : (
                <></>
              )}
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Usa fio dental?</FormLabel>
                <FormGroup aria-label="position" row>
                  <FormControlLabel
                    value="top"
                    control={
                      <Checkbox
                        color="primary"
                        checked={questionSeven === 'sim'}
                      />
                    }
                    label="Sim"
                    labelPlacement="end"
                    onChange={() => setQuestionSeven('sim')}
                  />
                  <FormControlLabel
                    value="start"
                    control={
                      <Checkbox
                        color="primary"
                        checked={questionSeven === 'não'}
                      />
                    }
                    label="Não"
                    labelPlacement="end"
                    onChange={() => setQuestionSeven('não')}
                  />
                  {questionSeven === 'sim' ? (
                    <TextField
                      fullWidth
                      label="Quantas vezes ao dia?"
                      onChange={handleChange}
                      required
                      variant="outlined"
                    />
                  ) : (
                    <></>
                  )}
                </FormGroup>
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend">
                  Apresenta dificuldade na mastigação ou pra engolir os
                  alimentos?{' '}
                </FormLabel>
                <FormGroup aria-label="position" row>
                  <FormControlLabel
                    value="top"
                    control={
                      <Checkbox
                        color="primary"
                        checked={questionEight === 'sim'}
                      />
                    }
                    label="Sim"
                    labelPlacement="end"
                    onChange={() => setQuestionEight('sim')}
                  />
                  <FormControlLabel
                    value="start"
                    control={
                      <Checkbox
                        color="primary"
                        checked={questionEight === 'não'}
                      />
                    }
                    label="Não"
                    labelPlacement="end"
                    onChange={() => setQuestionEight('não')}
                  />
                </FormGroup>
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend">
                  {' '}
                  Tem o hábito de alimentar-se fora do horário das principais
                  refeições (café, almoço, jantar e lanches)?
                </FormLabel>
                <FormGroup aria-label="position" row>
                  <FormControlLabel
                    value="top"
                    control={
                      <Checkbox
                        color="primary"
                        checked={questionNine === 'sim'}
                      />
                    }
                    label="Sim"
                    labelPlacement="end"
                    onChange={() => setQuestionNine('sim')}
                  />
                  <FormControlLabel
                    value="start"
                    control={
                      <Checkbox
                        color="primary"
                        checked={questionNine === 'não'}
                      />
                    }
                    label="Não"
                    labelPlacement="end"
                    onChange={() => setQuestionNine('não')}
                  />
                  {questionNine === 'sim' ? (
                    <TextField
                      fullWidth
                      label="O que costuma comer nos intervalos?"
                      onChange={handleChange}
                      required
                      variant="outlined"
                    />
                  ) : (
                    <></>
                  )}
                </FormGroup>
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend">
                  Come muitos alimentos industrializados e/ou guloseimas?
                </FormLabel>
                <FormGroup aria-label="position" row>
                  <FormControlLabel
                    value="top"
                    control={
                      <Checkbox
                        color="primary"
                        checked={questionTen === 'sim'}
                      />
                    }
                    label="Sim"
                    labelPlacement="end"
                    onChange={() => setQuestionTen('sim')}
                  />
                  <FormControlLabel
                    value="start"
                    control={
                      <Checkbox
                        color="primary"
                        checked={questionTen === 'não'}
                      />
                    }
                    label="Não"
                    labelPlacement="end"
                    onChange={() => setQuestionTen('não')}
                  />
                  {questionTen === 'sim' ? (
                    <TextField
                      fullWidth
                      label="Qual(is)"
                      onChange={handleChange}
                      required
                      variant="outlined"
                    />
                  ) : (
                    <></>
                  )}
                </FormGroup>
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend">
                  Apresenta sangramento gengival durante a escovação?
                </FormLabel>
                <FormGroup aria-label="position" row>
                  <FormControlLabel
                    value="top"
                    control={
                      <Checkbox
                        color="primary"
                        checked={questionEleven === 'sim'}
                      />
                    }
                    label="Sim"
                    labelPlacement="end"
                    onChange={() => setQuestionEleven('sim')}
                  />
                  <FormControlLabel
                    value="start"
                    control={
                      <Checkbox
                        color="primary"
                        checked={questionEleven === 'não'}
                      />
                    }
                    label="Não"
                    labelPlacement="end"
                    onChange={() => setQuestionEleven('não')}
                  />
                </FormGroup>
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend">
                  Usa chupeta ou chupa o dedo?
                </FormLabel>
                <FormGroup aria-label="position" row>
                  <FormControlLabel
                    value="top"
                    control={
                      <Checkbox
                        color="primary"
                        checked={questionTwelve === 'sim'}
                      />
                    }
                    label="Sim"
                    labelPlacement="end"
                    onChange={() => setQuestionTwelve('sim')}
                  />
                  <FormControlLabel
                    value="start"
                    control={
                      <Checkbox
                        color="primary"
                        checked={questionTwelve === 'não'}
                      />
                    }
                    label="Não"
                    labelPlacement="end"
                    onChange={() => setQuestionTwelve('não')}
                  />
                  {questionTwelve === 'sim' ? (
                    <TextField
                      fullWidth
                      label="Qual?"
                      onChange={handleChange}
                      required
                      variant="outlined"
                    />
                  ) : (
                    <></>
                  )}
                </FormGroup>
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend">
                  Respira bem pelo nariz?
                </FormLabel>
                <FormGroup aria-label="position" row>
                  <FormControlLabel
                    value="top"
                    control={
                      <Checkbox
                        color="primary"
                        checked={questionThirteen === 'sim'}
                      />
                    }
                    label="Sim"
                    labelPlacement="end"
                    onChange={() => setQuestionThirteen('sim')}
                  />
                  <FormControlLabel
                    value="start"
                    control={
                      <Checkbox
                        color="primary"
                        checked={questionThirteen === 'não'}
                      />
                    }
                    label="Não"
                    labelPlacement="end"
                    onChange={() => setQuestionThirteen('não')}
                  />
                </FormGroup>
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Ronca?</FormLabel>
                <FormGroup aria-label="position" row>
                  <FormControlLabel
                    value={questionFourteen}
                    control={
                      <Checkbox
                        color="primary"
                        checked={questionFourteen === 'sim'}
                      />
                    }
                    label="sim"
                    labelPlacement="end"
                    onChange={() => setQuestionFourteen('sim')}
                  />
                  <FormControlLabel
                    value={questionFourteen}
                    control={
                      <Checkbox
                        color="primary"
                        checked={questionFourteen === 'não'}
                      />
                    }
                    label="não"
                    labelPlacement="end"
                    onChange={() => setQuestionFourteen('não')}
                  />
                </FormGroup>
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend">
                  Apresenta algum barulho ao abrir a boca?
                </FormLabel>
                <FormGroup aria-label="position" row>
                  <FormControlLabel
                    value={questionFifteen}
                    control={
                      <Checkbox
                        color="primary"
                        checked={questionFifteen === 'sim'}
                      />
                    }
                    label="sim"
                    labelPlacement="end"
                    onChange={() => setQuestionFifteen('sim')}
                  />
                  <FormControlLabel
                    value={questionFifteen}
                    control={
                      <Checkbox
                        color="primary"
                        checked={questionFifteen === 'não'}
                      />
                    }
                    label="não"
                    labelPlacement="end"
                    onChange={() => setQuestionFifteen('não')}
                  />
                </FormGroup>
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Range os dentes?</FormLabel>
                <FormGroup aria-label="position" row>
                  <FormControlLabel
                    value={questionSixteen}
                    control={
                      <Checkbox
                        color="primary"
                        checked={questionSixteen === 'sim'}
                      />
                    }
                    label="sim"
                    labelPlacement="end"
                    onChange={() => setQuestionSixteen('sim')}
                  />
                  <FormControlLabel
                    value={questionSixteen}
                    control={
                      <Checkbox
                        color="primary"
                        checked={questionSixteen === 'não'}
                      />
                    }
                    label="não"
                    labelPlacement="end"
                    onChange={() => setQuestionSixteen('não')}
                  />
                </FormGroup>
              </FormControl>
              {questionSixteen === 'sim' ? (
                <>
                  <FormLabel component="legend">Qual período?</FormLabel>
                  <FormGroup aria-label="position" row>
                    <FormControlLabel
                      value="top"
                      control={
                        <Checkbox
                          color="primary"
                          checked={questionSixteen === 'sim'}
                        />
                      }
                      label="Noite"
                      labelPlacement="end"
                      onChange={() => setQuestionSixteen('sim')}
                    />
                    <FormControlLabel
                      value="start"
                      control={
                        <Checkbox
                          color="primary"
                          checked={questionSixteen === 'não'}
                        />
                      }
                      label="Dia"
                      labelPlacement="end"
                      onChange={() => setQuestionSixteen('não')}
                    />
                  </FormGroup>
                </>
              ) : (
                <></>
              )}
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend">
                  Apresenta o hábito roer unha ou objetos?
                </FormLabel>
                <FormGroup aria-label="position" row>
                  <FormControlLabel
                    value={questionSeventeen}
                    control={
                      <Checkbox
                        color="primary"
                        checked={questionSeventeen === 'sim'}
                      />
                    }
                    label="sim"
                    labelPlacement="end"
                    onChange={() => setQuestionSeventeen('sim')}
                  />
                  <FormControlLabel
                    value={questionSeventeen}
                    control={
                      <Checkbox
                        color="primary"
                        checked={questionSeventeen === 'não'}
                      />
                    }
                    label="não"
                    labelPlacement="end"
                    onChange={() => setQuestionSeventeen('não')}
                  />
                </FormGroup>
                {questionSeventeen === 'sim' ? (
                  <TextField
                    fullWidth
                    label="Quais?"
                    onChange={handleChange}
                    required
                    variant="outlined"
                  />
                ) : (
                  <></>
                )}
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend">
                  Já sofreu algum trauma na boca e/ou dentes?
                </FormLabel>
                <FormGroup aria-label="position" row>
                  <FormControlLabel
                    value={questionEighteen}
                    control={
                      <Checkbox
                        color="primary"
                        checked={questionEighteen === 'sim'}
                      />
                    }
                    label="sim"
                    labelPlacement="end"
                    onChange={() => setQuestionEighteen('sim')}
                  />
                  <FormControlLabel
                    value={questionEighteen}
                    control={
                      <Checkbox
                        color="primary"
                        checked={questionEighteen === 'não'}
                      />
                    }
                    label="não"
                    labelPlacement="end"
                    onChange={() => setQuestionEighteen('não')}
                  />
                </FormGroup>
                {questionEighteen === 'sim' ? (
                  <TextField
                    fullWidth
                    label="Há quanto tempo?"
                    onChange={handleChange}
                    required
                    variant="outlined"
                  />
                ) : (
                  <></>
                )}
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend">
                  Apresenta mobilidade dentária (dente mole)?
                </FormLabel>
                <FormGroup aria-label="position" row>
                  <FormControlLabel
                    value={questionNineteen}
                    control={
                      <Checkbox
                        color="primary"
                        checked={questionNineteen === 'sim'}
                      />
                    }
                    label="sim"
                    labelPlacement="end"
                    onChange={() => setQuestionNineteen('sim')}
                  />
                  <FormControlLabel
                    value={questionNineteen}
                    control={
                      <Checkbox
                        color="primary"
                        checked={questionNineteen === 'não'}
                      />
                    }
                    label="não"
                    labelPlacement="end"
                    onChange={() => setQuestionNineteen('não')}
                  />
                </FormGroup>
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Qual o motivo de procurar o atendimento odontopediátrico?
                    "
                onChange={handleChange}
                required
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Como conheceu o nosso trabalho?"
                onChange={handleChange}
                required
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box display="flex" justifyContent="flex-end" p={2}>
          <Button color="primary" variant="contained">
            Editar Respostas
          </Button>
        </Box>
      </Card>
    </form>
  );
};

OralHealth.propTypes = {
  className: PropTypes.string
};

export default OralHealth;
