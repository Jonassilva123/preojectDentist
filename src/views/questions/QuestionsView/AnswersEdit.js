import React, { useState, useEffect } from 'react';
import serviceReply from 'src/services/serviceReply';
import { useParams } from 'react-router-dom';
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
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
  CardActions
} from '@material-ui/core/';
import clsx from 'clsx';
import PropTypes from 'prop-types';

const useStyles = makeStyles(() => ({
  root: {}
}));

const AnswersEdit = ({ className, ...rest }) => {
  const classes = useStyles();
  const { clientId, formId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [values, setValues] = useState([]);

  const getQuestions = async () => {
    const data = await serviceReply.search(formId, clientId);
    setQuestions(data);
  };

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

  console.log('state>>', values);
  // console.log('api>>', questions);
  useEffect(() => {
    getQuestions();
  }, []);

  return (
    <form
      autoComplete="off"
      noValidate
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card className={classes.root}>
        <CardHeader
          subheader="Este questionário deve ser respondido pelo responsável do (a) paciente, e tem por finalidade informar dados que possam influir no tratamento. Os dados enviados são CONFIDENCIAIS e de uso exclusivo desta profissional, sendo armazenados com total segurança em um banco de dados."
          title="Questinário de Saúde"
        />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            {questions.map((mount) => {
              return (
                <Grid key={mount._id} item md={12} xs={12}>
                  <p>
                    {mount.answer.subAnswer === false
                      ? mount.question.question.ask
                      : ''}
                  </p>
                  {mount.question.question.input.map((inputMount) => {
                    return inputMount.type === 'c' &&
                      mount.answer.subAnswer !== true ? (
                      <>
                        <FormControl component="fieldset">
                          <RadioGroup
                            aria-label={inputMount.value}
                            name={mount._id}
                            id={mount._id}
                            value={
                              values[mount._id] &&
                              values[mount._id].answer.value
                                ? values[mount._id].answer.value
                                : mount.answer.value
                            }
                            onChange={(e) => handleOnChange(e)}
                          >
                            <FormControlLabel
                              value={inputMount.value}
                              control={<Radio color="primary" id={mount._id} />}
                              label={inputMount.value}
                            />
                          </RadioGroup>
                        </FormControl>
                      </>
                    ) : inputMount.type === 't' &&
                      mount.answer.subAnswer !== true ? (
                      <TextField
                        fullWidth
                        label={inputMount.value}
                        onChange={(e) => handleOnChange(e)}
                        name={mount._id}
                        id={mount._id}
                        required
                        variant="outlined"
                      />
                    ) : (
                      ''
                    );
                  })}

                  <>
                    {mount.question.subQuestion.input.length > 0 ? (
                      <>
                        {values[mount._id] &&
                        values[mount._id].answer.value &&
                        values[mount._id].answer.value ===
                          mount.question.subQuestion.valueKey ? (
                          <>
                            {mount.question.subQuestion.input.map((sub) =>
                              sub.type === 'c' ? (
                                <>
                                  <FormControl component="fieldset">
                                    <RadioGroup
                                      aria-label={sub.value}
                                      name={`sub${sub.type}`}
                                      id={mount._id}
                                      value={
                                        values[`sub${sub.type}`] &&
                                        values[`sub${sub.type}`].answer.value
                                          ? values[`sub${sub.type}`].answer
                                              .value
                                          : mount.answer.value
                                      }
                                      onChange={(e) => handleOnChange(e)}
                                    >
                                      <FormControlLabel
                                        value={sub.value}
                                        control={
                                          <Radio
                                            color="primary"
                                            id={mount._id}
                                          />
                                        }
                                        label={sub.value}
                                      />
                                    </RadioGroup>
                                  </FormControl>
                                </>
                              ) : (
                                <>
                                  {mount.answer.subAnswer === true ? (
                                    <p>
                                      Resposta Atual:
                                      {mount.answer.value}
                                    </p>
                                  ) : (
                                    ''
                                  )}
                                  <TextField
                                    fullWidth
                                    label={mount.question.subQuestion.ask}
                                    onChange={(e) => handleOnChange(e)}
                                    required
                                    variant="outlined"
                                    name={`sub${sub._id}`}
                                    id={mount._id}
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
        <CardActions>
          <Button size="small">Salvar</Button>
        </CardActions>
      </Card>
    </form>
  );
};

AnswersEdit.propTypes = {
  className: PropTypes.string
};

export default AnswersEdit;
