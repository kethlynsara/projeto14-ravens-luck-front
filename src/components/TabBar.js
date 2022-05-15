import { useContext } from 'react';
import styled from 'styled-components';
import { RiHomeLine, RiShoppingCart2Line, RiSettings4Line, RiBookmarkLine } from 'react-icons/ri';
import { NavLink } from 'react-router-dom';

import UserContext from '../contexts/UserContext';

function TabBar({icon}) {
    const { userInfo } = useContext(UserContext);

    return (
            <Footer>
                <Icons>
                    <NavLink className={({ isActive }) => isActive ? "nav-active" : "nav-inactive"}
                    to='/'>
                        <RiHomeLine />
                    </NavLink>

                    <NavLink className={({ isActive }) => isActive ? "nav-active" : "nav-inactive"}
                    to={userInfo.token === '' ? '/sign-in' : '/wishlist'}>
                        <RiBookmarkLine />
                    </NavLink>

                    <NavLink className={({ isActive }) => isActive ? "nav-active" : "nav-inactive"}
                    to={userInfo.token === '' ? '/sign-in' : '/user/cart'}>
                        <RiShoppingCart2Line />
                    </NavLink>

                    <NavLink className={({ isActive }) => isActive ? "nav-active" : "nav-inactive"}
                    to={userInfo.token === '' ? '/sign-in' : '/settings'}>
                        <RiSettings4Line />
                    </NavLink>
                </Icons>
            </Footer>
    )
}

export default TabBar;

const Icons = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 319px;
    height: 72px;
    background: #fff;
    box-shadow: 0px 4px 32px rgba(7, 8, 14, 0.05);
    border-radius: 22px;
    position: fixed;
    left: 28x;
    right: 28x;
    bottom: 44px;

    svg {
        width: 21px;
        height: 21px;
    }
`;

const Footer = styled.footer`
    display: flex;
    justify-content: center;
    align-items: center;
`;