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
  makeStyles,
  Typography,
  IconButton
} from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import serviceReply from 'src/services/serviceReply';
import serviceTerm from 'src/services/serviceTerm';
import { useParams } from 'react-router-dom';
import { Alert, AlertTitle } from '@material-ui/lab';
import DialogMessageConfirm from 'src/components/DialogMessageConfirm';

const useStyles = makeStyles(() => ({
  root: {}
}));

const ProfileDetails = ({ className, ...rest }) => {
  const classes = useStyles();
  const [answers, setAnswers] = useState([]);
  const { clientId } = useParams();
  const FORM_ID = process.env.REACT_APP_FORM_ID;
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [terms, setTerms] = useState([]);

  const getAnswers = async () => {
    const answer = await serviceReply.search(FORM_ID, clientId);
    setAnswers(answer);
  };

  const getTerms = async () => {
    const term = await serviceTerm.find(clientId);
    setTerms(term);
  };

  const handleRemoveTerms = () => {
    if (terms.length > 0) {
      terms.map((term) => serviceTerm.remove(term._id));
    }
  };

  const handleRemoveReplys = () => {
    if (answers.length > 0) {
      answers.map((anwser) => {
        serviceReply.remove(anwser._id);
        getAnswers();
        handleRemoveTerms();
      });
    }
  };

  const handleAnswers = () => {
    if (answers.length > 0) {
      return answers.map((answer) => {
        return (
          <>
            <Grid item md={12} xs={12} key={answer._id}>
              <Typography variant="h5" component="h5">
                {answer.answer.subAnswer === true
                  ? answer.question.subQuestion.ask
                  : answer.question.question.ask}{' '}
                {answer.answer.value}
              </Typography>
            </Grid>
          </>
        );
      });
    }
    return (
      <>
        <Grid item>
          <Alert severity="warning">
            <AlertTitle>Ops!!!</AlertTitle>
            Nenhum prontuário respondido.
          </Alert>
        </Grid>
      </>
    );
  };

  useEffect(() => {
    getAnswers();
    getTerms();
  }, []);

  return (
    <Card>
      <CardHeader
        subheader={
          answers.length > 0
            ? 'Todos os termos foram aceitos pelo responsável.'
            : ''
        }
        title="Respostas do Prontuário"
        action={
          answers.length > 0 ? (
            <IconButton onClick={() => setConfirmOpen(true)}>
              <DeleteForeverIcon />
            </IconButton>
          ) : (
            ''
          )
        }
      />
      <DialogMessageConfirm
        title="Você tem certeza que deseja remover o prontuário deste paciênte?"
        description="Após a remoção nunca mais será possível recuperar os dados."
        open={confirmOpen}
        setOpen={setConfirmOpen}
        onConfirm={() => {
          handleRemoveReplys();
        }}
      />
      <Divider />
      <CardContent>
        <Grid container align="center" spacing={3}>
          {handleAnswers()}
        </Grid>
      </CardContent>
    </Card>
  );
};

ProfileDetails.propTypes = {
  className: PropTypes.string
};

export default ProfileDetails;
