import React, { useState } from 'react';

import { Link, useHistory } from 'react-router-dom'; 
//useHistory vamos usar para reenviar usuario à pagina de login assim que se registrar
import { FiArrowLeft } from 'react-icons/fi'
import logoImg from '../../assets/logo.svg'
import api from '../../services/api';

import './styles.css';


export default function Register() {

  const [name, setName] = useState(''); //aqui vem o valor inicial. caso, vazio.
  const [email, setEmail] = useState(''); //aqui vem o valor inicial. caso, vazio.
  const [whatsapp, setWhatsapp] = useState(''); //aqui vem o valor inicial. caso, vazio.
  const [city, setCity] = useState(''); //aqui vem o valor inicial. caso, vazio.
  const [uf, setUf] = useState(''); //aqui vem o valor inicial. caso, vazio.

  const history = useHistory(); // reenviando usuario para outra pagina sem usar Link to

  async function handleRegister(e) { //start here depois que importou o services/api
    e.preventDefault(); // previnir de recarregar a pagina ao (e)vento de submeter, que é default

    // agora vamos importar os dados que o usuário inserir, que são o ESTADO! 
    // importe o useState la em cima e crie o const pegando os valores acima de handleRegister

    const data = {
      name,
      email,
      whatsapp,
      city,
      uf
    };

    // agora vamos usar aquelas rotas backend que criamos e enviar os dados de data
    // ah no endereço dos metodos http nao precisa de barra
    // ('para onde quero enviar', o que quero enviar)
    // apenas isso ja enviaria >>
    // >>>>>>>>>>>>>>>>>>>>>>>>>> api.post('ongs', data)
    // mas vamos fazer com que o usuario receba uma resposta ao executar essa funcao!
    // await para esperar terminar, e coloquei async no nome da nossa funcao la em cima
    try { // tente fazer isso, mas se nao der certo, vai pro catch
      const response = await api.post('ongs', data)
      alert(`Seu ID de acesso é: ${response.data.id}`)
      history.push('/');  // reenviando usuario para outra pagina sem usar Link to
    } catch(err) {
      alert('Erro no cadastro, tente novamente')
    }

  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="be the Hero logo" />
          <h1>Cadastro</h1>
          <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG</p>

          <Link to="/" className="back-link">
            <FiArrowLeft size={16} color="#E02041" />
            Já tenho cadastro
          </Link>

        </section>
        <form onSubmit={handleRegister}>

          <input placeholder="Nome da ONG"
            value={name} //mandando para o useState
            onChange={e => setName(e.target.value)}/*mandando para o useState*/ />

          <input type="email"
            placeholder="E-mail"
            value={email}
            onChange={e => setEmail(e.target.value)} />

          <input placeholder="Whatsapp"
            value={whatsapp}
            onChange={e => setWhatsapp(e.target.value)} />

          <div className="inputGroup">
            <input placeholder="Cidade"
              value={city}
              onChange={e => setCity(e.target.value)} />

            <input placeholder="UF" style={{ width: 80 }}
              value={uf}
              onChange={e => setUf(e.target.value)} />
          </div>

          <button className="button" type="submit">Cadastrar</button>
        </form>

      </div>
    </div>

  )
}