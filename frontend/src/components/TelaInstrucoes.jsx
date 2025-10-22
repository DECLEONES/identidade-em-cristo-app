// frontend/src/components/TelaInstrucoes.jsx

import React from 'react';
import './TelaInstrucoes.css'; // Criaremos este CSS

// Recebe o nome do usuário e a função para confirmar e iniciar a Etapa 1
function TelaInstrucoes({ nomeUsuario, onConfirmar }) {
  return (
    <div className="container-instrucoes-fiel">
      <div className="card-instrucoes-fiel">
        <span className="emoji-instrucao">🧭</span>
        <h1>Instruções do Estudo</h1>
        <p className="saudacao-instrucoes">Olá, <strong>{nomeUsuario}</strong>! Prepare-se para uma jornada incrível.</p>
        
        <div className="instrucoes-texto">
          <p><strong>Como funciona:</strong></p>
          <ul>
            <li>✨ Cada etapa começa com um <strong>vídeo</strong> inspirador. Assista com atenção!</li>
            <li>🧠 Em seguida, você responderá a um <strong>Quiz</strong> para testar seu aprendizado. Cada acerto vale pontos!</li>
            <li>🧘‍♂️ Após o Quiz, haverá um momento de <strong>Reflexão</strong> para aprofundar a verdade aprendida. Você pode anotar seus pensamentos (opcional).</li>
            <li>🏆 Ao final das 6 etapas, você receberá suas <strong>recompensas</strong>: A Carta de Alforria e a Carteira de Identidade Espiritual!</li>
          </ul>
          <p><strong>Dica:</strong> Use os botões de controle no canto inferior direito para ligar/desligar os efeitos sonoros ou a música ambiente.</p>
        </div>

        <button onClick={onConfirmar} className="botao-iniciar-etapa1">
          Entendido, Começar a Jornada!
        </button>
      </div>
    </div>
  );
}

export default TelaInstrucoes;
