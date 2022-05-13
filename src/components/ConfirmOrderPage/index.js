//import UserContext from "../../contexts/UserContext";
import axios from 'axios';
import { useState } from 'react';

import H1 from '../../assets/styledComponents/Logo';
import Input from '../../assets/styledComponents/Inputs';
import { Button } from '../../assets/styledComponents/Button';
import Container from '../../assets/styledComponents/Container';

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

    function clearForm() {
        setInputs({
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
                    setInputs({
                        rua: data.logradouro,
                        bairro: data.bairro,
                        cidade: data.localidade,
                        uf: data.uf
                    })
                    if (data.erro) {
                        alert("CPF inválido!");
                    }
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
                <H1>Raven's Luck</H1>
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

                    <Button type='button' onClick={confirmOrder}>Finalizar Pedido</Button>
               </form>
    </Container>
    )
}

export default ConfirmOrderPage;