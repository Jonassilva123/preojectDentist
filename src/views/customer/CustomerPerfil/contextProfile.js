import React, { useEffect, useState, createContext, useContext } from 'react';
import serviceClients from 'src/services/serviceClients';
import serviceTusks from 'src/services/serviceTusks';

const ProfileContext = createContext();

export default function ProfileProvider({ children }) {
  const [id, setId] = useState('');
  const [client, setClient] = useState({});
  const [tusks, setTusks] = useState([]);

  async function getProfile() {
    if (!id) {
      return;
    } else {
      const res = await serviceClients.search(id);
      return res;
    }
  }
  async function getTusks() {
    if (!id) {
      return;
    } else {
      const res = await serviceTusks.find(id);
      return res;
    }
  }

  async function handleTusks() {
    const data = await getTusks();
    if (!data) {
      return;
    }
    return setTusks(data);
  }

  const removeTusks = async (id) => {
    if (!id) {
      return;
    }
    const res = serviceTusks.delete(id);
    if (!res) {
      return;
    } else {
      handleTusks();
    }
  };

  async function createTusks(data) {
    try {
      if (!data) {
        return;
      }
      return await serviceTusks.create(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleProfile() {
    const data = await getProfile();
    if (!data) {
      return;
    }
    return data.map((e) => {
      return setClient({
        firstName: e.firstName,
        lastName: e.lastName,
        document: e.document,
        birth: e.birth,
        email: e.email,
        phoneOne: e.phones.map((e) => e.one),
        phoneTwo: e.phones.map((e) => e.two),
        father: e.father,
        mother: e.mother,
        state: e.place.map((e) => e.state),
        city: e.place.map((e) => e.city)
      });
    });
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    handleProfile();
  }, [id]);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    handleTusks();
  }, [id]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    getProfile();
  }, [id]);

  return (
    <ProfileContext.Provider
      value={{
        setId,
        id,
        client,
        setClient,
        tusks,
        setTusks,
        getTusks,
        createTusks,
        handleTusks,
        removeTusks
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  const {
    id,
    setId,
    client,
    setClient,
    tusks,
    setTusks,
    getTusks,
    createTusks,
    handleTusks,
    removeTusks
  } = context;
  return {
    id,
    setId,
    client,
    setClient,
    tusks,
    setTusks,
    getTusks,
    createTusks,
    handleTusks,
    removeTusks
  };
}
