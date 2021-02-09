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
import EditIcon from '@material-ui/icons/Edit';
import serviceReply from 'src/services/serviceReply';
import { useParams } from 'react-router-dom';
import { Alert, AlertTitle } from '@material-ui/lab';
import serviceClients from 'src/services/serviceClients';
import { useAuth } from 'src/context/AuthContext';

const useStyles = makeStyles(() => ({
  root: {}
}));

const ProfileDetails = ({ className, ...rest }) => {
  const classes = useStyles();
  const [answers, setAnswers] = useState([]);
  const FORM_ID = process.env.REACT_APP_FORM_ID;

  const [currentClient, setCurrentClient] = useState({});
  const { currentUserEmail, currentUserRole } = useAuth();

  const getClients = async () => {
    const { clients } = await serviceClients.find();
    return clients;
  };

  const filterCurrentClient = async () => {
    console.log('email logado', currentUserEmail);
    const data = await getClients();
    const client = data.filter((e) => e.email === currentUserEmail);
    console.log(client);
    if (client) {
      const clientId = client.map((e) => e._id);
      return setCurrentClient(clientId);
    }
  };

  const getAnswers = async () => {
    if (!currentClient) {
    } else {
      const answer = await serviceReply.search(FORM_ID, currentClient);
      setAnswers(answer);
    }
  };

  const handleAnswers = () => {
    if (answers && answers.length > 0) {
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
            Nenhum formulário respondido.
          </Alert>
        </Grid>
      </>
    );
  };

  useEffect(() => {
    getAnswers();
  }, [currentClient]);

  useEffect(() => {
    filterCurrentClient();
  }, []);

  return (
    <Card>
      <CardHeader
        title="Respostas do Formulário"
        action={
          currentUserRole !== 'client' ? (
            <IconButton href="">
              <EditIcon />
            </IconButton>
          ) : (
            <></>
          )
        }
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
