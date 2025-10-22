// frontend/src/App.jsx
// VERSÃO ATUALIZADA - Inclui Tela de Instruções e Integração Backend

import React, { useState, useEffect, useRef, useCallback } from 'react'; // NOVO: Adicionado useCallback
import axios from 'axios'; // NOVO: Importação do Axios para comunicação com o backend
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

// NOVO: Variável de ambiente para o Backend URL
const API_URL = import.meta.env.VITE_BACKEND_URL;

function App() {
  // --- Estados do App (existentes) ---
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [tela, setTela] = useState('inicial'); // inicial, instrucoes, etapa, declaracao, parabens, conclusao, carta, carteira
  const [etapa, setEtapa] = useState(1);
  const [totalScore, setTotalScore] = useState(0);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);

  // --- NOVOS ESTADOS PARA O BACKEND ---
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  // --- FUNÇÕES CORE: INTEGRAÇÃO BACKEND ---

  // 1. Modifica iniciarJornada para ser assíncrona e chamar a API
  const iniciarJornada = async (nome) => {
    setLoading(true);
    setError(null);
    try {
      // Chama a API para iniciar a jornada e obter o ID do usuário
      const response = await axios.post(`${API_URL}/api/start-journey`, {
        userName: nome
      });

      const { userId } = response.data;
      
      // Armazena o userId para uso posterior (salvamento final)
      localStorage.setItem('currentUserId', userId);
      
      // Atualiza os estados do App e avança para instruções
      setNomeUsuario(nome);
      setTela('instrucoes');
      
      console.log(`Jornada iniciada, User ID: ${userId}`);
    } catch (err) {
      console.error('Erro ao iniciar a jornada (Backend):', err);
      setError('Erro de conexão. Verifique se o servidor de backend está ativo ou se a API_URL está correta.');
    } finally {
      setLoading(false);
    }
  };

  // 2. NOVA FUNÇÃO: Salvar Resultado Final (Chamada pela TelaCarteira)
  const salvarResultadoFinal = async (dadosCarteira) => {
    const currentUserId = localStorage.getItem('currentUserId');
    
    if (!currentUserId) {
        console.error('Erro: ID do usuário não encontrado. Não é possível salvar.');
        return;
    }

    setLoading(true);
    setError(null);
    try {
        const payload = {
            userId: currentUserId,
            finalScore: totalScore, 
            reflectionData: JSON.stringify(dadosCarteira) // Envia os dados da carteira como string JSON
        };

        await axios.post(`${API_URL}/api/save-reflection`, payload);

        console.log('Resultado final salvo com sucesso no servidor!');

    } catch (err) {
        console.error('Erro ao salvar resultado final (Backend):', err);
        setError('Erro ao salvar resultado. A conexão falhou.');
        throw err; // Rejoga o erro para a TelaCarteira poder mostrar feedback
    } finally {
        setLoading(false);
    }
  };
  
  // --- Funções de Navegação (Mínimas alterações para manter o fluxo) ---

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
    // Adiciona a limpeza do ID
    localStorage.removeItem('currentUserId'); 
    localStorage.removeItem('fotoCard'); 
    
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

  // Usando useCallback para estabilizar a função
  const avancarEtapa = useCallback((scoreDaEtapa = 0) => { 
      setTotalScore(prev => Number(prev) + Number(scoreDaEtapa)); 
      if (etapa < 6) { 
          setEtapa(prev => prev + 1); 
      } else { 
          setTela('declaracao'); 
      } 
  }, [etapa]); // Dependência em etapa é necessária

  const finalizarDeclaracao = () => setTela('parabens');
  const mostrarTelaConclusao = () => setTela('conclusao');
  const toggleSound = () => setIsSoundEnabled(prevState => !prevState);
  const mostrarCarta = () => setTela('carta');
  const mostrarCarteira = () => setTela('carteira');
  const voltarParaConclusao = () => setTela('conclusao'); 
  
  // 3. Atualiza o mapeamento 'telas' com as novas props
  const telas = {
    inicial: <TelaInicial 
      aoIniciar={iniciarJornada} 
      loading={loading} // NOVO: Passa o estado de loading
      error={error}    // NOVO: Passa o estado de erro
    />,
    instrucoes: <TelaInstrucoes nomeUsuario={nomeUsuario} onConfirmar={confirmarInstrucoes} />, // <<< TELA NOVA AQUI
    etapa: <TelaEtapa numeroEtapa={etapa} nomeUsuario={nomeUsuario} aoConcluir={avancarEtapa} isSoundEnabled={isSoundEnabled} />,
    declaracao: <TelaDeclaracao aoFinalizar={finalizarDeclaracao} />,
    parabens: <TelaParabens nomeUsuario={nomeUsuario} totalScore={totalScore} onAvancar={mostrarTelaConclusao} />,
    conclusao: <TelaConclusao nomeUsuario={nomeUsuario} totalScore={totalScore} onVerCarta={mostrarCarta} onVerCarteira={mostrarCarteira} onReiniciar={reiniciarJornada} />,
    carta: <TelaCarta nomeUsuario={nomeUsuario} onVoltar={voltarParaConclusao} />,
    carteira: <TelaCarteira 
        nomeUsuario={nomeUsuario} 
        onVoltar={voltarParaConclusao} 
        onSalvarFinal={salvarResultadoFinal} // NOVO: Passa a função de salvamento
        totalScore={totalScore} // Garante que a pontuação é passada
        loading={loading} // NOVO: Passa o estado de loading
    />
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
