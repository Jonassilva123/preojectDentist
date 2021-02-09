import React, { useEffect, useState, createContext, useContext } from 'react';
import { AuthLogin } from '../services/serviceLogin';
import serviceUser from '../services/serviceUser';

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [currentUserRole, setCurrentUserRole] = useState('');
  const [currentUserEmail, setCurrentUserEmail] = useState('');
  const [currentUserTheme, setCurrentUserTheme] = useState('');
  const [userId, setUserId] = useState('');

  const signIn = async (username, password) => {
    try {
      const res = await AuthLogin.find(username, password);

      if (res.status === 200) {
        const { data } = res;
        const { _id } = data.user;
        localStorage.setItem('_id', _id);
        const { token } = data;
        localStorage.setItem('token', token);
        return data;
      }
      alert('Senha ou Usuário estão incoretos!');
    } catch (err) {
      console.error(err);
      alert(
        'Erro inesperado! Não conseguimos válidar as informações. Por favor tente novamente. '
      );
    }
  };

  async function handleTheme(theme) {
    const currentUserId = localStorage.getItem('_id');
    await serviceUser.update(currentUserId, { theme });
    return setCurrentUserTheme(theme);
  }

  const logout = () => {
    localStorage.clear();
    const refresh = window.location.reload();
    return refresh;
  };

  async function getCurrentUser() {
    const currentUserId = localStorage.getItem('_id');
    const res = await serviceUser.search(currentUserId);
    if (!res) {
    } else {
      return res.map((e) => {
        setCurrentUserRole(e.role);
        setCurrentUserEmail(e.email);
        setCurrentUserTheme(e.theme);
        setUserId(e._id);
      });
    }
  }

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        username,
        setUsername,
        password,
        setPassword,
        signIn,
        logout,
        currentUserRole,
        currentUserEmail,
        currentUserTheme,
        setCurrentUserTheme,
        handleTheme,
        userId
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  const {
    username,
    setUsername,
    password,
    setPassword,
    signIn,
    logout,
    currentUserRole,
    currentUserEmail,
    currentUserTheme,
    setCurrentUserTheme,
    handleTheme,
    userId
  } = context;
  return {
    username,
    setUsername,
    password,
    setPassword,
    signIn,
    logout,
    currentUserRole,
    currentUserEmail,
    currentUserTheme,
    setCurrentUserTheme,
    handleTheme,
    userId
  };
}
