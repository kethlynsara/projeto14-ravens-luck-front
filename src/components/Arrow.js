import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { MdArrowBackIos } from 'react-icons/md';

function Arrow(){
    const navigate = useNavigate();

    return (
        <Header>
            <MdArrowBackIos onClick={() => navigate(-1)} size="24px"/>
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