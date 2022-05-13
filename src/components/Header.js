import { useContext } from 'react';
import { Link }from 'react-router-dom';
import styled from 'styled-components';

import UserContext from '../contexts/UserContext';
import { FaUserCircle } from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';


export default function Header() {
    const { userInfo } = useContext(UserContext);

    return (
        <Container>
            <div>
                {userInfo.token !== '' ? 
                <>
                    <Profile src={userInfo.image} />
                    <Username>Olá, {userInfo.name}!</Username>
                </>
                :
                <>
                    <Link to="/sign-in">
                        <FaUserCircle className="user-icon" size="40px"/>
                    </Link>
                    <Username>Olá!</Username>
                </>}
            </div>
            <FiSearch size="24px"/>
        </Container>
    )
}

const Container = styled.header`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 36px;

    div {
        display: flex;
        align-items: center;
    }
`;

const Profile = styled.img`
    width: 40px;
    height: 40px;
    object-fit: cover;
    border-radius: 10px;
    margin-right: 12px;
`;

const Username = styled.p`
    font-size: 14px;
    font-weight: 600;
    line-height: 21px;
    color: var(--main-color);
`;