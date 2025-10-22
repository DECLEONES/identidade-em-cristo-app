// frontend/src/components/TelaEtapa.jsx
// VERSÃO ATUALIZADA - Inclui Revisão do Quiz (Melhoria 4)

import React, { useState, useEffect } from 'react';
import { DADOS_JORNADA } from '../dadosJornada';
import Quiz from './Quiz';
import QuizReview from './QuizReview'; // 1. Importa o novo componente
import ProgressBar from './ProgressBar';
import './TelaEtapa.css';

// Recebe a prop isSoundEnabled
function TelaEtapa({ numeroEtapa, nomeUsuario, aoConcluir, isSoundEnabled }) {
  // 2. Adiciona 'quiz-resultado' e 'quiz-revisao' às fases possíveis
  const [faseDaEtapa, setFaseDaEtapa] = useState('video'); // video, quiz, quiz-resultado, quiz-revisao, reflexao
  const [scoreDaEtapa, setScoreDaEtapa] = useState(0);
  const [textoDiario, setTextoDiario] = useState('');

  useEffect(() => {
    setFaseDaEtapa('video');
    setTextoDiario('');
  }, [numeroEtapa]);

  // 3. Atualiza handleQuizCompleto para ir para a tela de resultado
  const handleQuizCompleto = (scoreFinalDoQuiz) => {
    setScoreDaEtapa(scoreFinalDoQuiz);
    setFaseDaEtapa('quiz-resultado'); // <<< MUDANÇA AQUI
  };

  const dadosDaEtapa = DADOS_JORNADA.find(e => e.etapa === numeroEtapa);
  const totalEtapas = DADOS_JORNADA.length;

  if (!dadosDaEtapa) {
    console.error(`Dados não encontrados para a etapa ${numeroEtapa}! Verifique dadosJornada.js`);
    return <div>Etapa {numeroEtapa} não encontrada nos dados! Verifique dadosJornada.js</div>;
  }

  return (
    <div className="container-etapa">
      <div className="card-etapa">
        <ProgressBar etapaAtual={numeroEtapa} totalEtapas={totalEtapas} />
        <div className="header-etapa">
          <span>Olá, {nomeUsuario}</span>
        </div>

        {/* --- Renderização do VÍDEO (Mantido) --- */}
        {faseDaEtapa === 'video' && (
          <div className="conteudo-etapa">
            <h2 className="titulo-fase-etapa">
              {dadosDaEtapa?.tituloEtapa ?? `Etapa ${dadosDaEtapa.etapa}: Vídeo`}
            </h2>
            <div className="video-wrapper">
              {dadosDaEtapa.videoUrl && (dadosDaEtapa.videoUrl.includes('youtube.com') || dadosDaEtapa.videoUrl.includes('youtu.be')) ? (
                <div className="iframe-container">
                  <iframe
                    src={dadosDaEtapa.videoUrl}
                    title={`Vídeo da Etapa ${dadosDaEtapa.etapa}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                   ></iframe>
                </div>
              ) : dadosDaEtapa.videoUrl && !dadosDaEtapa.videoUrl.startsWith("COLOQUE_") ? (
                <video
                  id={`videoPlayer${dadosDaEtapa.etapa}`}
                  key={dadosDaEtapa.videoUrl}
                  controls
                  preload="metadata"
                  playsInline
                  poster={dadosDaEtapa.videoPoster}
                >
                  <source src={dadosDaEtapa.videoUrl} type="video/mp4" />
                  Seu navegador não suporta o elemento de vídeo.
                </video>
              ) : (
                 <div style={{ padding: '20px', textAlign: 'center', backgroundColor: '#eee', borderRadius: '8px' }}>
                    <p>Vídeo não disponível ou URL inválida para esta etapa.</p>
                    <p style={{fontSize: '0.8em', color: '#666'}}>Verifique a videoUrl em dadosJornada.js</p>
                 </div>
              )}
            </div>
            <button onClick={() => setFaseDaEtapa('quiz')} className="botao-avancar">
              Continuar
            </button>
          </div>
        )}

        {/* --- Renderização do QUIZ (Mantido) --- */}
        {faseDaEtapa === 'quiz' && (
          <div className="conteudo-etapa">
            <Quiz
              perguntas={dadosDaEtapa?.quiz ?? []}
              tituloEtapa={dadosDaEtapa?.tituloEtapa ?? `Quiz Etapa ${dadosDaEtapa.etapa}`}
              aoFinalizarQuiz={handleQuizCompleto}
              isSoundEnabled={isSoundEnabled}
            />
          </div>
        )}

        {/* --- 4. ADICIONADO: Renderização do RESULTADO DO QUIZ --- */}
        {faseDaEtapa === 'quiz-resultado' && (
          <div className="conteudo-etapa quiz-resultado-container">
            <h2 className="titulo-fase-etapa">Quiz da Etapa Concluído!</h2>
            <p className="resultado-pontuacao">
              Sua pontuação nesta etapa: <strong>{scoreDaEtapa}</strong>
            </p>
            <div className="resultado-botoes">
              <button onClick={() => setFaseDaEtapa('quiz-revisao')} className="botao-revisar">
                Revisar Respostas
              </button>
              <button onClick={() => setFaseDaEtapa('reflexao')} className="botao-avancar">
                Continuar para Reflexão
              </button>
            </div>
          </div>
        )}

        {/* --- 5. ADICIONADO: Renderização da REVISÃO DO QUIZ --- */}
        {faseDaEtapa === 'quiz-revisao' && (
            <div className="conteudo-etapa">
                <QuizReview 
                    perguntas={dadosDaEtapa.quiz}
                    tituloEtapa={dadosDaEtapa.tituloEtapa}
                    // O botão "Voltar" da revisão volta para a tela de resultado
                    onVoltar={() => setFaseDaEtapa('quiz-resultado')}
                />
            </div>
        )}

        {/* --- Renderização da REFLEXÃO (Mantido) --- */}
        {faseDaEtapa === 'reflexao' && (
          <div className="conteudo-etapa">
            <h2 className="titulo-fase-etapa">
              {dadosDaEtapa?.reflexaoTitulo ?? 'Momento de Reflexão'}
            </h2>
            <div className="reflexao-container">
              {dadosDaEtapa?.reflexaoTexto?.map((paragrafo, index) => (
                <p key={index} dangerouslySetInnerHTML={{ __html: paragrafo }}></p>
              ))}
              {dadosDaEtapa?.reflexaoCitacao && <p className="citation">{dadosDaEtapa.reflexaoCitacao}</p>}
              {dadosDaEtapa?.reflexaoReferencia && <p className="reference">{dadosDaEtapa.reflexaoReferencia}</p>}
            </div>
            <div className="diario-reflexao-container">
              <h3 className="diario-reflexao-titulo">Minha Reflexão Pessoal (Opcional):</h3>
              <textarea
                className="diario-reflexao-textarea"
                rows="4"
                placeholder="Anote aqui seus pensamentos sobre esta etapa..."
                value={textoDiario}
                onChange={(e) => setTextoDiario(e.target.value)}
              ></textarea>
            </div>
            <button onClick={() => aoConcluir(scoreDaEtapa)} className="botao-avancar">
              Concluir Etapa
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default TelaEtapa;

