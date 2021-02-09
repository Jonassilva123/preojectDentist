import React, { createContext, useContext, useState, useEffect } from 'react';
import serviceAnswer from 'src/services/serviceAnswer';
import serviceDashboard from '../../../services/serviceDashboard';
import serviceClient from '../../../services/serviceClients';

const DashboardContext = createContext();

export default function DashboardProvider({ children }) {
  const [dataDashboardCount, setDataDashboardCount] = useState(0);
  const [customers, setCustomers] = useState([]);
  const [page, setPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [count, setCount] = useState(0);
  const [autocompleteClients, setAutocompleteClients] = useState([]);
  const [answers, setAnswers] = useState([]);

  const getDataDashboardCount = async () => {
    const counts = await serviceDashboard.find();
    setDataDashboardCount(counts);
  };

  const getAnswerForClints = async () => {
    const res = await serviceAnswer.listAnswer();
    setAnswers(res);
  };

  const getClients = async (offset) => {
    const data = await serviceClient.find(offset, limit);
    if (!data) {
      return;
    }
    const { total, clients } = data;
    setCustomers(clients);
    setCount(total);
  };

  const filterClient = async (client) => {
    const res = await serviceClient.search(client);
    if (!res) {
    } else {
      return setCustomers(res);
    }
  };

  const getAutocompleteClients = async () => {
    const data = await serviceClient.find();
    if (!data) {
      return;
    }
    const { clients } = data;
    setAutocompleteClients(clients);
  };

  useEffect(() => {
    getAutocompleteClients();
  }, []);

  useEffect(() => {
    getAnswerForClints();
  }, []);

  useEffect(() => {
    getClients(page);
  }, [page, currentPage]);

  useEffect(() => {
    getDataDashboardCount();
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        dataDashboardCount,
        setDataDashboardCount,
        autocompleteClients,
        customers,
        setCustomers,
        filterClient,
        getClients,
        page,
        setPage,
        currentPage,
        setCurrentPage,
        limit,
        setLimit,
        count,
        getAnswerForClints,
        answers,
        setAnswers
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  const {
    dataDashboardCount,
    setDataDashboardCount,
    autocompleteClients,
    customers,
    setCustomers,
    filterClient,
    getClients,
    page,
    setPage,
    currentPage,
    setCurrentPage,
    limit,
    setLimit,
    count,
    getAnswerForClints,
    answers,
    setAnswers
  } = context;
  return {
    dataDashboardCount,
    setDataDashboardCount,
    autocompleteClients,
    customers,
    setCustomers,
    filterClient,
    getClients,
    page,
    setPage,
    currentPage,
    setCurrentPage,
    limit,
    setLimit,
    count,
    getAnswerForClints,
    answers,
    setAnswers
  };
}
