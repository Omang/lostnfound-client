
import { Route, Routes } from 'react-router-dom'
import './App.css'
import WelcomePage from './pages/WelcomePage'
import Layout from './components/Layout'
import axios from 'axios'
import { UserContextProvider } from './UserContext'
import { useEffect } from 'react'
import LoginUser from './pages/LoginUser'
import AccountPage from './pages/AccountPage'
import UserPage from './pages/UserPage'
import PaymentPage from './pages/PaymentPage'
import DocForm from './components/DocForm'
import DocPage from './pages/DocPage'
import LoginAdmin from './pages/LoginAdmin'
import OwnerPage from './pages/OwnerPage'
import SpotsPage from './pages/SpotsPage'
import SpotmainPage from './pages/SpotmainPage'
import DocPayPage from './pages/DocPayPage'
import Notification from './utils/Notification'
import OwnerPayments from './components/OwnerPayments'
import FinderDetailsPage from './pages/FinderDetailsPage'


axios.defaults.baseURL = 'http://127.0.0.1:5000/api';
axios.defaults.withCredentials = true;

function App() {

  return (
    <UserContextProvider>
    <Routes>
      <Route path='/' element={<Layout />}>

      <Route index element={<WelcomePage />} />
      <Route path='/login' element={<LoginUser />} />
      <Route path='/account' element={<AccountPage />} />
      <Route path='/account/docs' element={<UserPage />} />
      <Route path='/account/docs/new' element={<DocForm />} />
      <Route path='/account/payment' element={<PaymentPage />} />
      <Route path='/account/docs/doc/:id' element={<DocPage />} />
      <Route path='/adminlogin' element={<LoginAdmin />} />
      <Route path='/owner' element={<OwnerPage />} />
      <Route path='/owner/spots' element={<SpotsPage />} />
      <Route path='/owner/spots/spot/:id' element={<SpotmainPage />} />
      <Route path='/payment/pay/:id' element={<DocPayPage />}></Route>
      <Route path='/owner/payments' element={<OwnerPayments />} />
      <Route path='/owner/payments/collect/finder/:id' element={<FinderDetailsPage />} />
      
      </Route>
      
    </Routes>
    <Notification />
    </UserContextProvider> 
      
  )
}

export default App
