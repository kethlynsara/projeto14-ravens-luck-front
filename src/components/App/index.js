import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState} from 'react';

import UserContext from '../../contexts/UserContext';
import LoginPage from '../LoginPage';
import SignUpPage from '../SignUpPage';
import HomePage from '../HomePage';
import BookPage from '../BookPage';
import WishListPage from '../WishListPage';
import CartPage from '../CartPage';
import ConfirmOrderPage from '../ConfirmOrderPage';
import SuccessfulOrderPage from '../SuccessfulOrderPage';
import SettingsPage from '../SettingsPage';

import '../../assets/css/reset.css';

function App() {
    const [userInfo, setUserInfo] = useState({name: '', image: '', token: ''});
    return (
        <UserContext.Provider value={{ userInfo, setUserInfo }}>
            <BrowserRouter>
                <Routes>
                    <Route path='/sign-in' element={<LoginPage />} />
                    <Route path='/sign-up' element={<SignUpPage />} />
                    <Route path='/' element={<HomePage />} />
                    <Route path='/books/:bookid' element={<BookPage />} />
                    <Route path='/cart' element={<CartPage />} />
                    <Route path='/wishlist' element={<WishListPage />} />
                    <Route path='/settings' element={<SettingsPage />} />
                    <Route path='/delivery' element={<ConfirmOrderPage />} />
                    <Route path='/success' element={<SuccessfulOrderPage />} />
                </Routes>
            </BrowserRouter>
        </UserContext.Provider>
    )
}

export default App;