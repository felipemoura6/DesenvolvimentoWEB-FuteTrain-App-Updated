import { Routes, Route, Navigate, useLocation, Link } from 'react-router-dom';
import { Register } from './components/register';
import { Login } from './components/login';
import { Dashboard } from './components/dashboard';
import { Home } from './components/home';
import { Navbar } from './components/navbar';
import { Content } from './components/content';
import { UserProfile } from './components/userProfile';

export function App() {
  const isAuthenticated = !!localStorage.getItem('token');
  const token = localStorage.getItem('token') ?? undefined;
  const location = useLocation();


  const shouldRenderNavbar = location.pathname !== '/register' && location.pathname !== '/login';

  return (
    <>
      <div className="justify-center flex bg-gradient-to-b from-green-900 to-green-600 py-1 border-[0.1px] border-gray-900 w-full">
        <Link to="/">
          <h1 className='text-lg font-weight-600'>Futetrain - APP!</h1>
        </Link>
      </div>
      {shouldRenderNavbar && <Navbar message={''} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/training" element={<Content content='training' />} />
        <Route path="/progress" element={<Content content='progress' />} />
        <Route path="/history" element={<Content content='history' />} />
        <Route path="/inventory" element={<Content content='inventory' />} />
        <Route path="/news" element={<Content content='news' />} />
        <Route path="/premium" element={<Content content='premium' />} />
        <Route path="/teams" element={<Content content='teams' />} />
        <Route path="/teams/:team_name" element={<Content content='specific team'/>} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="/account/:username" element={<UserProfile token={token} />} />
      </Routes>
    </>
  );
}

interface PrivateRouteProps {
  isAuthenticated: boolean;
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ isAuthenticated, children }) => {
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};
