// frontend/src/components/TelaInicial.jsx
// VERSÃO ATUALIZADA - Player do SoundCloud removido (Passo 2)

import React, { useState, useEffect } from 'react';
import './TelaInicial.css';

function TelaInicial({ aoIniciar }) {
  const [nome, setNome] = useState('');
  const [isBotaoHabilitado, setIsBotaoHabilitado] = useState(false);

  useEffect(() => {
    setIsBotaoHabilitado(nome.trim() !== '');
  }, [nome]);

  const handleIniciar = () => {
    if (isBotaoHabilitado) {
      aoIniciar(nome.trim());
    }
  };

  // <<< URL do SoundCloud, <iframe> e <p> da música foram removidos >>>

  return (
    <div className="container-inicial-fiel">
      <img
        src="https://i.postimg.cc/MptXPsfD/Logotipo-confeitaria-bolos-delicado-rosa-20250728-154942-0000.png"
        alt="Logo Bem-vindo"
        className="welcome-image-fiel"
      />
      <h1>Bem-vindo à Jornada!</h1>
      <p className="subtitle">Descubra o que a Bíblia diz sobre sua verdadeira identidade em Cristo.</p>
      <input
        type="text"
        id="userNameInput"
        placeholder="Digite seu nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
      <button
        id="startButton"
        disabled={!isBotaoHabilitado}
        onClick={handleIniciar}
      >
        Iniciar a Jornada
      </button>
      {/* O player do SoundCloud e a nota foram removidos daqui */}
    </div>
  );
}

export default TelaInicial;