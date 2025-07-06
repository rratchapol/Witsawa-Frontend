import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import MainLayout from './components/layout/MainLayout';
import LoginPage from './pages/auth/LoginPage';
import UsersPage from './pages/users/UsersPage';
import { useAuth } from './context/AuthContext';

// Protected Route Component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
}

// Layout Routes (หน้าที่ต้องการ Layout)
function LayoutRoutes() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/users" element={<UsersPage />} />
        <Route path="/" element={<Navigate to="/users" />} />
      </Routes>
    </MainLayout>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* หน้า Login (ไม่ต้องการ Layout) */}
          <Route path="/login" element={<LoginPage />} />
          
          {/* หน้าที่ต้องการ Layout */}
          <Route 
            path="/*" 
            element={
              <ProtectedRoute>
                <LayoutRoutes />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
