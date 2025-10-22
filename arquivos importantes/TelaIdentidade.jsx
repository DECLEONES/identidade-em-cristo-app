// frontend/src/components/TelaCarteira.jsx
// VERSÃO ATUALIZADA - Integração com a função onSalvarFinal do App.jsx

import React, { useState, useEffect, useRef } from 'react';
import './TelaCarteira.css';

// NOVO: Adiciona as props onSalvarFinal, totalScore e loading
function TelaCarteira({ nomeUsuario, onVoltar, onSalvarFinal, totalScore, loading }) {
  // --- Estados do React (Substituindo variáveis JS) ---
  
  // Controla o que é exibido: o formulário ou a carteira
  const [mostrarFormulario, setMostrarFormulario] = useState(true);
  
  // NOVO: Estado para feedback de salvamento específico desta tela
  const [statusSalvamento, setStatusSalvamento] = useState('inicial'); // 'inicial', 'sucesso', 'erro'
  
  // Guarda os dados do formulário
  // Pré-enche o nome com o que já temos do app
  const [nome, setNome] = useState(nomeUsuario || ''); 
  const [nascimento, setNascimento] = useState('');
  const [sexo, setSexo] = useState('Masculino');
  
  // Guarda a URL da foto (inicia nula)
  const [fotoUrl, setFotoUrl] = useState(null); 
  
  // Guarda outros dados gerados
  const [dataExpedicao, setDataExpedicao] = useState('');
  const [isFormValido, setIsFormValido] = useState(false);

  // Referências para os inputs de arquivo escondidos
  const cameraInputRef = useRef(null);
  const galeriaInputRef = useRef(null);

  // --- Lógica de Validação (Substituindo validarCampos()) ---
  useEffect(() => {
    const nomeValido = nome.trim() !== '';
    const nascimentoValido = nascimento.trim() !== '';
    const fotoValida = !!fotoUrl; // Verifica se fotoUrl não é nulo
    setIsFormValido(nomeValido && nascimentoValido && fotoValida);
  }, [nome, nascimento, fotoUrl]);

  // --- Lógica de Carregamento (Substituindo DOMContentLoaded) ---
  useEffect(() => {
    // Define a data de expedição ao carregar
    const hoje = new Date();
    const dataFormatada = hoje.toLocaleDateString('pt-BR');
    setDataExpedicao(dataFormatada);

    // Tenta carregar a foto salva do localStorage
    const fotoSalva = localStorage.getItem("fotoCard");
    if (fotoSalva) {
      setFotoUrl(fotoSalva);
    }
  }, []); // [] = Executa apenas uma vez, quando o componente é montado

  // --- Funções de Manipulação de Imagem (Seu código adaptado) ---
  const redimensionarImagem = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const maxWidth = 300, maxHeight = 400;
        let width = img.width, height = img.height;

        if (width > height) {
          if (width > maxWidth) { height *= maxWidth / width; width = maxWidth; }
        } else {
          if (height > maxHeight) { width *= maxHeight / height; height = maxHeight; }
        }
        canvas.width = width; canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);
        
        const dataURL = canvas.toDataURL("image/jpeg", 0.8);
        
        // Salva no localStorage E no estado do React
        localStorage.setItem("fotoCard", dataURL);
        setFotoUrl(dataURL);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleFotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      redimensionarImagem(file);
    }
  };

  // --- NOVA FUNÇÃO: Gerar e Salvar a Carteira ---
  const handleGerarECarteira = async () => {
    if (!isFormValido || !onSalvarFinal) {
        console.warn("Formulário inválido ou função de salvamento não disponível.");
        return;
    }

    setStatusSalvamento('inicial'); // Reseta o status antes de iniciar

    const dadosCarteira = {
        nome: nome.trim(),
        nascimento: nascimento,
        sexo: sexo,
        fotoUrl: fotoUrl, // Base64 da imagem
        dataExpedicao: dataExpedicao,
        status: sexo === 'Feminino' ? 'Filha Amada e Escolhida' : 'Filho Amado e Escolhido',
        profissao: sexo === 'Feminino' ? 'Embaixadora de Cristo' : 'Embaixador de Cristo',
        totalScore: totalScore // Adiciona a pontuação final
    };

    try {
        setMostrarFormulario(false); // Esconde o formulário para mostrar o card imediatamente
        // O loading global (App.jsx) será true aqui
        await onSalvarFinal(dadosCarteira);
        setStatusSalvamento('sucesso');
    } catch (e) {
        setStatusSalvamento('erro');
    }
  };

  // --- Lógica de Renderização Dinâmica (HTML para JSX) ---

  // Calcula valores dinâmicos para a carteira
  const statusValor = sexo === 'Feminino' ? 'Filha Amada e Escolhida' : 'Filho Amado e Escolhido';
  const profissaoValor = sexo === 'Feminino' ? 'Embaixadora de Cristo' : 'Embaixador de Cristo';
  const dataNascimentoFormatada = nascimento ? new Date(nascimento).toLocaleDateString('pt-BR') : '';

  // Determina o texto do botão de salvamento
  const getSaveButtonText = () => {
    if (loading) return 'Salvando...';
    if (statusSalvamento === 'sucesso') return 'Salvo com Sucesso!';
    if (statusSalvamento === 'erro') return 'Erro ao Salvar (Tentar Novamente)';
    return 'Salvar Carteira (Final)';
  };


  return (
    <div className="body-carteira">
      
      {/* Exibe mensagem de erro da API, se houver */}
      {statusSalvamento === 'erro' && (
        <p style={{ color: 'red', fontWeight: 'bold', textAlign: 'center' }}>
          Ocorreu um erro ao salvar o resultado final no servidor. Tente novamente.
        </p>
      )}

      {/* --- FORMULÁRIO (Traduzido do seu HTML) --- */}
      {mostrarFormulario && (
        <div id="form-container">
          <div className="input-group">
            <label htmlFor="nome">Nome Completo:</label>
            <input 
              type="text" 
              id="nome" 
              placeholder="Seu Nome Completo" 
              value={nome} 
              onChange={(e) => setNome(e.target.value)} 
              disabled={loading} // Desabilita durante o carregamento
            />
          </div>
          <div className="input-group">
            <label htmlFor="nascimento">Data de Nascimento:</label>
            <input 
              type="date" 
              id="nascimento" 
              value={nascimento} 
              onChange={(e) => setNascimento(e.target.value)}
              disabled={loading} // Desabilita durante o carregamento
            />
          </div>
          <div className="input-group">
            <label htmlFor="sexo">Sexo:</label>
            <select 
              id="sexo" 
              value={sexo}
              onChange={(e) => setSexo(e.target.value)}
              disabled={loading} // Desabilita durante o carregamento
            >
              <option value="Masculino">Masculino</option>
              <option value="Feminino">Feminino</option>
            </select>
          </div>
          <div className="input-group">
            <label>Foto:</label>
            <div className="foto-buttons">
              <button 
                onClick={() => cameraInputRef.current.click()}
                disabled={loading}
              >
                Tirar Foto
              </button>
              <button 
                onClick={() => galeriaInputRef.current.click()}
                disabled={loading}
              >
                Escolher da Galeria
              </button>
            </div>
            <input 
              type="file" 
              id="foto-input-camera" 
              accept="image/*" 
              capture="environment" 
              ref={cameraInputRef} 
              onChange={handleFotoChange}
              style={{ display: 'none' }} // Oculta os inputs
              disabled={loading}
            />
            <input 
              type="file" 
              id="foto-input-galeria" 
              accept="image/*" 
              ref={galeriaInputRef} 
              onChange={handleFotoChange}
              style={{ display: 'none' }} // Oculta os inputs
              disabled={loading}
            />
            {/* NOVO: Exibe pré-visualização ou status da foto */}
            {fotoUrl ? (
                <p style={{ marginTop: '10px', color: 'green', fontWeight: 'bold' }}>Foto carregada com sucesso!</p>
            ) : (
                <p style={{ marginTop: '10px', color: 'red' }}>* É obrigatório carregar uma foto.</p>
            )}
          </div>
          <button 
            id="btn-gerar" 
            disabled={!isFormValido || loading} 
            onClick={handleGerarECarteira} // Agora chama a função que também salva
          >
            {loading ? 'Preparando o Salvamento...' : 'Gerar e Salvar Carteira'}
          </button>
        </div>
      )}

      {/* --- CARTEIRA (Traduzida do seu HTML) --- */}
      {!mostrarFormulario && (
        <div id="card-container">
          <main className="documento" id="card">
            <div className="frente">
              <div className="logo-governo"></div>
              <header>
                <h1>REPÚBLICA FEDERATIVA DE DEUS</h1>
                <div className="subtitulo-governo">GOVERNO DIVINO</div>
                <div className="subtitulo-secretaria">Unidade Celestial<br/>Secretária de Segurança da Trindade Divina</div>
                <h2>CARTEIRA DE IDENTIDADE ESPIRITUAL</h2>
                <h3>Documento Oficial do Céus</h3>
              </header>
              <div className="foto" style={{ backgroundImage: `url('${fotoUrl}')` }}></div>
              <div className="conteudo">
                <div className="linha">
                  <div className="campo" style={{width: '100%'}}><div className="label">Nome</div><div className="valor">{nome}</div></div>
                </div>
                <div className="linha">
                  <div className="campo"><div className="label">Nascimento</div><div className="valor">{dataNascimentoFormatada}</div></div>
                  <div className="campo"><div className="label">Sexo</div><div className="valor">{sexo}</div></div>
                </div>
                <div className="linha">
                  <div className="campo"><div className="label">Filiação</div><div className="valor">Deus Pai Todo Poderoso</div></div>
                  <div className="campo"><div className="label">Valor</div><div className="valor">Sangue Precioso de Cristo</div></div>
                </div>
                <div className="linha">
                  <div className="campo"><div className="label">Naturalidade</div><div className="valor">Reino dos Céus</div></div>
                  <div className="campo"><div className="label">Herança</div><div className="valor">Vida Eterna e Reino Celestial</div></div>
                </div>
                <div className="linha">
                  <div className="campo"><div className="label">Status</div><div className="valor">{statusValor}</div></div>
                  <div className="campo"><div className="label">Profissão</div><div className="valor">{profissaoValor}</div></div>
                </div>
              </div>
              <div className="assinatura">
                <div className="assinatura-linha"></div>
                <div className="assinatura-label">Assinatura do Titular</div>
              </div>
            </div>
            
            <div className="verso">
              <div className="conteudo-superior-verso">
                <div className="mapa-fundo"></div>
                <div className="dados-expedicao">
                  <div className="campo-exp">
                    <div className="label">Expedição</div>
                    <div className="valor">{dataExpedicao}</div> </div>
                  <div className="campo-exp">
                    <div className="label">Orgão Expeditor</div>
                    <div className="valor">I.E.P - Jardim de Oração Independente</div>
                  </div>
                  <div className="campo-exp">
                    <div className="label">Local</div>
                    <div className="valor">RONDONÓPOLIS/MT</div>
                  </div>
                </div>
              </div>
              <div className="assinatura-divina">
                <div className="assinatura-divina-img">O Rei dos reis</div>
                <div className="assinatura-divina-label">Assinatura Divina</div>
              </div>
              <div className="validade-container">
                <div className="espaco-figura" id="figura1"></div>
                <div className="espaco-figura" id="figura2"></div>
                <div className="validade">Válida Enquanto a Fé Estiver Fundamentada em Jesus Cristo!</div>
                <div className="espaco-figura" id="figura3"></div>
                <div className="espaco-figura" id="figura4"></div>
              </div>
              <div className="rodape-verso">
                <div className="versiculo">
                  "Vede quão grande amor nos tem concedido o Pai, que fôssemos chamados filhos de Deus; e nós somos filhos de Deus.”
                  <strong> 1 João 3:1</strong>
                </div>
                <div className="rodape-container">
                  <div className="rodape-texto-esquerda">Documento Oficial do Céus</div>
                  <div className="logo-rodape"></div>
                  <div className="rodape-texto-direita">Jesus Te Ama</div>
                </div>
              </div>
            </div>
          </main>
        </div>
      )}

      {/* --- Barra de Ferramentas com Voltar e Imprimir --- */}
      <div className="toolbar">
        <button 
          onClick={onVoltar}
          disabled={loading} // Desabilita o botão enquanto salva
        >
          Voltar
        </button>
        
        {/* Botão de Imprimir */}
        {!mostrarFormulario && (
          <button onClick={() => window.print()}>Imprimir</button>
        )}
        
        {/* NOVO: Botão de Salvar (Aparece após a geração) */}
        {!mostrarFormulario && (
            <button 
                onClick={handleGerarECarteira} 
                disabled={loading} 
                className={statusSalvamento === 'sucesso' ? 'btn-sucesso' : statusSalvamento === 'erro' ? 'btn-erro' : ''}
                style={{ marginLeft: '10px' }}
            >
                {getSaveButtonText()}
            </button>
        )}

      </div>
    </div>
  );
}

export default TelaCarteira;
