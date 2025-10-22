// frontend/src/components/ProgressBar.jsx

import React from 'react';
import './ProgressBar.css'; // Criaremos este CSS

function ProgressBar({ etapaAtual, totalEtapas }) {
  const progressoPercentual = (etapaAtual / totalEtapas) * 100;

  return (
    <div className="progress-bar-container">
      <div className="progress-bar-texto">
        Etapa {etapaAtual} de {totalEtapas}
      </div>
      <div className="progress-bar-fundo">
        <div 
          className="progress-bar-preenchimento" 
          style={{ width: `${progressoPercentual}%` }}
        ></div>
      </div>
    </div>
  );
}

export default ProgressBar;