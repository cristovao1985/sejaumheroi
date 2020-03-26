import React,{useEffect, useState} from 'react';
import logoImg  from '../../assets/logo.svg';
import './style.css';
import api from '../../services/api';

import {Link, useHistory} from 'react-router-dom';

import {FiPower, FiTrash2} from 'react-icons/fi';


export default function Ong(){
    const [casos, setCasos]=useState([]);
    const ongNome= localStorage.getItem('ongNome');
    let ongId=null;
    ongId= localStorage.getItem('ongId');
    const historico= useHistory();

    if(ongId==null)
    {
        alert('Voce precisa realizar o Login');
        historico.push('/');
    }
    

    useEffect(()=>{
        api.get('ong',{
            headers:{
                Authorization:ongId
            }
        }).then(response=>{
setCasos(response.data);
        })
    },[ongId]);

    async function deletarCaso(id){
        try{
            const response= await api.delete(`casos/${id}`,{
                headers:{
                    Authorization:ongId
                }
            });
            setCasos(casos.filter(caso=>caso.id !=id));
        }catch(erro){
            alert(`Erro ao tentar deletar caso. Erro: ${erro}`)
        }
    }

    function Logout(){
        localStorage.clear();
        historico.push('/');

    }
    return(
    <div className="ong-container">
        <header>
            <img src={logoImg} alt="Seja um Heroi"></img>
    <span>Bem vindo, {ongNome}</span>
            <Link className="button" to="/caso/criar">Cadastrar novo caso</Link>
            <button type="button" onClick={Logout}>
                <FiPower size={18} color color="#e02041"/>
            </button>
        </header>
        <h1>Casos cadastrados</h1>
        <ul>
        {casos.map(caso=>(
                   <li key={caso.id}>
                   <strong>Caso</strong>
        <p>{caso.titulo}</p>
   
                   <strong>Descrição</strong>
        <p>{caso.descricao}</p>
                   <strong>Valor</strong>
        <p>{Intl.NumberFormat('pt-BR', {style:'currency',currency:'BRL'}).format(caso.valor)}</p>
                   <button type="button" onClick={()=>deletarCaso(caso.id)}>
                       <FiTrash2 size={20} color="e02041"/>
                   </button>
               </li>
        ))}
        
        </ul>

    </div>)
}
