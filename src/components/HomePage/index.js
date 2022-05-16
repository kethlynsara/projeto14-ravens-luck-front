import { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import Header from '../Header';
import TabBar from '../TabBar';
import BookElement from './BookElement';

function HomePage() {
    const [books, setBooks] = useState([]);
    
    useEffect(() => {
        async function getData() {
            try {
                const response = await axios.get('https://projeto14-ravens-luck-back.herokuapp.com/');
                setBooks(response.data);
            } catch(err) {
                console.log(err.response.data);
            }
        }
        getData();
    }, []);

    return (
        <Container>
            <Header />

            <List>
                <h2>Newest</h2>

                <ul>
                    {books.map((elem, i) => <BookElement key={i} elem={elem} />)}
                </ul>
            </List>

            <TabBar className="user-icon" />
        </Container>
    )
}

export default HomePage;

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

    h2 {
        font-size: 24px;
        font-weight: 600;
        line-height: 16px;
        margin-bottom: 28px;
        color: var(--main-color);
    }

    ul {
        width: 100%;
    }
`;