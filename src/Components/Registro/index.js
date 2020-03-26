import React,{useState} from 'react'
import './style.css'; 
import { Link, useHistory } from "react-router-dom";
import {FiArrowLeft} from 'react-icons/fi';
import api from '../../services/api';



import logoImg  from '../../assets/logo.svg';


export default function Registro(){
    const [nome, setNome]= useState('');
    const [email, setEmail]= useState('');
    const [whatsapp, setWhatsApp]= useState('');
    const [cidade,setCidade]= useState('');
    const [uf, setUf]= useState('');

    const historico= useHistory();

    async function addOng(e){
        e.preventDefault();
        const data={
            nome, 
            email,
            whatsapp,
            cidade,
            uf
        };

        try {
            const response= await  api.post('ongs', data);
            alert(`Registro realizado com sucesso, seu ID de acesso é: ${response.data.id} `);
            historico.push('/')
        }catch(erro){
        alert(`Houver um erro ao tentar realizar registro. Erro ${erro}`);
        }
      


    }
return(
    <div className="registro-container">
        <div className="content">
            <section>
                <img src={logoImg} alt="Seja um Heroi"></img>
                <h1>Registro gratuito</h1>
                <p>Faça seu registro na plataforma para ajudar pessoas a encotrar sua ONG.</p>
                <Link className="back-link" to="/">
                  <FiArrowLeft size={16} color="#E02041"  />
                  Voltar
              </Link>
            </section>
            <form onSubmit={addOng}>
                    <input  type="text" placeholder="Digite o nome da ONG" 
                    value={nome}
                    onChange={e=>setNome(e.target.value)}
                    />
                    <input  type="email" placeholder="Digite o E-mail da ONG" 
                       value={email}
                       onChange={e=>setEmail(e.target.value)}/>
                    <input  placeholder="Whatsapp" 
                       value={whatsapp}
                       onChange={e=>setWhatsApp(e.target.value)}
                    />
                    <div className="input-group">
                    <input  placeholder="Cidade" 
                       value={cidade}
                       onChange={e=>setCidade(e.target.value)}
                    />
                    <input   placeholder="UF" style={{width:80}} 
                       value={uf}
                       onChange={e=>setUf(e.target.value)}
                    />
                    
                    </div>
                    <button className="button">Registrar</button>
            </form>
        </div>
    </div>
);
}