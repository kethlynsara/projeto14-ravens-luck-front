import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import TabBar from '../TabBar';
import BookElement from '../HomePage/BookElement';
import UserContext from '../../contexts/UserContext';

function WishListPage() {
    const { userInfo } = useContext(UserContext);
    const [books, setBooks] = useState([]);
    const [wishlistPage, setWishlistPage] = useState(true);
    const [updateList, setUpdateList] = useState(0);

    useEffect(() => {
        async function getData() {
            try {
                const response = await axios.get('http://localhost:7000/wishlist',  { headers: {
                    'Authorization': `Bearer ${userInfo.token}`
                }});
                setBooks(response.data);
            } catch(err) {
                console.log(err.response.data);
            }
        }
        getData();
    }, [updateList]);

    return (
        <Container>
            <List>
                <ul>
                    {books.map((elem, i) => <BookElement key={i} elem={elem} wishlistPage={wishlistPage} setWishlistPage={setWishlistPage} updateList={updateList} setUpdateList={setUpdateList}/>)}
                </ul>
            </List>

            <TabBar className="user-icon" />
        </Container>
    )
}

export default WishListPage;

const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    padding: 44px 28px;
    font-family: 'Poppins', sans-serif;
`;

const List = styled.div`
    width: 100%;

    ul {
        width: 100%;
    }
`;