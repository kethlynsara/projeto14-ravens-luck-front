import axios from 'axios';
import { useState, useContext  } from 'react';
import { useNavigate } from 'react-router-dom';

import UserContext from "../../contexts/UserContext";
import H1 from '../styledComponents/Logo';
import Input from '../styledComponents/Inputs';
import {Button, StyledLink} from '../styledComponents/Button';
import Container from '../styledComponents/Container';

function LoginPage() {
    const { userInfo, setUserInfo } = useContext(UserContext); 
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        email: '',
        password: ''
    });

    async function login(e) {
        e.preventDefault();
        try {
            const { data } = await axios.post('https://projeto14-ravens-luck-back.herokuapp.com/sign-in', {email: inputs.email, password: inputs.password});
            setUserInfo({...userInfo, name: data.name, image: data.image, token: data.token})
            navigate("/");
        }catch(e) {
            console.log(e.response.data)
        }
    }

    return (
        <Container>
            <H1>Raven's Luck</H1>
            <form>
                <Input type='email' placeholder='E-mail' value={inputs.email} required
                       onChange={(e) => setInputs({...inputs, email: e.target.value})}></Input>

                <Input type='password' placeholder='Senha' value={inputs.password} required 
                       onChange={(e) => setInputs({...inputs, password: e.target.value})}></Input>

                <Button type='button' onClick={login}>Entrar</Button>

                <StyledLink to='/sign-up'>Primeira vez? Cadastre-se!</StyledLink>
            </form>
        </Container>
    )
}

export default LoginPage;