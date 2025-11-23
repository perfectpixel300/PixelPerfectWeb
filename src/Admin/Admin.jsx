import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import ProtectedAdmin from '../components/ProtectedAdmin'
import Dashboard from './pages/Dashboard'
import CreateProduct from './pages/CreateProduct'
import EditProducts from './pages/EditProducts'

const AdminLogin = () => {
  return (
    <div>
      <Routes>
        <Route path="/login" element={
          <Login />
        } />


        <Route
          path='edit/:id'
          element={
            <ProtectedAdmin>
              <EditProducts />
            </ProtectedAdmin>
          } />

        <Route path="/" element={
          <ProtectedAdmin>
            <Dashboard />
          </ProtectedAdmin>
        } />

        <Route path='/create-product' element={
          <ProtectedAdmin>
            <CreateProduct />
          </ProtectedAdmin>
        } />

      </Routes>
    </div>
  )
}

export default AdminLogin