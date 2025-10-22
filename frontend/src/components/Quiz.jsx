// frontend/src/components/Quiz.jsx
// VERSÃO FINAL CORRIGIDA - Layout e Pontos OK + Sons Locais OK

import React, { useState, useEffect, useRef } from 'react';
import './Quiz.css';

// --- SOUND SETUP ---
// !!! EDITE OS NOMES DOS ARQUIVOS ABAIXO para corresponder aos seus arquivos na pasta /public !!!
const somAcertoUrl = '/som-acerto.mp3'; // <<< EDITE AQUI SE NECESSÁRIO
const somErroUrl = '/som-erro.mp3';   // <<< EDITE AQUI SE NECESSÁRIO

// Preload audio elements
const audioAcerto = typeof Audio !== "undefined" ? new Audio(somAcertoUrl) : null;
const audioErro = typeof Audio !== "undefined" ? new Audio(somErroUrl) : null;
// --- END SOUND SETUP ---


const getRandomColor = () => {
  const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722', '#795548', '#9e9e9e', '#607d8b'];
  return colors[Math.floor(Math.random() * colors.length)];
};

// <<< Recebe a prop isSoundEnabled >>>
function Quiz({ perguntas, tituloEtapa, aoFinalizarQuiz, isSoundEnabled }) {
  // --- Estados (Mantidos da sua versão funcional) ---
  const [perguntaAtualIdx, setPerguntaAtualIdx] = useState(0);
  const [scoreQuiz, setScoreQuiz] = useState(0);
  const [selectedOptionIdx, setSelectedOptionIdx] = useState(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [currentAttempts, setCurrentAttempts] = useState(0);
  const [showFeedbackOverlay, setShowFeedbackOverlay] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [feedbackColor, setFeedbackColor] = useState('');
  const [shakeQuizBox, setShakeQuizBox] = useState(false);
  const [confettiPieces, setConfettiPieces] = useState([]);
  const quizBoxRef = useRef(null);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [correctAnswerIndexShuffled, setCorrectAnswerIndexShuffled] = useState(null);
  // --- Fim dos Estados ---

  useEffect(() => {
    // Lógica de embaralhar (Mantida da sua versão funcional)
    if (perguntas && perguntas.length > perguntaAtualIdx) {
      const q = perguntas[perguntaAtualIdx];
       if (q && Array.isArray(q.options) && q.options.length > q.answer) {
           const correctAnswerText = q.options[q.answer];
           const optionsCopy = [...q.options];
           // Embaralhamento
           for (let i = optionsCopy.length - 1; i > 0; i--) {
             const j = Math.floor(Math.random() * (i + 1));
             [optionsCopy[i], optionsCopy[j]] = [optionsCopy[j], optionsCopy[i]];
           }
           setShuffledOptions(optionsCopy);
           setCorrectAnswerIndexShuffled(optionsCopy.indexOf(correctAnswerText));
       } else {
           console.error("Dados da pergunta inválidos ou faltando opções:", q);
           setShuffledOptions([]);
           setCorrectAnswerIndexShuffled(null);
       }
    } else {
        // Caso onde perguntas não está pronto ou index está fora
        setShuffledOptions([]);
        setCorrectAnswerIndexShuffled(null);
    }
    // Resetar estados visuais ao mudar pergunta
    setSelectedOptionIdx(null);
    setIsAnswerChecked(false);
    setIsCorrect(null);
    setCurrentAttempts(0); // Reinicia tentativas para nova pergunta
    setShowFeedbackOverlay(false); // Esconde overlay
    setConfettiPieces([]); // Limpa confetes
    setShakeQuizBox(false); // Para shake

  }, [perguntas, perguntaAtualIdx]); // Dependências corretas


  // <<< Adicionado: Função para tocar som >>>
  const tocarSom = (audioElement) => {
    if (isSoundEnabled && audioElement) {
      audioElement.currentTime = 0;
      audioElement.play().catch(error => console.error("Erro ao tocar áudio:", error));
    }
  };


  const handleCheckAnswer = () => {
    // Lógica de checar resposta (Mantida da sua versão funcional + Sons)
    if (selectedOptionIdx === null || isAnswerChecked) return;

    const attemptNumber = currentAttempts + 1;
    setCurrentAttempts(attemptNumber);
    const correct = selectedOptionIdx === correctAnswerIndexShuffled;

    setIsCorrect(correct);
    setIsAnswerChecked(true); // Bloqueia novas respostas *imediatamente*

    if (correct) {
      // Lógica de PONTOS (Mantida da sua versão funcional)
      let points = 0;
      switch (attemptNumber) {
        case 1: points = 100; break;
        case 2: points = 75; break;
        case 3: points = 50; break;
        default: points = 25;
      }
      setScoreQuiz(prevScore => prevScore + points); // Atualiza score
      // Feedback visual + Confete + SOM
      setFeedbackMessage(`Correto! +${points} pontos`);
      setFeedbackColor('correct');
      celebrate();
      tocarSom(audioAcerto); // <<< SOM ACERTO >>>
    } else {
      // Feedback visual + Shake + SOM
      setFeedbackMessage(`Incorreto. Tentativa ${attemptNumber} de 4.`);
      setFeedbackColor('incorrect');
      shakeEffect();
      tocarSom(audioErro); // <<< SOM ERRO >>>

      // Lógica para permitir nova tentativa (Mantida da sua versão funcional)
      if (attemptNumber < 4) {
         setTimeout(() => {
             setIsAnswerChecked(false); // Permite clicar novamente após delay
             // Não reseta selectedOptionIdx ou isCorrect para feedback visual
         }, 500); // Meio segundo para ver o erro
      }
      // Se for a última tentativa (>=4), não faz nada aqui,
      // o botão "Próxima" aparecerá e getOptionClass mostrará a correta.
    }

    // Mostra o overlay de feedback
    setShowFeedbackOverlay(true);
    setTimeout(() => setShowFeedbackOverlay(false), 2500);
  };


  const handleProceed = () => {
    // Lógica para ir para próxima pergunta ou finalizar (Mantida da sua versão funcional)
    setShakeQuizBox(false);
    const nextIdx = perguntaAtualIdx + 1;
    if (nextIdx < perguntas.length) {
      setPerguntaAtualIdx(nextIdx); // A mudança aqui dispara o useEffect para resetar
    } else {
      aoFinalizarQuiz(scoreQuiz);
    }
  };


  const shakeEffect = () => {
  setShakeQuizBox(true); // Ativa a classe CSS 'shake-fiel'
  // Remove a classe após a animação (500ms, igual à duração da animação no CSS)
  setTimeout(() => setShakeQuizBox(false), 500); 
};
  const celebrate = () => {
    // Garante que o estado dos confetes seja resetado antes de adicionar novos
    setConfettiPieces([]); 

    const newConfetti = [];
    for (let i = 0; i < 100; i++) { 
      newConfetti.push({
        id: Math.random(),
        style: {
          left: `${Math.random() * 100}%`, 
          backgroundColor: getRandomColor(),
          animationDuration: `${Math.random() * 2 + 3}s`, 
          animationDelay: `${Math.random() * 0.5}s`,
        },
      });
    }
    setConfettiPieces(newConfetti);
    // Remove os confetes após um tempo suficiente para a animação
    setTimeout(() => setConfettiPieces([]), 5500); // 5.5 segundos
  };

  const getOptionClass = (index) => {
    // Lógica de classes CSS (Mantida da sua versão funcional)
      let className = 'option-label-fiel';
      if (isAnswerChecked) {
          if ((isCorrect || currentAttempts >= 4) && index === correctAnswerIndexShuffled) { className += ' correct-fiel'; }
          else if (index === selectedOptionIdx && !isCorrect) { className += ' incorrect-fiel'; }
          if (isCorrect || currentAttempts >= 4) { className += ' disabled'; }
           else if (index === selectedOptionIdx && !isCorrect && currentAttempts < 4) { className += ' disabled'; } // Desabilita só a errada clicada
      }
      else {
          if (index === selectedOptionIdx) { className += ' selected-fiel'; }
      }
      return className;
  };


  const isInputDisabled = (index) => {
    // Lógica para desabilitar input radio (Mantida da sua versão funcional)
      if (isAnswerChecked && (isCorrect || currentAttempts >= 4)) { return true; } // Desabilita tudo no final
       if (isAnswerChecked && !isCorrect && currentAttempts < 4 && index === selectedOptionIdx) { return true; } // Desabilita a incorreta clicada para nova tentativa
      return false; // Habilitado por padrão ou se ainda não checado
  };


  const currentQuestionData = perguntas[perguntaAtualIdx];
  // Verificação mais robusta ANTES de tentar renderizar
  if (!currentQuestionData || !Array.isArray(shuffledOptions) || shuffledOptions.length === 0) {
      console.warn("Quiz.jsx: Aguardando dados da pergunta ou opções embaralhadas...");
      return <div>Carregando Quiz...</div>; // Exibe mensagem de carregamento
  }


  // --- ESTRUTURA JSX VISUAL (Mantida da sua versão funcional) ---
  return (
    <div className="quiz-container-fiel" ref={quizBoxRef}>
      {/* Overlay */}
      <div className={`celebration-overlay-fiel ${showFeedbackOverlay ? 'visible' : ''}`}>
        {feedbackMessage && (<div className={`celebration-message-fiel ${feedbackColor}`}>{feedbackMessage}</div>)}
        {confettiPieces.map(confetti => (<div key={confetti.id} className="confetti-fiel" style={confetti.style}></div>))}
      </div>

      {/* Título */}
      <h2>{tituloEtapa || `Quiz Etapa ${perguntaAtualIdx + 1}`}</h2> {/* Título Padrão Melhorado */}

      {/* Caixa da Pergunta */}
      <div className={`question-box-fiel ${shakeQuizBox ? 'shake-fiel' : ''}`}>
        <p className="question-text-fiel">{perguntaAtualIdx + 1}. {currentQuestionData.question}</p>

        {/* Formulário com Opções */}
        <form id={`quizForm${perguntaAtualIdx}`}>
          {shuffledOptions.map((option, index) => (
            <label key={index} className={getOptionClass(index)}>
              <input
                type="radio"
                name={`option-${perguntaAtualIdx}`}
                value={index}
                checked={selectedOptionIdx === index}
                onChange={() => !isAnswerChecked && setSelectedOptionIdx(index)} // Permite mudar SÓ se não checado
                disabled={isInputDisabled(index)} // Desabilita corretamente
              />
              {option}
            </label>
          ))}
        </form>
        {/* Referência */}
        {currentQuestionData.reference && <span className="citation-fiel">Referência: {currentQuestionData.reference}</span>}
      </div>

      {/* Pontuação */}
      <div className="score-container-fiel">
        Pontuação: {scoreQuiz}
      </div>

      {/* Navegação */}
      <div className="quiz-navigation-fiel">
        {/* Botão Responder */}
        {!isAnswerChecked && (
          <button onClick={handleCheckAnswer} disabled={selectedOptionIdx === null}>
            Responder
          </button>
        )}
        {/* Botão Próxima/Finalizar */}
        {isAnswerChecked && (isCorrect || currentAttempts >= 4) && (
          <button onClick={handleProceed}>
            {/* Verifica se é a ÚLTIMA pergunta do array */}
            {perguntaAtualIdx === (perguntas.length - 1) ? 'Finalizar Quiz' : 'Próxima'}
          </button>
        )}
      </div>
    </div>
  );
  // --- FIM DO JSX ---
}

export default Quiz;