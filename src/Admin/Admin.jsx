import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import ProtectedAdmin from '../components/ProtectedAdmin'
import Dashboard from './pages/Dashboard'
import CreateProduct from './pages/CreateProduct'
import EditProducts from './pages/EditProducts'
import Categories from './pages/Categories'
import CategoryDetail from './pages/CategoryDetail'

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


        <Route path='/categories' element={
          <ProtectedAdmin>
            <Categories key={window.location} />
          </ProtectedAdmin>
        }
        />

        <Route path='/categories/:id' element={
          <ProtectedAdmin>
            <CategoryDetail />
          </ProtectedAdmin>
        }
        />
      </Routes>
    </div>
  )
}

export default AdminLogin