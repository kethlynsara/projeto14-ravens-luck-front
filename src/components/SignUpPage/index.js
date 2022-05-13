import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


import H1 from '../styledComponents/Logo';
import Input from '../styledComponents/Inputs';
import {Button, StyledLink} from '../styledComponents/Button';
import Container from '../styledComponents/Container';

function SignUpPage() {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        username: '',
        email: '',
        image: '',
        password: '',
        confirmPassword: ''
    });

    async function signUp(e) {
        e.preventDefault();
        try {
            const {data} = await axios.post('http://localhost:5000/sign-up', {
                username: inputs.username,
                email: inputs.email,
                image: inputs.image,
                password: inputs.password,
                confirmPassword:inputs.confirmPassword
            });
            console.log(data);
            navigate("/sign-in");
        }catch(e) {
            alert(e.response.data);
        }
    }

    return (
        <Container>
            <H1>Raven's Luck</H1>
            <form>
                <Input type='text' placeholder='Nome' value={inputs.name} required
                       onChange={(e) => setInputs({...inputs, username: e.target.value})}></Input>

                <Input type='email' placeholder='E-mail' value={inputs.email} required
                       onChange={(e) => setInputs({...inputs, email: e.target.value})}></Input>

                <Input type='text' placeholder='Foto' value={inputs.image} required
                       onChange={(e) => setInputs({...inputs, image: e.target.value})}></Input>

                <Input type='password' placeholder='Senha' value={inputs.password} required 
                       onChange={(e) => setInputs({...inputs, password: e.target.value})}></Input>

                <Input type='password' placeholder='Confirme a senha' value={inputs.confirmPassword} required
                       onChange={(e) => setInputs({...inputs, confirmPassword: e.target.value})}></Input>

                <Button type='button' onClick={signUp}>Cadastrar</Button>

                <StyledLink to='/sign-in'>Já tem uma conta? Entre agora!</StyledLink>
            </form>
        </Container>
    )
}

export default SignUpPage;