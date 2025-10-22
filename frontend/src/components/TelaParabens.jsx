// frontend/src/components/TelaParabens.jsx

import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import './TelaParabens.css'; // Criaremos este CSS

function TelaParabens({ nomeUsuario, totalScore, onAvancar }) {
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  // Inicia confete e ajusta tamanho da janela
  useEffect(() => {
    setShowConfetti(true);
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);

    // Para confete após 5 segundos
    const timer = setTimeout(() => setShowConfetti(false), 5000); 

    // Limpeza ao desmontar
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, []); // Executa só uma vez ao montar

  // Versículo motivador (2 Coríntios 5:17)
  const versiculo = "\"Portanto, se alguém está em Cristo, é nova criação. As coisas antigas já passaram; eis que surgiram coisas novas!\"";
  const referencia = "2 Coríntios 5:17";

  return (
    <div className="container-parabens-fiel">
      {/* Confetes */}
      {showConfetti && <Confetti width={windowSize.width} height={windowSize.height} recycle={false} numberOfPieces={300} />}
      
      <div className="card-parabens-fiel">
        <span className="emoji-celebracao">✨🏆✨</span>
        <h1>Parabéns, {nomeUsuario}!</h1>
        <p className="mensagem-principal">
          Você concluiu a Jornada da Identidade com sucesso! Sua pontuação final é <strong>{totalScore}</strong> pontos!
        </p>
        <div className="versiculo-container">
          <p className="versiculo-texto">{versiculo}</p>
          <p className="versiculo-referencia">{referencia}</p>
        </div>
        <p className="mensagem-final">
          Continue firme nessa verdade. Agora você pode receber suas recompensas!
        </p>
        <button onClick={onAvancar} className="botao-ver-recompensas">
          Ver Minhas Recompensas
        </button>
      </div>
    </div>
  );
}

export default TelaParabens;