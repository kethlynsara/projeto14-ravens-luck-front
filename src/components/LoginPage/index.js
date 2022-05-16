import axios from 'axios';
import { useState, useContext  } from 'react';
import { useNavigate } from 'react-router-dom';

import UserContext from "../../contexts/UserContext";
import H1 from '../../assets/styledComponents/Logo';
import Input from '../../assets/styledComponents/Inputs';
import {Button, StyledLink} from '../../assets/styledComponents/Button';
import Container from '../../assets/styledComponents/Container';

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
            const { data } = await axios.post('http://localhost:7000/sign-in', {email: inputs.email, password: inputs.password});
            setUserInfo({...userInfo, name: data.name, image: data.image, token: data.token})
            navigate("/");
        }catch(e) {
            alert(e.response.data);
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