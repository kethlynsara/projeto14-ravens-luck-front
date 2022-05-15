import { useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { MdRemoveShoppingCart } from 'react-icons/md';

import UserContext from '../../contexts/UserContext';

export default function CartElement({ elem, getData }) {
    const { image, title, author, price } = elem;
    const { userInfo } = useContext(UserContext);
    const config = {
        headers: {
            'Authorization': `Bearer ${userInfo.token}`
        }
    };

    async function removeBookFromCart() {
        try {
            const response = await axios.delete(process.env.REACT_APP_HEROKU_URL + '/user/cart', {
                headers: {
                    'Authorization': `Bearer ${userInfo.token}`
                },
                data :{
                    book: elem
                }});
            getData();
        } catch(err) {
            console.log(err);
        }
    }

    return (
        <Box>
            <Cover src={image}/>
            <div>
                <Title>{title}</Title>
                <Author>{author}</Author>
                <Value>R${price}</Value>
            </div>

            <RemoveIcon>
                <MdRemoveShoppingCart size="24px" onClick={removeBookFromCart}/>
            </RemoveIcon>
        </Box>
    );
}

const Box = styled.li`
    width: 100%;
    border-radius: 16px;
    padding: 24px 18px;
    margin-bottom: 14px;
    background-color: #F8F8F8;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    display: flex;
    position: relative;
`;

const Cover = styled.img`
    width: 127px;
    height: 157px;
    object-fit: cover;
    border-radius: 4px 8px 8px 4px;
    margin-right: 14px;
`;

const Title = styled.p`
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
    color: var(--main-color);
    margin-bottom: 5px;
`;

const Author = styled.p`
    font-size: 12px;
    font-weight: 500;
    line-height: 18px;
    color: var(--main-color);
    opacity: 0.5;
    margin-bottom: 14px;
`;

const Value = styled.p`
    font-size: 20px;
    font-weight: 500;
    line-height: 30px;
    color: #000;
`;

const RemoveIcon = styled.div`
    position: absolute;
    right: 18px;
    bottom: 24px;
    cursor: pointer;
`;