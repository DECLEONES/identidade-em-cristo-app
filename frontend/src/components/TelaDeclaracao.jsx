// frontend/src/components/TelaDeclaracao.jsx
// Baseado no #declarationScreen do ID_OFICIAL.html

import React, { useState, useEffect } from 'react';
import './TelaDeclaracao.css';

const declaracoesIniciais = [
  { id: 1, texto: "Eu sou amado!", declarado: false },
  { id: 2, texto: "Eu sou perdoado!", declarado: false },
  { id: 3, texto: "Eu sou valioso!", declarado: false },
  { id: 4, texto: "Eu sou livre!", declarado: false },
  { id: 5, texto: "Eu sou escolhido!", declarado: false },
  { id: 6, texto: "Eu sou filho(a) de Deus!", declarado: false },
];

function TelaDeclaracao({ aoFinalizar }) {
  const [declaracoes, setDeclaracoes] = useState(declaracoesIniciais);
  const [todasDeclaradas, setTodasDeclaradas] = useState(false);

  const handleDeclare = (id) => {
    setDeclaracoes(prevDeclaracoes => 
      prevDeclaracoes.map(d => 
        d.id === id ? { ...d, declarado: true } : d
      )
    );
  };

  // Verifica se todas foram declaradas
  useEffect(() => {
    const checkTodasDeclaradas = declaracoes.every(d => d.declarado);
    setTodasDeclaradas(checkTodasDeclaradas);
  }, [declaracoes]);

  return (
    <div className="container-declaracao-fiel"> {/* Nova classe base */}
      <h2>Vamos Declarar a Verdade!</h2>
      <p>Clique em cada card para fazer a declaração e reafirmar sua identidade em Cristo.</p>
      
      <div className="declaration-grid-fiel">
        {declaracoes.map(dec => (
          <div 
            key={dec.id}
            className={`declaration-card-fiel ${dec.declarado ? 'declared' : ''}`}
            onClick={() => !dec.declarado && handleDeclare(dec.id)} // Só permite clicar se não declarado
          >
            {dec.texto}
          </div>
        ))}
      </div>

      {/* Botão Finalizar só aparece quando todas foram declaradas */}
      <button 
        onClick={aoFinalizar} 
        id="declarationNextBtn" 
        className={!todasDeclaradas ? 'hidden-fiel' : ''}
      >
        Finalizar
      </button>
    </div>
  );
}

export default TelaDeclaracao;