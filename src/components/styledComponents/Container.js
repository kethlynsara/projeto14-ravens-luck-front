import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 159px 25px 192px 25px; 
    font-family: 'Raleway', sans-serif;

    form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    input::placeholder {
        font-size: 20px;
        line-height: 23px;
        font-weight: 400;
        color: #06070D;
    }
`;

export default Container;