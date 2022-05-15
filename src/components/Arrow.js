import styled from 'styled-components';
import { IoIosArrowBack } from 'react-icons/io';

function Arrow(){
    return (
        <Header>
            <IoIosArrowBack />
        </Header>
    )
}

export default Arrow;

const Header = styled.header`
    svg {
        position: absolute;
        top: 40px;
        left: 25px;
        width: 24px;
        height: 24px;
    }
`;