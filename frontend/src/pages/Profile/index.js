import React, { useState, useEffect } from 'react';
//useEffect faz algo em algum momento da aplicacao
import logoImg from '../../assets/logo.svg';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import './styles.css';

import api from '../../services/api';

export default function Profile() {
  const [incidents, setIncidents] = useState([]);
  // vamos mostrar o nome da ong logada buscando pelo que está no login
  const ongId = localStorage.getItem('ongId');
  const ongName = localStorage.getItem('ongName');

  const history = useHistory();

  async function handleDeleteIncident(id) {
    try {
      await api.delete(`incidents/${id}`, {
        headers: {
          Authorization: ongId,
        }
      });

      setIncidents(incidents.filter(incident => incident.id !== id));
    } catch (err) {
      alert('Erro ao deletar incidente. Tente novamente')
    }

  }

  function handleLogout() {
    localStorage.clear();

    history.push('/')
  }

  // 2 params, o que e quando
  // useEffect(() => {}, [])
  // [ARRAY DE DEPENDENCIAS] >> sempre que o que estiver aqui mudar, 
  // ele vai executar o que está em () => {}
  // se vazio, apenas 1 vez, quando carrega

  useEffect(() => {
    api.get('/profile', {
      headers: {
        Authorization: ongId,
      }
    }).then(response => {
      setIncidents(response.data);
    })
  }, [ongId])

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be the Hero Logo" />
        <span> Bem vinda, {ongName} </span>
        <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
        <button onClick={handleLogout} type="button">
          <FiPower size={18} color="#e02041"></FiPower>
        </button>
      </header>

      <h1>Casos Cadastrados</h1>

      <ul>
        {incidents.map(incident => (
          <li key={incident.id}>
            <strong>CASO: </strong>
            <p>{incident.title}</p>

            <strong>DESCRIÇÃO: </strong>
            <p>{incident.description}</p>

            <strong>VALOR: </strong>
            <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(incident.value)}</p>

            <button onClick={() => handleDeleteIncident(incident.id)} type="button">
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
          </li>
        ))}
      </ul>

    </div>
  );
}