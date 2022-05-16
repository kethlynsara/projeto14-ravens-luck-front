import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { MdArrowBackIos } from 'react-icons/md';
import { BsBookmark, BsThreeDotsVertical } from 'react-icons/bs';

import UserContext from '../../contexts/UserContext';

function BookPage() {
    const [book, setBook] = useState();
    const { bookId } = useParams();
    const navigate = useNavigate();
    const { userInfo } = useContext(UserContext);

    useEffect(() => {
        async function getData() {
            try {
                const { data } = await axios.get('process.env.REACT_APP_HEROKU_URL + ' + bookId);
                setBook(data);
            } catch(err) {
                console.log(err.response.data);
            }
        }
        getData();
    }, [bookId]);

    const config = {
        headers: {
            'Authorization': `Bearer ${userInfo.token}`
        }
    }

    async function addBookToCart() {
        try {
            await axios.post('process.env.REACT_APP_HEROKU_URL + ', book, config);
            navigate('/user/cart');
        } catch(err) {
            console.log(err.response.data);
        }
    }

    async function selectBookmark() {
        try {
            const elem = {...book};
            console.log(elem)
            const { data } = await axios.post('process.env.REACT_APP_HEROKU_URL + ' + bookId, { elem }, config);
            console.log(data)
        }catch(e){
            console.log(e.response.data);
        }

    }

    return (
        <Container>
            <Icons>
                <MdArrowBackIos size="24px"/>
                <div>
                    <BsBookmark size="24px" onClick={selectBookmark}/>
                    <BsThreeDotsVertical size="24px" style={{marginLeft: "24px"}}/>
                </div>
            </Icons>

            {book ? 
            <>
                <Book>
                    <Cover src={book.image}/>
                    <Title>{book.title}</Title>
                    <Author>{book.author}</Author>
                    <Description>{book.description}</Description>
                </Book>

                <BuyButton onClick={() => {
                        if (userInfo.token === '') navigate('/sign-in');
                            else addBookToCart();
                    }}>
                    <p>Compre agora por R${book.price}</p>
                </BuyButton>
            </>
            :
            <p>Loading...</p>}

            
        </Container>
    );
}

export default BookPage;

const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    padding: 44px 28px;
    font-family: 'Poppins', sans-serif;
`;

const Icons = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
`;

const Book = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Cover = styled.img`
    width: 216px;
    height: 310px;
    object-fit: cover;
    margin-bottom: 32px;
    border-radius: 5px 10px 10px 5px;
`;

const Title = styled.p`
    font-size: 24px;
    font-weight: 600;
    line-height: 16px;
    color: var(--main-color);
    margin-bottom: 12px;
`;

const Author = styled.p`
    font-size: 14px;
    font-weight: 500;
    line-height: 21px;
    color: var(--main-color);
    opacity: 0.5;
    margin-bottom: 16px;
`;

const Description = styled.p`
    font-size: 14px;
    font-weight: 400;
    line-height: 24px;
    color: var(--main-color);
    opacity: 0.5;
`;

const BuyButton = styled.button`
    width: 319px;
    height: 60px;
    background: var(--button-color);
    box-shadow: 0px 4px 32px rgba(7, 8, 14, 0.1);
    border: none;
    border-radius: 16px;
    
    position: fixed;
    left: 28x;
    right: 28x;
    bottom: 44px;

    &:hover {
        cursor: pointer;
        filter: brightness(1.1);
    }

    p {
        font-size: 16px;
        font-weight: 500;
        line-height: 24px;
        color: #FDFDFD;
    }
`;
