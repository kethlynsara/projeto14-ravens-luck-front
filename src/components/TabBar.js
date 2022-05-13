import { useContext } from 'react';
import styled from 'styled-components';
import { RiHomeLine, RiShoppingCart2Line, RiSettings4Line, RiBookmarkLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';

import UserContext from '../contexts/UserContext';

function TabBar({icon}) {
    const { userInfo } = useContext(UserContext);
    const redirect = userInfo.token === "";

    return (
            <Footer>
                <Icons>
                    <StyledLink to='/'>
                        <RiHomeLine style={icon === 'home' ? {color: "#000"} : {color: "#9C9EA8"}} />
                    </StyledLink>
                    <StyledLink to={userInfo.token === '' ? '/sign-in' : '/wishlist'}>
                        <RiBookmarkLine style={icon === 'bookmark' ? {color: "#000"} : {color: "#9C9EA8"}} />
                    </StyledLink>
                    <StyledLink to={userInfo.token === '' ? '/sign-in' : '/cart'}>
                        <RiShoppingCart2Line />
                    </StyledLink>
                    <StyledLink to={userInfo.token === '' ? '/sign-in' : '/settings'}>
                        <RiSettings4Line />
                    </StyledLink>
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
    background: #FDFD;
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

const StyledLink = styled(Link)`
    color: #9C9EA8;
`;