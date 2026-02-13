import { Dashboard } from './pages/Dashboard/Dashboard';
import { LoginPage } from './pages/Login/LoginPage';
import { RegisterPage } from './pages/Register/RegisterPage';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute';
import { DefaultLayout } from './components/DefaultLayout/DefaultLayout';
import { StoresPage } from './pages/Stores/StoresPage';
import { setAuthToken } from './api/axios';
import { ProductsPage } from './pages/Products/ProductsPage';
import { StockPage } from './pages/Stock/StockPage';


function App() {
  const token = localStorage.getItem('token');
  if(token){
    setAuthToken(token);
  }
  
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/login" element={< LoginPage />}/>
        <Route path="/register" element={< RegisterPage />}/>

        <Route element={<ProtectedRoute />}>

        <Route element={<DefaultLayout />}>
          <Route path='/dashboard' element={< Dashboard />}/>
        </Route>

        <Route element={<DefaultLayout />}>
          <Route path='/stores' element={< StoresPage />}/>
        </Route>

        <Route element={<DefaultLayout />}>
          <Route path='/products' element={< ProductsPage />}/>
        </Route>

        <Route element={<DefaultLayout />}>
          <Route path='/stock' element={< StockPage />}/>
        </Route>

        <Route path="/" element={< Navigate to="/dashboard" replace />}/> 
        <Route path="*" element={< Navigate to="/dashboard" replace />}/> 

        </Route>

        </Routes>
    </BrowserRouter>
     
  );
}

export default App
