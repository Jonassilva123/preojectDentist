import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import moment from 'moment';
import { v4 as uuid } from 'uuid';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import {
  Box,
  Chip,
  Card,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
  makeStyles,
  Grid
} from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { useDashboard } from './dashboardContext';

const useStyles = makeStyles(() => ({
  root: {},
  actions: {
    justifyContent: 'flex-end'
  }
}));

const LatestOrders = ({ className, ...rest }) => {
  const classes = useStyles();
  const [clientIdAnswer, setClientIdAnswer] = useState('');

  const {
    customers,
    page,
    setPage,
    limit,
    count,
    currentPage,
    setCurrentPage,
    answers
  } = useDashboard();

  const totalPages = Math.ceil(count / limit);

  function getClientIdAnswer() {
    if (answers.length > 0) {
      const res = answers.map((e) => e.client._id);

      return setClientIdAnswer(res);
    }
  }
  function renderChip(customerId) {
    if (answers.message === 'No answer!') {
      return <Chip size="small" label="Não Respondido" color="secondary" />;
    }
    if (clientIdAnswer !== '') {
      const filterClientId = clientIdAnswer.filter((answerClientId) => {
        return answerClientId === customerId;
      });
      return filterClientId.length <= 0 ? (
        <Chip size="small" label="Não Respondido" color="secondary" />
      ) : (
        <Chip size="small" label="Respondido" color="primary" />
      );
    }
  }

  useEffect(() => {
    getClientIdAnswer();
  }, [answers]);

  function dataAnswerForClient(id) {
    if (answers.length > 0) {
      return answers.filter((item) => item.client._id === id);
    }
  }

  function handleDateAnswerForClient(id) {
    const data = dataAnswerForClient(id);
    if (data !== undefined) {
      const dataForm = data.map((e) => e.createdAt);
      return moment(dataForm.pop()).format('DD/MM/YYYY');
    }
  }

  function tableStatusAnswerClient() {
    return customers.map((customer) => (
      <>
        <TableRow hover key={customer._id}>
          <TableCell>{`${customer.firstName} ${customer.lastName}`}</TableCell>
          <TableCell>{customer.email}</TableCell>
          <TableCell>{handleDateAnswerForClient(customer._id)}</TableCell>
          <TableCell>{renderChip(customer._id)}</TableCell>
        </TableRow>
      </>
    ));
  }

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader title="Relatório" />
      <Divider />
      <PerfectScrollbar>
        <Box minWidth={800}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell>Email</TableCell>
                <TableCell sortDirection="desc">
                  <Tooltip enterDelay={300} title="Sort">
                    <TableSortLabel active direction="desc">
                      Data
                    </TableSortLabel>
                  </Tooltip>
                </TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{tableStatusAnswerClient()}</TableBody>
          </Table>
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

LatestOrders.propTypes = {
  className: PropTypes.string
};

export default LatestOrders;
