import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaRegCheckCircle } from 'react-icons/fa';

import Arrow from '../Arrow';

function SuccessfulOrderPage() {
    const navigate = useNavigate();
    function goBackToHome() {
        //zerar carrinho de compras
        navigate('/');
    }

    return (
        <Container>
            <Link to='/delivery' ><Arrow /></Link>
            <FaRegCheckCircle className="check-icon" />
            <h6>Compra realizada com sucesso!</h6>
            <p>O pedido será entregue em até 30 dias. </p>
            <button onClick={goBackToHome}>Voltar</button>
        </Container>
    )
}

export default SuccessfulOrderPage;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: 'Inter', sans-serif;
    margin: 150px 25px 0 25px;

    h6 {
        font-weight: 400;
        font-size: 24px;
        line-height: 30px;
        color: #222222;
        margin-top: 44.86px;
    }

    p {
        font-weight: 400;
        font-size: 14px;
        line-height: 22px;
        color: #868686;
        margin-top: 45.91px;
        margin-bottom: 99.63px;
        text-align: center;
    }

    .check-icon {
        width: 88.83px;
        height: 124.6px;
    }

    button {
        width: 140px;
        height: 30px;
        background: #06070D;
        border-radius: 50px;
        border: none;
        color: #fff;
    }
`;