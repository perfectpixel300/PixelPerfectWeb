import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import ProtectedAdmin from '../components/ProtectedAdmin'
import Dashboard from './pages/Dashboard'

const AdminLogin = () => {
  return (
    <div>
      <Routes>
        <Route path="/login" element={
          <Login />
        } />
        <Route path="/" element={
          <ProtectedAdmin>
            <Dashboard />
          </ProtectedAdmin>
        } />
      </Routes>
    </div>
  )
}

export default AdminLogin