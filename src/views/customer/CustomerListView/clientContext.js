import React, { createContext, useContext, useState, useEffect } from 'react';
import serviceClient from 'src/services/serviceClients';

const ClientContext = createContext();

export default function ClientProvider({ children }) {
  const [customers, setCustomers] = useState([]);
  const [page, setPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [count, setCount] = useState(0);
  const [autocompleteClients, setAutocompleteClients] = useState([]);
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);

  const getClients = async (offset) => {
    const data = await serviceClient.find(offset, limit);
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
    const { clients } = data;
    setAutocompleteClients(clients);
  };

  const removeClients = async (id) => {
    if (!id) {
      return;
    }
    const res = serviceClient.delete(id);
    if (!res) {
      return;
    } else {
      getClients();
    }
  };

  useEffect(() => {
    getAutocompleteClients();
  }, []);

  useEffect(() => {
    getClients(page);
  }, [page, currentPage]);

  return (
    <ClientContext.Provider
      value={{
        autocompleteClients,
        customers,
        setCustomers,
        filterClient,
        removeClients,
        getClients,
        page,
        setPage,
        currentPage,
        setCurrentPage,
        limit,
        setLimit,
        selectedCustomerIds,
        setSelectedCustomerIds,
        count
      }}
    >
      {children}
    </ClientContext.Provider>
  );
}

export function useClient() {
  const context = useContext(ClientContext);
  const {
    autocompleteClients,
    customers,
    setCustomers,
    filterClient,
    getClients,
    removeClients,
    page,
    setPage,
    currentPage,
    setCurrentPage,
    limit,
    setLimit,
    count,
    selectedCustomerIds,
    setSelectedCustomerIds
  } = context;
  return {
    autocompleteClients,
    customers,
    setCustomers,
    filterClient,
    getClients,
    removeClients,
    page,
    setPage,
    currentPage,
    setCurrentPage,
    limit,
    setLimit,
    count,
    selectedCustomerIds,
    setSelectedCustomerIds
  };
}
