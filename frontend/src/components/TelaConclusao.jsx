// frontend/src/components/TelaConclusao.jsx

import React from 'react';
import './TelaConclusao.css';

// 1. Receba onReiniciar
function TelaConclusao({ nomeUsuario, totalScore, onVerCarta, onVerCarteira, onReiniciar }) {
  return (
    <div className="container-conclusao">
      <div className="card-conclusao">
        {/* ... (conteúdo existente) ... */}
        
        <div className="botoes-recompensa">
          <button onClick={onVerCarta} className="botao-recompensa">
            Receber Carta de Alforria
          </button>
          <button onClick={onVerCarteira} className="botao-recompensa">
            Receber Carteira de Identidade
          </button>
          {/* 2. Adicione o botão Reiniciar */}
          <button onClick={onReiniciar} className="botao-reiniciar">
            Recomeçar a Jornada
          </button>
        </div>
      </div>
    </div>
  );
}

export default TelaConclusao;