import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi'; // feather icons // ctrl+espaco para todos icons {}

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg'
import heroesImg from '../../assets/heroes.png'

export default function Logon() {
  const [id, setId] = useState('');
  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const response = await api.post('sessions', { id });
      console.log(response.data.name);
      // preciso desses dados em toda a minha aplicação, então faremos como abaixo:
      localStorage.setItem('ongId', id);
      localStorage.setItem('ongName', response.data.name);

      history.push('/profile');
    } catch (err) {
      alert('Falha no login. Verifique seu ID e tente novamente.')
    }
  }


  return (
    <div className="logon-container">
      <section className="form">
        <img src={logoImg} alt="be the Hero logo" />

        <form onSubmit={handleLogin}>
          <h1>Faça seu logon</h1>

          <input placeholder="Seu ID"
          value={id}
          onChange={e => setId(e.target.value)}/>
          <button className="button" type="submit">Entrar</button>

          <Link to="/register" className="back-link">
            <FiLogIn size={16} color="#E02041" />
            Não tenho cadastro
          </Link>

        </form>

      </section>

      <img src={heroesImg} alt="Heroes"/>
    </div>
  );
}