import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import { AuthProvider } from './contexts/AuthContext';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import VerifyEmail from './pages/auth/VerifyEmail';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import ProfileMenu from './pages/profile/ProfileMenu';
import PersonalInfo from './pages/profile/PersonalInfo';
import ProfessionalInfo from './pages/profile/ProfessionalInfo';
import AppLayout from './components/layout/AppLayout';
import Cgu from './pages/Cgu';
import LogoutConfirm from './pages/auth/LogoutConfirm';
import LogoutSuccess from './pages/auth/LogoutSuccess';
import DeleteAccount from './pages/profile/DeleteAccount';
import AccountDeleted from './pages/profile/AccountDeleted';
import { PrivateRoute, PrivateRouteCoach, PrivateRouteUser } from './components/auth/PrivateRoute';
import CreateBilanPage from './pages/bilan/CreateBilanPage';
import BilanListPage from './pages/bilan/BilanListPage';
import BilanDetailPage from './pages/bilan/BilanDetailPage';
import UsersListPage from './pages/users/UsersListPage';
import { Toaster } from 'react-hot-toast';
import NotFoundRedirect from './components/auth/NotFoundRedirect';
import Dashboard from "./pages/Dashboard";

const theme = createTheme({
  palette: {
    primary: {
      main: '#002B5B',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Router>
          <Toaster position="top-right" />
          <AppLayout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/verify-email" element={<VerifyEmail />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/cgu" element={<Cgu />} />
              <Route path="/logout-confirm" element={<LogoutConfirm />} />
              <Route path="/logout-success" element={<LogoutSuccess />} />
              <Route path="/account-deleted" element={<AccountDeleted />} />
                            
              {/* Routes protégées du profil */}
              <Route path="/profile" element={<PrivateRoute><ProfileMenu /></PrivateRoute>} />
              <Route path="/profile/personal" element={<PrivateRoute><PersonalInfo /></PrivateRoute>} />
              <Route path="/profile/professional" element={<PrivateRoute><ProfessionalInfo /></PrivateRoute>} />
              
              {/* Routes protégées du compte */}
              <Route path="/delete-account" element={<PrivateRoute><DeleteAccount /></PrivateRoute>} />

              {/* Routes protégées des bilans */}
              <Route path="/bilans/history" element={<PrivateRouteUser><BilanListPage /></PrivateRouteUser>} />
              <Route path="/bilans/create/:clientId" element={<PrivateRouteCoach><CreateBilanPage /></PrivateRouteCoach>} />

              <Route path="/bilans/:bilanId" element={<PrivateRoute><BilanDetailPage /></PrivateRoute>} />
              <Route path="/bilans" element={<PrivateRouteCoach><BilanListPage /></PrivateRouteCoach>} />
              
              {/* Routes protégées des utilisateurs */}
              <Route path="/users" element={<PrivateRouteCoach><UsersListPage /></PrivateRouteCoach>} />

              {/* Route protégée du dashboard */}
              <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
              
              {/* Route par défaut pour les routes non existantes */}
              <Route path="*" element={<NotFoundRedirect />} />
            </Routes>
          </AppLayout>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
