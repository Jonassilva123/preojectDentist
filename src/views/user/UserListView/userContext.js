import React, { createContext, useContext, useState, useEffect } from 'react';
import serviceUser from 'src/services/serviceUser';

const UserContext = createContext();

export default function UserProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [count, setCount] = useState(0);
  const [autocompleteUsers, setAutocompleteUsers] = useState([]);

  const getUsers = async () => {
    const data = await serviceUser.find(page, limit);
    if (!data) {
      return;
    }
    const { total, users } = data;
    setUsers(users);
    setCount(total);
  };

  const filterUser = async user => {
    const res = await serviceUser.search(user);
    if (!res) {
    } else {
      return setUsers(res);
    }
  };

  const removerUser = async currentUserId => {
    if (!currentUserId) return;

    await serviceUser.delete(currentUserId);
    getUsers();

    if (currentUserId === localStorage.getItem('_id')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  const getAutocompleteUsers = async () => {
    const data = await serviceUser.find();
    if (!data) {
      return;
    }
    const { users } = data;
    setAutocompleteUsers(users);
  };

  useEffect(() => {
    getAutocompleteUsers();
  }, []);

  useEffect(() => {
    getUsers();
  }, [page, currentPage]);

  return (
    <UserContext.Provider
      value={{
        autocompleteUsers,
        users,
        setUsers,
        filterUser,
        getUsers,
        page,
        setPage,
        currentPage,
        setCurrentPage,
        limit,
        setLimit,
        count,
        removerUser
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  const {
    autocompleteUsers,
    users,
    setUsers,
    filterUser,
    getUsers,
    page,
    setPage,
    currentPage,
    setCurrentPage,
    limit,
    setLimit,
    count,
    removerUser
  } = context;
  return {
    autocompleteUsers,
    users,
    setUsers,
    filterUser,
    getUsers,
    page,
    setPage,
    currentPage,
    setCurrentPage,
    limit,
    setLimit,
    count,
    removerUser
  };
}
