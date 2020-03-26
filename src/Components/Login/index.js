import React,{useState} from 'react'
import './style.css'; 
import {Link, useHistory} from 'react-router-dom';
import api from '../../services/api';

import heroesImg from '../../assets/heroes.png';
import logoImg  from '../../assets/logo.svg';
import { FiLogIn } from "react-icons/fi";

export default function Login(){
    const[id, setID]=useState('');
const historico= useHistory();

    async function Logon(e){
        e.preventDefault();
        try{
            const response= await api.post('login', {id});
            console.log(response)
            localStorage.setItem('ongId',id);
            localStorage.setItem('ongNome',response.data.nome);
            historico.push('/ong');
        }catch(erro){
            alert(`Erro ao tentar fazer login. Erro: ${erro}`);
        }
    }

   

    return(<div className="login-container">
        <section className="form">
            <img src={logoImg} alt="Seja um Heroi"></img>
    
            <form onSubmit={Logon}>
                <h1>Faça seu Login</h1>
                <input placeholder="Digite sua ID" 
                value={id}
                onChange={e=>setID(e.target.value)}
                />
              <button type="submit" className="button">Entrar</button>
              <Link className="back-link" to="/registro">
                  <FiLogIn size={16} color="#E02041"  />
                  Quero me registrar
              </Link>
            </form>
        </section>
        <img src={heroesImg} alt="Herois"></img>
    </div>);
}