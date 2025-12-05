import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import News from '../pages/News';
import NotFoundPage from '../pages/NotFoundPage';
import Navbar from '../components/Navbar';
import PrivateRouter from './PrivateRouter';

const AppRouter = () => {
  return (
    <BrowserRouter>
        <Navbar />
        <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />

                 {/* Private Routes */}
                <Route element={<PrivateRouter />}>
                    <Route path='/' element={<News />} />
                </Route>
                
                <Route path='*' element={<NotFoundPage />} />
        </Routes>
    </BrowserRouter>
  )
}

export default AppRouter