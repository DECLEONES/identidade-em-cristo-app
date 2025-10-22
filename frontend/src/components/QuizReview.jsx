// frontend/src/components/QuizReview.jsx

import React from 'react';
import './QuizReview.css';

function QuizReview({ perguntas, tituloEtapa, onVoltar }) {
  return (
    <div className="quiz-review-container">
      <h2>Revisão: {tituloEtapa}</h2>
      <div className="questions-list">
        {perguntas.map((pergunta, index) => (
          <div key={index} className="review-question-box">
            <p className="review-question-text">{index + 1}. {pergunta.question}</p>
            <div className="review-options">
              {pergunta.options.map((opcao, idx) => (
                <div 
                  key={idx}
                  // Aplica a classe 'correct' apenas à resposta correta
                  className={`review-option ${idx === pergunta.answer ? 'correct' : ''}`}
                >
                  {opcao}
                </div>
              ))}
            </div>
            {pergunta.reference && <span className="review-citation">Referência: {pergunta.reference}</span>}
          </div>
        ))}
      </div>
      <button onClick={onVoltar} className="botao-voltar-review">
        Voltar
      </button>
    </div>
  );
}

export default QuizReview;