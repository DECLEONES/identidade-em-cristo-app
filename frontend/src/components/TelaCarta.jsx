// frontend/src/components/TelaCarta.jsx

import React, { useEffect, useRef } from 'react';
import './TelaCarta.css'; // Importa o CSS CORRIGIDO

function TelaCarta({ nomeUsuario, onVoltar }) {
  const nomeRef = useRef(null);

  // Lógica para ajustar o tamanho da fonte (do seu protótipo)
  useEffect(() => {
    const ajustarFonte = () => {
      const nomeElement = nomeRef.current;
      if (!nomeElement) return;

      nomeElement.textContent = nomeUsuario;
      nomeElement.style.fontSize = '70px'; // Reseta

      const containerWidth = nomeElement.offsetWidth;
      let textWidth = nomeElement.scrollWidth;
      let currentFontSize = 70;

      while (textWidth > containerWidth && currentFontSize > 10) {
        currentFontSize -= 0.5;
        nomeElement.style.fontSize = `${currentFontSize}px`;
        textWidth = nomeElement.scrollWidth;
      }
    };

    const timer = setTimeout(ajustarFonte, 10);
    window.addEventListener('resize', ajustarFonte);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', ajustarFonte);
    };
  }, [nomeUsuario]); // Executa quando o nome mudar

  return (
    <div className="body-carta">
      {/* O DOCUMENTO (seu 'main') */}
      <main className="documento-carta" id="card">
        {/* A Imagem de Fundo (seu '.background-image') */}
        <div className="background-image-carta"></div>
        
        {/* O Título (seu '.titulo-carta') */}
        <p className="titulo-carta" ref={nomeRef}></p>

        {/* O Conteúdo (seu '.content-wrapper') */}
        <div className="content-wrapper">
          <div className="content-col">
            <div className="secao">
              <ul>
                <li>NÃO SOU MAIS ESCRAVO do que outros pensam de mim</li>
                <li>NÃO SOU MAIS ESCRAVO da necessidade de aprovação</li>
                <li>NÃO SOU MAIS ESCRAVO do medo da rejeição</li>
                <li>NÃO SOU MAIS ESCRAVO da comparação com outros</li>
                <li>EU SOU LIVRE porque sou filho de Deus</li>
                <li>EU SOU LIVRE porque Cristo me libertou</li>
                <li>EU SOU LIVRE para ser quem Deus criou</li>
                <li>EU SOU LIVRE para cumprir meu propósito</li>
              </ul>
            </div>
          </div>

          <div className="content-col">
            <div className="secao">
              <p>Não sou o que faço, não sou o que tenho, não sou o que outros pensam de mim.</p>
              <p className="destaque">Eu Sou Quem Deus diz que Eu Sou: SEU FILHO AMADO!</p>
              <p>Por isso, de pé, ergo a cabeça, olho nos olhos do mundo e declaro:</p>
              <p className="destaque" style={{ fontSize: '20px' }}>EU SOU FILHO DO REI DOS REIS!</p>
            </div>
          </div>
        </div>
      </main>

      {/* A Barra de Ferramentas (seu '.toolbar') */}
      <div className="toolbar-carta" id="toolbar">
        <button onClick={onVoltar}>Voltar</button>
        <button onClick={() => window.print()}>Imprimir / Salvar PDF</button>
      </div>
    </div>
  );
}

export default TelaCarta;