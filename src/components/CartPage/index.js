import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { BsThreeDotsVertical } from 'react-icons/bs';

import UserContext from '../../contexts/UserContext';
import CartElement from './CartElement';
import Arrow from '../Arrow';

function CartPage() {
    const { userInfo } = useContext(UserContext);
    const config = {
        headers: {
            'Authorization': `Bearer ${userInfo.token}`
        }
    };
    const navigate = useNavigate();
    const [cart, setCart] = useState(null);
    const [total, setTotal] = useState(0);

    async function getData() {
        try {
            const { data } = await axios.get('http://localhost:5000/user/cart', config);
            setCart(data.cart);
            setTotal(data.total.replace('.', ','));
        } catch(err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <Container>
            <Icons>
                <Arrow />
                <BsThreeDotsVertical size="24px"/>
            </Icons>

            <ul>
                {cart ? cart.map((elem, i) => <CartElement key={i} elem={elem} getData={getData} />) : <p>Sem livros no carrinho...</p>}
            </ul>

            <Box>
                <Total>
                    <span>Total</span>
                    R${total}
                </Total>
                <Button onClick={() => navigate('/user/delivery')}>
                    <p>CHECK-OUT</p>
                </Button>
            </Box>
        </Container>
    );
}

export default CartPage;

const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    padding: 44px 28px;
    font-family: 'Poppins', sans-serif;

    ul {
        margin-bottom: 200px;
    }
`;

const Icons = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
`;

const Box = styled.div`
    width: 100%;
    height: 112px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #F8F8F8;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    padding: 0 25px;
    position: fixed;
    bottom: 58px;
    right: 0;
`;

const Total = styled.div`
    font-family: 'Mulish', sans-serif;
    font-size: 20px;
    font-weight: 600;
    line-height: 24px;
    color: var(--main-color);
    position: relative;

    span {
        font-size: 12px;
        font-weight: 600;
        line-height: 24px;
        color: #000;
        position: absolute;
        bottom: 20px;
    }
`;

const Button = styled.button`
    width: 195px;
    height: 62px;
    border: none;
    border-radius: 30px;
    background-color: var(--button-color);
    position: absolute;
    right: -30px;

    &:hover {
        cursor: pointer;
        filter: brightness(1.1);
    }

    p {
        font-family: 'Roboto', sans-serif;
        font-size: 16px;
        font-weight: 500;
        color: #FDFDFD;
    }

`;