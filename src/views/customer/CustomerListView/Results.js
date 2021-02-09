import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Grid,
  ButtonGroup,
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  makeStyles,
  Button
} from '@material-ui/core';

import data from './data';

import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/core/styles';

import { Pagination, Alert } from '@material-ui/lab';
import { useAuth } from 'src/context/AuthContext';
import DialogMessageConfirm from 'src/components/DialogMessageConfirm';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import CameraAltIcon from '@material-ui/icons/CameraAlt';

import { useClient } from './clientContext';
import serviceImages from 'src/services/serviceImages';

const FORM_ID = process.env.REACT_APP_FORM_ID;

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  inputUpload: {
    '& > *': {
      margin: theme.spacing(1)
    }
  },
  input: {
    display: 'none'
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1)
  }
}))(MuiDialogActions);

const Results = ({ className, ...rest }) => {
  const {
    customers,
    setPage,
    limit,
    removeClients,
    count,
    currentPage,
    setCurrentPage,
    selectedCustomerIds
  } = useClient();

  const [images, setImages] = useState([]);

  console.log(images);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [currentClientId, setCurrentClientId] = useState('');
  const { currentUserRole } = useAuth();

  const classes = useStyles();

  const totalPages = Math.ceil(count / limit);

  /** const handleSelectAll = (event) => {
    let newSelectedCustomerIds;
    if (event.target.checked) {
      newSelectedCustomerIds = customers.map((customer) => customer._id);
    } else {
      newSelectedCustomerIds = [];
    }
    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedCustomerIds.indexOf(id);
    let newSelectedCustomerIds = [];
    if (selectedIndex === -1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds,
        id
      );
    } else if (selectedIndex === 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(1)
      );
    } else if (selectedIndex === selectedCustomerIds.length - 1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, selectedIndex),
        selectedCustomerIds.slice(selectedIndex + 1)
      );
    }
    setSelectedCustomerIds(newSelectedCustomerIds);
  }; */

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <PerfectScrollbar>
        <Box minWidth={1050}>
          {customers.length > 0 ? (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nome</TableCell>
                  <TableCell>E-mail</TableCell>
                  <TableCell>Localização</TableCell>
                  <TableCell>Telefone</TableCell>
                  <TableCell>Data de Registro</TableCell>
                  <TableCell>
                    {/** <Checkbox
                      checked={selectedCustomerIds.length === customers.length}
                      color="primary"
                      indeterminate={
                        selectedCustomerIds.length > 0 &&
                        selectedCustomerIds.length < customers.length
                      }
                      onChange={handleSelectAll}
                    /> */}
                    Prontuário
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {customers.map((customer) => (
                  <>
                    <TableRow
                      hover
                      key={customer._id}
                      selected={
                        selectedCustomerIds.indexOf(customer._id) !== -1
                      }
                    >
                      <TableCell>
                        <Box alignItems="center" display="flex">
                          <Typography color="textPrimary" variant="body1">
                            {`${customer.firstName} ${customer.lastName}`}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{customer.email}</TableCell>
                      <TableCell>
                        {`${customer.place.map(
                          (e) => e.city
                        )}, ${customer.place.map((e) => e.state)}`}
                      </TableCell>
                      <TableCell>{customer.phones.map((e) => e.one)}</TableCell>
                      <TableCell>
                        {moment(customer.createdAt).format('DD/MM/YYYY')}
                      </TableCell>
                      <TableCell padding="checkbox">
                        <Button
                          href={`/questions/${FORM_ID}/${customer._id}`}
                          color="primary"
                        >
                          Responder
                        </Button>
                      </TableCell>
                      <TableCell>
                        <ButtonGroup
                          color="primary"
                          aria-label="outlined primary button group"
                        >
                          {currentUserRole === 'admin' ? (
                            <Button
                              onClick={() => {
                                setCurrentClientId(customer._id);
                                setConfirmOpen(true);
                              }}
                            >
                              <DeleteIcon />
                            </Button>
                          ) : (
                            <></>
                          )}

                          <Button
                            target="_blank"
                            href={`https://api.whatsapp.com/send?phone=55${customer.phones.map(
                              (phone) => phone.one
                            )}&text=Oi responsável do(a) ${
                              customer.firstName
                            } precisamos que responda algumas perguntas antes do atendimento. *Clique neste link:* ${'http://dentistclyviafront-com.umbler.net/login'} e adicione o email: ${
                              customer.email
                            } e senha padrão que é o CPF do responsável.`}
                          >
                            <WhatsAppIcon />
                          </Button>
                          <Button onClick={handleClickOpen}>
                            <CameraAltIcon />
                          </Button>

                          <Button
                            href={`/app/customers/profile/${customer._id}`}
                          >
                            <MoreVertIcon />
                          </Button>

                          <DialogMessageConfirm
                            title="Você tem certeza que deseja remover o Cliente?"
                            description="Após a remoção o cliente não poderá acesso as informações do mesmo."
                            open={confirmOpen}
                            setOpen={setConfirmOpen}
                            onConfirm={() => {
                              removeClients(currentClientId);
                            }}
                          />
                        </ButtonGroup>
                      </TableCell>
                    </TableRow>
                  </>
                ))}
              </TableBody>
            </Table>
          ) : (
            <Alert severity="warning">Nenhum resultado encontrado!</Alert>
          )}
        </Box>
      </PerfectScrollbar>
      <Grid container justify="center" alignItems="center">
        <Grid item style={{ padding: 20 }}>
          <Box minWidth="sm">
            <Pagination
              variant="outlined"
              showFirstButton
              showLastButton
              count={totalPages}
              color="primary"
              page={currentPage}
              onChange={(e, v) => {
                setCurrentPage(v);
                setPage(v - 1);
              }}
            />
          </Box>
        </Grid>
      </Grid>
      <Grid item xs={10}>
        <Dialog
          onClose={handleClose}
          fullWidth
          maxWidth={'lg'}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            Fotos de Procedimentos em Pacientes.
          </DialogTitle>
          <DialogContent dividers>
            {data.map((d) => (
              <Grid
                container
                spacing={3}
                justify="center"
                alignItems="center"
                textAlign="center"
              >
                <Grid item xs={10} key={d.id}>
                  <img
                    style={{ width: '100%' }}
                    alt={d.name}
                    src={d.avatarUrl}
                  />
                </Grid>
              </Grid>
            ))}
          </DialogContent>
          <DialogActions>
            <Grid
              container
              spacing={3}
              justify="center"
              alignItems="center"
              textAlign="center"
              className={classes.inputUpload}
            >
              <Grid item xs={12} md={6} lg={6}>
                <input
                  accept="image/*"
                  className={classes.input}
                  id="contained-button-file"
                  multiple
                  type="file"
                  onChange={(e) => setImages(e.target.value)}
                  value={images}
                />
              </Grid>
              <Grid
                item
                container
                justify="center"
                alignItems="center"
                textAlign="center"
                xs={12}
                md={6}
                lg={6}
              >
                <Button
                  onClick={() => alert('ok')}
                  variant="contained"
                  color="primary"
                  component="span"
                >
                  Enviar
                </Button>
              </Grid>
            </Grid>
          </DialogActions>
        </Dialog>
      </Grid>
    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  customers: PropTypes.array.isRequired
};

export default Results;
