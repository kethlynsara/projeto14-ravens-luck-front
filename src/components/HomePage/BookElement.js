import axios from 'axios';
import { useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs';

import UserContext from '../../contexts/UserContext';

export default function BookElement({ elem, homePage, wishlistPage, setUpdateList, updateList }) {
    const { title, author, image, _id } = elem;
    const { userInfo } = useContext(UserContext);

    async function selectBookmark() {
        if (wishlistPage) { 
            console.log('wishlist') 
            try {
                const { data } = await axios.post('http://localhost:5000/wishlist', { elem }, { headers: {
                    'Authorization': `Bearer ${userInfo.token}`
                }});
                setUpdateList(updateList + 1);
                console.log(data)
            }catch(e){
                console.log(e.response.data);
            }
        } else if (homePage) {
            console.log('home')
            try {
                const { data } = await axios.post('http://localhost:5000/', { elem }, { headers: {
                    'Authorization': `Bearer ${userInfo.token}`
                }});
                console.log(data)
            }catch(e){
                console.log(e.response.data);
            }
        }   
    }

    return (
        <Box>
            <DisplayLink to={"/books/" + _id}>
                <Cover src={image} />
                <span>
                    <Title>{title}</Title>
                    <Author>{author}</Author>
                </span>
            </DisplayLink>
            <BsBookmark className="bookmark-icon" onClick={selectBookmark}/>
            {/* <BsBookmarkFill /> */}
        </Box>
    )
}

const Box = styled.li`
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 24px;
`;

const DisplayLink = styled(Link)`
    display: flex;
    text-decoration: none;
`;

const Cover = styled.img`
    width: 72px;
    height: 105px;
    object-fit: cover;
    border-radius: 4px 8px 8px 4px;
    margin-right: 28px;
`;

const Title = styled.p`
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
    color: var(--main-color);
    margin-bottom: 4px;
`;

const Author = styled.p`
    font-size: 12px;
    font-weight: 500;
    line-height: 18px;
    color: var(--main-color);
    opacity: 0.5;
`;