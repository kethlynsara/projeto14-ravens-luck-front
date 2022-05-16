import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { BsThreeDotsVertical } from 'react-icons/bs';

import Arrow from '../Arrow';
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
                const response = await axios.get(process.env.REACT_APP_HEROKU_URL + '/wishlist',  { headers: {
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
            <Header>
                <Arrow />
                <BsThreeDotsVertical size="24px"/>
            </Header>
            <List>
                <ul>
                    {books.length !== 0 ? books.map((elem, i) => <BookElement key={i} elem={elem} wishlistPage={wishlistPage} setWishlistPage={setWishlistPage} updateList={updateList} setUpdateList={setUpdateList}/>)
                    : <h6>Você não possui nenhum livro salvo ainda!</h6>}
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

    h6 {
        font-weight: 400;
        font-size: 17px;
        line-height: 16px;
        text-align: center;
        margin-top: 200px;
        opacity: 0.5;
    }
`;

const Header = styled.header`
    display: flex;
    justify-content: space-between;
    margin-bottom: 35px;
`;
