import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { RoadmapPage } from './pages/RoadmapPage';
import { AdminPage } from './pages/AdminPage';
import { CommentsPage } from './pages/CommentsPage';
import { Login } from './components/Login/Login';
import { AuthProvider } from './contexts/AuthContext';
import { UserProvider } from './contexts/UserContext';
import { ProductMasterProvider } from './contexts/ProductMasterContext';
import { OperationLogProvider } from './contexts/OperationLogContext';
import { CommentProvider } from './contexts/CommentContext';
import { JiraProvider } from './contexts/JiraContext';
import { useAuth } from './contexts/AuthContext';
import { Layout } from './components/Layout/Layout';

function ProtectedRoute({ children, adminOnly = false }: { children: React.ReactNode; adminOnly?: boolean }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && !user.isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

function AppContent() {
  const { user } = useAuth();

  if (!user) {
    return <Login />;
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<RoadmapPage />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly>
              <AdminPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/comments"
          element={
            <ProtectedRoute>
              <CommentsPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <ProductMasterProvider>
          <OperationLogProvider>
            <CommentProvider>
              <JiraProvider>
                <Router>
                  <AppContent />
                </Router>
              </JiraProvider>
            </CommentProvider>
          </OperationLogProvider>
        </ProductMasterProvider>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;