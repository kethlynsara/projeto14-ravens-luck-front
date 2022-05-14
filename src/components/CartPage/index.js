import { useContext } from 'react';
import axios from 'axios';

import UserContext from '../../contexts/UserContext';

function CartPage() {
    const { userInfo } = useContext(UserContext);
    const config = {
        headers: {
            'Authorization': `Bearer ${userInfo.token}`
        }
    };

    async function getData() {
        try {
            const { data } = await axios.get('http://localhost:5000/user/cart', config);
            console.log(data);
        } catch(err) {
            console.log(err);
        }
    }
    getData();

    return <h1>Shopping cart</h1>
}

export default CartPage;