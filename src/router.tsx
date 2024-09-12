import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from '@/layouts/AppLayout';
import DashboardPage from '@/pages/DashboardPage';
import CreateProjectPage from '@/pages/projects/CreateProjectPage';
import EditProjectPage from '@/pages/projects/EditProjectPage';
import ProjectDetailsPage from '@/pages/projects/ProjectDetailsPage';
import AuthLayout from '@/layouts/AuthLayout';
import LoginPage from '@/pages/Auth/LoginPage';
import RegisterPage from '@/pages/Auth/RegisterPage';
import ConfirmAccountPage from '@/pages/Auth/ConfirmAccountPage';
import RequestCodePage from '@/pages/Auth/RequestCodePage';
import ForgotPasswordPage from './pages/Auth/ForgotPasswordPage';
import NewPasswordPage from './pages/Auth/NewPasswordPage';
import ProjectTeamPage from './pages/projects/ProjectTeamPage';
import ProfilePage from './pages/profile/ProfilePage';
import ChangePasswordPage from './pages/profile/ChangePasswordPage';
import ProfileLayout from './layouts/ProfileLayout';
import NotFoundPage from './pages/NotFoundPage';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path='/' element={<DashboardPage />} index />
          <Route path='/projects/create' element={<CreateProjectPage />} />
          <Route
            path='/projects/:projectId/'
            element={<ProjectDetailsPage />}
          />
          <Route
            path='/projects/:projectId/edit'
            element={<EditProjectPage />}
          />
          <Route
            path='/projects/:projectId/team'
            element={<ProjectTeamPage />}
          />
          <Route element={<ProfileLayout />}>
            <Route path='/profile' element={<ProfilePage />} />
            <Route path='/profile/password' element={<ChangePasswordPage />} />
          </Route>
        </Route>

        <Route element={<AuthLayout />}>
          <Route path='/auth/login' element={<LoginPage />} />
          <Route path='/auth/register' element={<RegisterPage />} />
          <Route
            path='/auth/confirm-account'
            element={<ConfirmAccountPage />}
          />
          <Route path='/auth/request-code' element={<RequestCodePage />} />
          <Route
            path='/auth/forgot-password'
            element={<ForgotPasswordPage />}
          />
          <Route path='/auth/new-password' element={<NewPasswordPage />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path='/404' element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
