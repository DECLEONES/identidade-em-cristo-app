arquivo App.jsx: // frontend/src/App.jsx
// VERSÃO ATUALIZADA - Inclui Tela de Instruções

import React, { useState, useEffect, useRef } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './App.css'; 

import TelaInicial from './components/TelaInicial';
import TelaInstrucoes from './components/TelaInstrucoes'; // <<< 1. IMPORTA A NOVA TELA
import TelaEtapa from './components/TelaEtapa';
import TelaDeclaracao from './components/TelaDeclaracao';
import TelaParabens from './components/TelaParabens'; 
import TelaConclusao from './components/TelaConclusao';
import TelaCarta from './components/TelaCarta';
import TelaCarteira from './components/TelaCarteira';

function App() {
  // --- Estados do App (existentes) ---
  const [nomeUsuario, setNomeUsuario] = useState('');
  // <<< 2. ADICIONA 'instrucoes' AO FLUXO >>>
  const [tela, setTela] = useState('inicial'); // inicial, instrucoes, etapa, declaracao, parabens, conclusao, carta, carteira
  const [etapa, setEtapa] = useState(1);
  const [totalScore, setTotalScore] = useState(0);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);

  // --- Estados do Player de Música (Mantidos) ---
  const [soundcloudWidget, setSoundcloudWidget] = useState(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const playerRef = useRef(null); 

  // --- Lógica de Inicialização do Player (Mantida) ---
  useEffect(() => {
    if (playerRef.current && window.SC) {
      const widget = window.SC.Widget(playerRef.current);
      setSoundcloudWidget(widget);
      widget.bind(window.SC.Widget.Events.PLAY, () => setIsMusicPlaying(true));
      widget.bind(window.SC.Widget.Events.PAUSE, () => setIsMusicPlaying(false));
      return () => {
        widget.unbind(window.SC.Widget.Events.PLAY);
        widget.unbind(window.SC.Widget.Events.PAUSE);
      };
    }
  }, []); 

  // --- Funções de Navegação (ATUALIZADAS) ---
  
  // 3. Modifica iniciarJornada para ir para 'instrucoes'
  const iniciarJornada = (nome) => {
    setNomeUsuario(nome);
    setTela('instrucoes'); // VAI PARA INSTRUÇÕES PRIMEIRO
    // Não reseta o score nem toca música ainda
  };

  // 4. NOVA FUNÇÃO para confirmar instruções e começar
  const confirmarInstrucoes = () => {
    setTela('etapa'); // Define a tela para a primeira etapa
    setEtapa(1); // Garante que a etapa é a 1
    setTotalScore(0); // Reseta o score
    // Toca a música AGORA
    if (soundcloudWidget) {
      soundcloudWidget.play();
    }
  };

  const reiniciarJornada = () => {
    setTela('inicial');
    if (soundcloudWidget) {
      soundcloudWidget.pause();
    }
  };
  
  const handleToggleMusic = () => {
      if (soundcloudWidget) {
          soundcloudWidget.toggle();
      }
  };

  // ... (outras funções mantidas) ...
  const avancarEtapa = (scoreDaEtapa = 0) => { setTotalScore(prev => Number(prev) + Number(scoreDaEtapa)); if (etapa < 6) { setEtapa(etapa + 1); } else { setTela('declaracao'); } };
  const finalizarDeclaracao = () => setTela('parabens');
  const mostrarTelaConclusao = () => setTela('conclusao');
  const toggleSound = () => setIsSoundEnabled(prevState => !prevState);
  const mostrarCarta = () => setTela('carta');
  const mostrarCarteira = () => setTela('carteira');
  const voltarParaConclusao = () => setTela('conclusao'); 
  
  // 5. Adiciona TelaInstrucoes ao mapeamento
  const telas = {
    inicial: <TelaInicial aoIniciar={iniciarJornada} />,
    instrucoes: <TelaInstrucoes nomeUsuario={nomeUsuario} onConfirmar={confirmarInstrucoes} />, // <<< TELA NOVA AQUI
    etapa: <TelaEtapa numeroEtapa={etapa} nomeUsuario={nomeUsuario} aoConcluir={avancarEtapa} isSoundEnabled={isSoundEnabled} />,
    declaracao: <TelaDeclaracao aoFinalizar={finalizarDeclaracao} />,
    parabens: <TelaParabens nomeUsuario={nomeUsuario} totalScore={totalScore} onAvancar={mostrarTelaConclusao} />,
    conclusao: <TelaConclusao nomeUsuario={nomeUsuario} totalScore={totalScore} onVerCarta={mostrarCarta} onVerCarteira={mostrarCarteira} onReiniciar={reiniciarJornada} />,
    carta: <TelaCarta nomeUsuario={nomeUsuario} onVoltar={voltarParaConclusao} />,
    carteira: <TelaCarteira nomeUsuario={nomeUsuario} onVoltar={voltarParaConclusao} />
  };

  const nodeRef = useRef(null);
  
  const soundcloudUrl = "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2123017683&color=%2356cef4&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true";

  return (
    <div className="app-container" style={{paddingTop: '0', paddingBottom: '0'}}>

      {/* Player do SoundCloud (Mantido) */}
      <iframe
        ref={playerRef}
        src={soundcloudUrl}
        title="SoundCloud Player Global"
        style={{ display: 'none' }}
        width="100%" height="166" scrolling="no" frameBorder="no" allow="autoplay"
      ></iframe>

      {/* Logo e Botões de Controle (Mantidos) */}
      <div id="logo-container" style={{ width: '100%', textAlign: 'center', margin: '20px 0' }}>
          <img src="https://i.postimg.cc/7LVcT2cb/com-a-mocidade.png" alt="Logo Decleones Andrade" style={{ maxWidth: '600px', height: 'auto', width: '50%', margin: '0 auto' }}/>
      </div>

      {/* Botões de Controle (Mantidos) */}
      {tela !== 'inicial' && (
        <>
          <button onClick={toggleSound} className="sound-toggle-button">
            {isSoundEnabled ? '🔊 Efeitos Ligados' : '🔇 Efeitos Desligados'}
          </button>
          <button onClick={handleToggleMusic} className="music-toggle-button">
            {isMusicPlaying ? '❚❚ Pausar Música' : '▶ Tocar Música'}
          </button>
        </>
      )}

      {/* Animação e Renderização das Telas (Mantida) */}
      <TransitionGroup className="screen-transition-group">
        <CSSTransition
          key={tela} 
          nodeRef={nodeRef} 
          timeout={400}
          classNames="screen-fade"
          unmountOnExit 
        >
          <div ref={nodeRef} className="transition-wrapper">
            {telas[tela]} 
          </div>
        </CSSTransition>
      </TransitionGroup>

      {/* Footer (Mantido) */}
      {tela !== 'inicial' && ( 
          <footer className="app-footer">
              <p>&copy; {new Date().getFullYear()} Minha Identidade em Cristo - Estudo Bíblico | Desenvolvido por Decleones Andrade.</p>
          </footer>
       )}

    </div> 
  ); 
} 

export default App;