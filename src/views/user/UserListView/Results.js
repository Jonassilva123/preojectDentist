import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Grid,
  Box,
  Card,
  ButtonGroup,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  makeStyles,
  Button
} from '@material-ui/core';
import { Pagination, Alert } from '@material-ui/lab';
import DialogMessageConfirm from 'src/components/DialogMessageConfirm';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { useUser } from './userContext';
import { useAuth } from 'src/context/AuthContext';

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Results = ({ className, ...rest }) => {
  const {
    users,
    setPage,
    limit,
    count,
    currentPage,
    setCurrentPage,
    removerUser
  } = useUser();

  const classes = useStyles();

  const totalPages = Math.ceil(count / limit);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [currentUserId, setCurrentUserId] = useState('');
  const { currentUserRole } = useAuth();

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <PerfectScrollbar>
        <Box minWidth={1050}>
          {users && users.length > 0 ? (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nome</TableCell>
                  <TableCell>E-mail</TableCell>
                  <TableCell>Permissão</TableCell>
                  <TableCell>Data de Registro</TableCell>
                  {currentUserRole === 'admin' ? (
                    <TableCell>Ação</TableCell>
                  ) : (
                    <></>
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow>
                    <TableCell>
                      <Box alignItems="center" display="flex">
                        <Typography color="textPrimary" variant="body1">
                          {`${user.firstName} ${user.lastName}`}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      {user.role === 'client' ? 'paciente' : user.role}
                    </TableCell>

                    <TableCell>
                      {moment(user.createdAt).format('DD/MM/YYYY')}
                    </TableCell>
                    {currentUserRole === 'admin' ? (
                      <>
                        <TableCell>
                          <ButtonGroup
                            color="primary"
                            aria-label="outlined primary button group"
                          >
                            <Button
                              onClick={() => {
                                setCurrentUserId(user._id);
                                setConfirmOpen(true);
                              }}
                            >
                              <DeleteIcon />
                            </Button>
                            <Button href={`/app/users/settings/${user._id}`}>
                              <EditIcon />
                            </Button>

                            <DialogMessageConfirm
                              title="Você tem certeza que deseja remover o usuário?"
                              description="Após a remoção o usuário não poderá logar novamente."
                              open={confirmOpen}
                              setOpen={setConfirmOpen}
                              onConfirm={() => removerUser(currentUserId)}
                            />
                          </ButtonGroup>
                        </TableCell>{' '}
                      </>
                    ) : (
                      <></>
                    )}
                  </TableRow>
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
    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  customers: PropTypes.array.isRequired
};

export default Results;
