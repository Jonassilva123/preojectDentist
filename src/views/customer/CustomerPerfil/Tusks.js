import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  List,
  ListItem,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  Typography,
  makeStyles,
  Snackbar,
  IconButton,
  TextareaAutosize
} from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import { useProfile } from './contextProfile';
import ClearIcon from '@material-ui/icons/Clear';
import { useParams } from 'react-router-dom';
import { useAuth } from 'src/context/AuthContext';
import DialogMessageConfirm from 'src/components/DialogMessageConfirm';

const useStyles = makeStyles((theme) => ({
  itemDescription: {
    minWidth: 275
  },
  textArea: {
    width: '100%',
    padding: theme.spacing(2),
    borderRadius: 5,
    borderColor: '#ccc'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  list: {
    width: '100%',

    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: 300
  },
  listSection: {
    backgroundColor: 'inherit'
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0,
    listStyle: 'none'
  }
}));

const Tusks = ({ className, customer, ...rest }) => {
  const classes = useStyles();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { createTusks, tusks, handleTusks, removeTusks } = useProfile();
  const { clientId } = useParams();
  const { userId } = useAuth();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [currentTuskId, setCurrentTuskId] = useState();

  const handleClose = () => {
    setOpen(false);
  };

  const listTusk = () => {
    const data = tusks;
    if (!data) {
      return;
    }
    if (data.length === 0) {
      return (
        <>
          <Grid item>
            <Alert severity="warning">
              <AlertTitle>Ops!!!</AlertTitle>
              Nenhum Anotação.
            </Alert>
          </Grid>
        </>
      );
    } else {
      const items = data.map((item) => (
        <ListItem key={item._id} className={classes.listSection}>
          <Card className={classes.itemDescription} variant="outlined">
            <CardHeader
              action={
                <IconButton
                  onClick={() => {
                    setCurrentTuskId(item._id);
                    setConfirmOpen(true);
                  }}
                  aria-label="settings"
                >
                  <ClearIcon />
                </IconButton>
              }
              title={item.title}
            />
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                {item.description}
              </Typography>
            </CardContent>
          </Card>
        </ListItem>
      ));

      return items;
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    listTusk();
  }, [tusks]);

  const handleChange = async (event) => {
    try {
      const data = {
        title,
        description,
        user: userId,
        client: clientId
      };

      if (data.title.length <= 0) {
        setMessage('Campo Titulo está vázio');
        setError(true);
        return setOpen(true);
      }
      if (data.description.length <= 0) {
        setMessage('Campo Descrição está vázio');
        setError(true);
        return setOpen(true);
      } else {
        const res = await createTusks(data);
        console.log(res);
        if (res === 'Tusk already exists!') {
          setMessage('Já existe anotações com esta título.');
          setError(true);
          setOpen(true);
        } else {
          setMessage('Anotação Salva com sucesso');
          setError(false);
          setOpen(true);
          setTitle('');
          setDescription('');
          handleTusks();
          document.getElementById('description').value = '';
        }
      }
    } catch (error) {
      console.error(error);
    }
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
          subheader="As informações podem ser editadas."
          title="Anotações"
        />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item container spacing={3} xs={12} md={6}>
              <Grid item md={12} xs={12}>
                <List className={classes.list}>{listTusk()}</List>
              </Grid>
            </Grid>

            <Grid
              item
              container
              justify="center"
              alignItems="center"
              textAlign="flex-start"
              spacing={2}
              xs={12}
              md={6}
            >
              <Grid item md={12} xs={12}>
                <TextField
                  fullWidth
                  label="Titulo"
                  name="title"
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  value={title}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={12} xs={12}>
                <TextareaAutosize
                  fullWidth
                  className={classes.textArea}
                  id="descrition"
                  rowsMin={8}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Descrição"
                  value={description}
                  variant="outlined"
                />
              </Grid>
              <Divider />
              <Box display="flex" justifyContent="flex-end" p={2}>
                <Button
                  color="primary"
                  onClick={() => {
                    handleChange();
                  }}
                  variant="contained"
                >
                  Salvar Informações
                </Button>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
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
      <DialogMessageConfirm
        title="Você tem certeza que deseja remover o Cliente?"
        description="Após a remoção o cliente não poderá acesso as informações do mesmo."
        open={confirmOpen}
        setOpen={setConfirmOpen}
        onConfirm={() => {
          removeTusks(currentTuskId);
        }}
      />
    </form>
  );
};

Tusks.propTypes = {
  className: PropTypes.string
};

export default Tusks;
