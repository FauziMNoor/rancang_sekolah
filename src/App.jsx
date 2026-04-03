import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import { SettingsProvider } from './context/SettingsContext'
import SettingsModal from './components/SettingsModal'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import Dashboard from './pages/Dashboard'
import BuilderPage from './pages/BuilderPage'
import VisualBlueprint from './pages/VisualBlueprint'
import './styles/global.css'

function PrivateRoute({ children }) {
  const { user } = useAuth()
  return user ? children : <Navigate to="/login" replace />
}

function PublicRoute({ children }) {
  const { user } = useAuth()
  return user ? <Navigate to="/dashboard" replace /> : children
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <SettingsProvider>
          <SettingsModal />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={
              <PublicRoute><LoginPage /></PublicRoute>
            } />
            <Route path="/dashboard" element={
              <PrivateRoute><Dashboard /></PrivateRoute>
            } />
            <Route path="/builder/:id" element={
              <PrivateRoute><BuilderPage /></PrivateRoute>
            } />
            <Route path="/builder/new" element={
              <PrivateRoute><BuilderPage /></PrivateRoute>
            } />
            <Route path="/visual-blueprint" element={<VisualBlueprint />} />
          </Routes>
        </SettingsProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}


