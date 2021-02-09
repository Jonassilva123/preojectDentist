import React from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';
import AccountView from 'src/views/account/AccountView';
import CustomerListView from 'src/views/customer/CustomerListView';
import DashboardView from 'src/views/reports/DashboardView';
import LoginView from 'src/views/auth/LoginView';
import NotFoundView from 'src/views/errors/NotFoundView';
import RegisterView from 'src/views/register';
import CustomerPerfil from 'src/views/customer/CustomerPerfil';
import QuestionsView from 'src/views/questions/QuestionsView';
import SettingsProfileClient from 'src/views/customer/CustomerPerfil/SettingsPerfil';
import UserView from 'src/views/user/UserListView';
import UserSettingsView from 'src/views/user/UserSettingsView';
import AnswersClient from 'src/views/answers';
import AnswersEdit from 'src/views/questions/QuestionsView/AnswersEdit';
import { useAuth } from 'src/context/AuthContext';

export default function useRoutes() {
  const token = localStorage.getItem('token');
  const { currentUserRole } = useAuth();

  function authNavigation() {
    if (currentUserRole === 'client') {
      return (
        <>
          <Route path="/app" element={<DashboardLayout />}>
            <Route path="/account" element={<AccountView />} />
            <Route path="/answers" element={<AnswersClient />} />
            <Route
              path="/questions/:formId/:clientId"
              element={<QuestionsView />}
            />
            <Navigate to="/account" />
          </Route>
          <Route path="404" element={<NotFoundView />} />
          <Navigate to="/app/account" />
          <Route path="*" element={<Navigate to="/app/account" />} />
        </>
      );
    }
    return (
      <>
        <Route path="/app" element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardView />} />
          <Route path="/customers" element={<CustomerListView />} />
          <Route
            path="/customers/profile/:clientId"
            element={<CustomerPerfil />}
          />
          <Route
            path="/customers/profile/:clientId/form/:formId"
            element={<AnswersEdit />}
          />
          <Route
            path="customers/profile/settings/:id"
            element={<SettingsProfileClient />}
          />
          <Route path="/account" element={<AccountView />} />
          <Route path="/register" element={<RegisterView />} />
          <Route path="/users" element={<UserView />} />
          <Route path="/users/settings/:id" element={<UserSettingsView />} />
          <Navigate to="/dashboard" />
        </Route>
        <Route path="404" element={<NotFoundView />} />
        <Route
          path="/questions/:formId/:clientId"
          element={<QuestionsView />}
        />
        <Navigate to="/app/dashboard" />
        <Route path="*" element={<Navigate to="/app/dashboard" />} />
      </>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        {token ? (
          authNavigation()
        ) : (
          <>
            <Route path="/login" element={<LoginView />} />
            <Navigate to="/login" />
            <Route path="404" element={<NotFoundView />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        )}
      </Route>
    </Routes>
  );
}
