import { Link } from "react-router-dom";
import styled from "styled-components";

export const Button = styled.div`
    width: 100%;
    height: 46px;
    border-radius: 5px;
    border: none;  
    padding-top: 11px;
    margin-bottom: 36px;
    font-weight: 700;
    font-size: 20px;
    line-height: 23px;
    text-align: center;
    color: #ffffff;
    background-color: #06070D;
    
`;

export const StyledLink = styled(Link)`
    font-style: normal;
    font-weight: 700;
    font-size: 15px;
    line-height: 18px;
    color: #06070D;
    text-decoration: none;
`;