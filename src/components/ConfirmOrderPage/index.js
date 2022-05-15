import axios from 'axios';
import { useState } from 'react';
import styled from 'styled-components';
import { FaRegCheckCircle } from 'react-icons/fa';

import Input from '../../assets/styledComponents/Inputs';
import { Button } from '../../assets/styledComponents/Button';
import Container from '../../assets/styledComponents/Container';
import Arrow from '../Arrow';

function ConfirmOrderPage() {
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
    const [on, setOn] = useState(false);

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

    function confirmOrder(e) {
        e.preventDefault();
        console.log(inputs.nome, inputs.email, inputs.telefone, inputs.cep, inputs.rua, inputs.num, inputs.bairro, inputs.cidade, inputs.uf)
    }

    return (
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

                    <Input type='text' placeholder='CEP' value={inputs.cep} required 
                           onBlur={checkCPF}
                           onChange={(e) => setInputs({...inputs, cep: e.target.value})}></Input>

                    <Input type='text' placeholder='Rua' value={inputs.rua} required
                           onChange={(e) => setInputs({...inputs, rua: e.target.value})}></Input>

                    <Input type='text' placeholder='Número' value={inputs.num} required
                           onChange={(e) => setInputs({...inputs, num: e.target.value})}></Input>
                
                    <Input type='text' placeholder='Bairro' value={inputs.bairro} required
                           onChange={(e) => setInputs({...inputs, bairro: e.target.value})}></Input>
                   
                    <Input type='text' placeholder='Cidade' value={inputs.cidade} required
                           onChange={(e) => setInputs({...inputs, cidade: e.target.value})}></Input>

                    <Input type='text' placeholder='UF' value={inputs.uf} required
                           onChange={(e) => setInputs({...inputs, uf: e.target.value})}></Input>

                    <Frete color={on ? '#368511' : '#06070D'} onClick={() => setOn(!on)}>
                        <FaRegCheckCircle />
                        <p>Frete grátis</p>
                    </Frete>

                    <Button type='button' onClick={confirmOrder}>Finalizar Pedido</Button>
               </form>
    </Container>
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