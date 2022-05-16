import axios from 'axios';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaRegCheckCircle } from 'react-icons/fa';

import UserContext from '../../contexts/UserContext';
import Input from '../../assets/styledComponents/Inputs';
import { Button } from '../../assets/styledComponents/Button';
import Container from '../../assets/styledComponents/Container';
import Arrow from '../Arrow';

function ConfirmOrderPage() {
    const { userInfo } = useContext(UserContext);
    const config = {
        headers: {
            'Authorization': `Bearer ${userInfo.token}`
        }
    };
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        nome: '',
        email: '',
        telefone: '',
        cep: '',
        rua: '',
        num: '',
        bairro: '',
        cidade: '',
        uf: ''
    });

    function clearForm() {
        setInputs({...inputs,
            rua: '',
            bairro: '',
            cidade: '',
            uf: ''
        });
    }

    async function checkCPF() {
        const cep = inputs.cep.replace(/\D/g, '');
        if (cep !== "") {
            const validateCEP = /^[0-9]{8}$/;
            if (validateCEP.test(cep)) {
                try {
                    const { data } = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
                    setInputs({...inputs,
                        rua: data.logradouro,
                        bairro: data.bairro,
                        cidade: data.localidade,
                        uf: data.uf
                    });
                    if (data.erro) {
                        alert("CPF inválido!");
                    }
                    console.log(data)
                }catch(e) {
                    alert(e.response.data);
                }
            } else {
                clearForm();
                alert("Formato de CEP inválido.");
            }
        } else {
            clearForm();
            alert("Formato de CEP inválido.");
        }
    }

    async function confirmOrder(e) {
        e.preventDefault();
        try {
            axios.post(process.env.REACT_APP_HEROKU_URL + '/delivery', {
                name: inputs.nome,
                email: inputs.email,
                phone: inputs.telefone,
                address: {
                    cep: inputs.cep,
                    rua: inputs.rua,
                    num: inputs.num,
                    bairro: inputs.bairro,
                    cidade: inputs.cidade,
                    uf: inputs.uf
                }
            }, config);
            navigate('/success');
        }catch(e) {
            console.log(e);
        }
    }

    return (
        <Box>
            <Container>
                <Arrow />
                <H1>Confirme seus dados</H1>
                <form>
                    <Input type='text' placeholder='Nome' value={inputs.nome} required
                           onChange={(e) => setInputs({...inputs, nome: e.target.value})}></Input>

                    <Input type='email' placeholder='E-mail' value={inputs.email} required
                           onChange={(e) => setInputs({...inputs, email: e.target.value})}></Input>

                    <Input type='tel' placeholder='Telefone' value={inputs.telefone} required
                           onChange={(e) => setInputs({...inputs, telefone: e.target.value})}></Input>
                    <div className='inputs-size'>
                        <Input type='text' placeholder='CEP' value={inputs.cep} required className='cep'
                             onBlur={checkCPF}
                             onChange={(e) => setInputs({...inputs, cep: e.target.value})}></Input>

                        <Input type='text' placeholder='Nº' value={inputs.num} required className='num'
                             onChange={(e) => setInputs({...inputs, num: e.target.value})}></Input>
                    </div>

                    <Input type='text' placeholder='Rua' value={inputs.rua} required
                            onChange={(e) => setInputs({...inputs, rua: e.target.value})}></Input>
                
                    <Input type='text' placeholder='Bairro' value={inputs.bairro} required
                            onChange={(e) => setInputs({...inputs, bairro: e.target.value})}></Input>
                   
                    <div className='inputs-size'>
                        <Input type='text' placeholder='Cidade' value={inputs.cidade} required className='cidade'
                            onChange={(e) => setInputs({...inputs, cidade: e.target.value})}></Input>

                        <Input type='text' placeholder='UF' value={inputs.uf} required className='uf'
                            onChange={(e) => setInputs({...inputs, uf: e.target.value})}></Input>
                    </div>

                    <Frete>
                        <FaRegCheckCircle />
                        <p>Frete grátis</p>
                    </Frete>

                    <Button type='button' onClick={confirmOrder}>Finalizar Pedido</Button>
               </form>
            </Container>
        </Box>
    )
}

export default ConfirmOrderPage;

const H1 = styled.h1`
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 23px;
    color: #000000;
    margin-bottom: 48px;
`;

const Frete = styled.div`
    width: 154px;
    height: 40px;
    font-style: normal;
    color: #06070D;
    margin: 40px 0 47px 0;
    background-color: #FFFFFF;
    box-shadow: 0px 4px 32px rgba(7, 8, 14, 0.05);
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;

    svg {
        color: ${props => props.color};
    }

    p {
        font-weight: 500;
        font-size: 14px;
        line-height: 24px;
        margin-left: 5px;
    }
`;

const Box = styled.div`
    .cep {
        width: 200px;
    }

    .num {
        width: 110px;
    }

    .cidade {
        width: 256px;
    }

    .uf {
        width: 57px;
    }

    .inputs-size {
        width: 100%;
        display: flex;
        justify-content: space-between;
    }
`;
