// frontend/src/components/TelaInicial.jsx
// VERSÃO ATUALIZADA - Adiciona props de 'loading' e 'error' para integração com o backend

import React, { useState, useEffect } from 'react';
import './TelaInicial.css';

// NOVO: Recebe as props 'loading' e 'error'
function TelaInicial({ aoIniciar, loading, error }) {
  const [nome, setNome] = useState('');
  // O estado 'isBotaoHabilitado' agora deve considerar o 'loading'
  const [isBotaoHabilitado, setIsBotaoHabilitado] = useState(false);

  // Atualiza a validação: nome deve ser válido E o aplicativo não deve estar carregando
  useEffect(() => {
    setIsBotaoHabilitado(nome.trim() !== '' && !loading);
  }, [nome, loading]); // Depende do nome e do estado de loading

  const handleIniciar = () => {
    if (isBotaoHabilitado) {
      // aoIniciar já é assíncrona no App.jsx e lida com o estado 'loading'
      aoIniciar(nome.trim());
    }
  };

  return (
    <div className="container-inicial-fiel">
      <img
        src="https://i.postimg.cc/MptXPsfD/Logotipo-confeitaria-bolos-delicado-rosa-20250728-154942-0000.png"
        alt="Logo Bem-vindo"
        className="welcome-image-fiel"
      />
      <h1>Bem-vindo à Jornada!</h1>
      <p className="subtitle">Descubra o que a Bíblia diz sobre sua verdadeira identidade em Cristo.</p>
      
      {/* NOVO: Exibir mensagem de erro da API */}
      {error && (
        <p style={{ color: 'red', fontWeight: 'bold', margin: '15px 0' }}>
          {error}
        </p>
      )}

      <input
        type="text"
        id="userNameInput"
        placeholder="Digite seu nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        disabled={loading} // Desabilita o input durante o carregamento
      />
      <button
        id="startButton"
        // Desabilita se o nome for vazio OU se estiver carregando
        disabled={!isBotaoHabilitado || loading}
        onClick={handleIniciar}
      >
        {/* NOVO: Exibe texto de loading quando a chamada de API está ativa */}
        {loading ? 'Iniciando Jornada...' : 'Iniciar a Jornada'}
      </button>
    </div>
  );
}

export default TelaInicial;
