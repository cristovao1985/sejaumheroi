import React,{useState} from 'react';
import './style.css';
import {FiArrowLeft} from 'react-icons/fi';
import { Link, useHistory } from "react-router-dom";
import logoImg  from '../../assets/logo.svg';
import api from '../../services/api';

export default function Caso(){
    let ongId=null;
    ongId= localStorage.getItem('ongId');
    const historico= useHistory();
    const [titulo, setTitulo]=useState('');
    const [descricao, setDescricao]=useState('');
    const [valor, setValor]=useState('');

    const data={
        titulo,
        descricao,
        valor
    }
    async function addCaso(e){

        e.preventDefault();
        try{

            await api.post('casos',data,{
                headers:{
                    Authorization:ongId
                }
            });
            historico.push('/ong');

        }catch(erro){
            alert(`Houve um erro ao tentar cadastrar caso. Erro: ${erro}`);
        }

        
    }

    return(<div className="caso-container">
    <div className="content">
        <section>
            <img src={logoImg} alt="Seja um Heroi"></img>
            <h1>Registro gratuito</h1>
            <p>Descreva seu caso, assim mais heróis poderão ajudar.</p>
            <Link className="back-link" to="/ong">
              <FiArrowLeft size={16} color="#E02041"  />
              Voltar
          </Link>
        </section>
        <form onSubmit={addCaso}>
                <input  type="text" placeholder="Título do caso" 
                value={titulo}
                onChange={e=>setTitulo(e.target.value)}
                />
                <textarea   placeholder="Descrição" 
                value={descricao}
                onChange={e=>setDescricao(e.target.value)}
                />
                <input  placeholder="Valor em R$" 
                value={valor}
                onChange={e=>setValor(e.target.value)}
                />
           
                <button className="button">Cadastrar</button>
        </form>
    </div>
</div>)
}