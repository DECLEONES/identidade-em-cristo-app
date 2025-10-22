// frontend/src/dadosJornada.js
// Formato e dados 100% fiéis ao script original (quiz1 a quiz6)

export const DADOS_JORNADA = [
  // Etapa 1
  {
    etapa: 1,
    tituloEtapa: "A Crise de Identidade", // Título para o Quiz
    videoUrl: "https://www.youtube.com/embed/VM3x-6CWKPM?enablejsapi=1&playsinline=1&rel=0&modestbranding=1", // URL do Vídeo 1
    quiz: [ // quiz1 do script original
        { question: "Qual é o problema de ter uma identidade baseada no que os outros pensam?", options: ["Isso nos torna populares.", "Nossa identidade se torna frágil e inconstante.", "Isso nos ajuda a crescer.", "É a melhor forma de ser feliz."], answer: 1, reference: "Gálatas 1:10" },
        { question: "O que significa 'crise de identidade espiritual'?", options: ["Falta de oração.", "Falta de conhecimento sobre quem somos em Cristo.", "Não saber o que comer.", "Não gostar do que faz."], answer: 1, reference: "Efésios 1:5" },
        { question: "O que o mundo nos oferece para construir nossa identidade?", options: ["Padrões de beleza e sucesso.", "A Palavra de Deus.", "Oração e jejum.", "Uma comunidade de fé."], answer: 0, reference: "Romanos 12:2" },
        { question: "A baixa autoestima pode ser um sintoma de quê?", options: ["Excesso de confiança.", "Crise de identidade espiritual.", "Falta de amigos.", "Gula."], answer: 1, reference: "Salmos 139:14" },
        { question: "O que a Bíblia nos ensina sobre a identidade?", options: ["Que somos insignificantes.", "Que somos amados e criados por um Deus com propósito.", "Que nossa identidade depende do nosso sucesso.", "Que somos esquecidos."], answer: 1, reference: "Jeremias 29:11" },
        { question: "Qual é a relação entre identidade e propósito?", options: ["Não há relação.", "Identidade precede o propósito.", "Propósito precede a identidade.", "São a mesma coisa."], answer: 1, reference: "1 Pedro 2:9" },
        { question: "O que acontece quando você encontra a sua identidade em Cristo?", options: ["Você fica sem amigos.", "Você se torna arrogante.", "Você descobre seu propósito eterno.", "Você se isola do mundo."], answer: 2, reference: "Efésios 2:10" },
        { question: "Como a verdade de Deus pode nos ajudar a resolver a crise de identidade?", options: ["Nos ensinando a mentir.", "Nos dando uma nova forma de ver a nós mesmos e ao mundo.", "Nos tornando egoístas.", "Ignorando nossos problemas."], answer: 1, reference: "João 8:32" },
        { question: "Qual é a principal luta que o jovem enfrenta em sua identidade?", options: ["Luta contra a timidez.", "Luta contra a comparação.", "Luta contra o medo de altura.", "Luta contra a preguiça."], answer: 1, reference: "2 Coríntios 10:12" },
        { question: "O que a Palavra de Deus nos oferece que o mundo não pode oferecer?", options: ["Bens materiais.", "Uma identidade baseada em amor e não em desempenho.", "Fama e status.", "Uma vida sem dificuldades."], answer: 1, reference: "Colossenses 2:8" }
    ],
    reflexaoTitulo: "A Verdade te libertará!", // Título para a Reflexão
    reflexaoTexto: [ // Texto da Reflexão em parágrafos
        "A sua crise de identidade tem a ver com a sua falta de propósito.",
        "Mas, em Cristo, nós temos um propósito e uma identidade definidos. Ele é o autor da nossa história.",
        "Então, a melhor forma de se livrar dessa crise é se aprofundar na Palavra de Deus para descobrir quem você é e para o que você nasceu. Lembre-se: <b>você é mais forte do que pensa!</b>"
    ],
    reflexaoCitacao: "\"E conhecereis a verdade, e a verdade vos libertará.\"",
    reflexaoReferencia: "João 8:32"
  },
  // Etapa 2
  {
    etapa: 2,
    tituloEtapa: "A Imagem de Deus", // Título para o Quiz
    videoUrl: "https://www.youtube.com/embed/VM3x-6CWKPM?enablejsapi=1&playsinline=1&rel=0&modestbranding=1", // URL do Vídeo 2
    videoPoster: "https://i.postimg.cc/7YYWbXgZ/Capa-para-v-deo-do-You-Tube-esportes-moderna-azul-e-laranja-20250728-144701-0001.png",
    quiz: [ // quiz2 do script original
        { question: "Deus te criou de forma assombrosamente maravilhosa. O que isso significa?", options: ["Que Ele se arrependeu.", "Que você é um acidente.", "Que Ele te formou com um propósito e te ama.", "Que você é perfeito."], answer: 2, reference: "Salmos 139:14" },
        { question: "Segundo a Bíblia, quem é a obra-prima de Deus?", options: ["Os anjos.", "Os pastores.", "O homem, feito a Sua imagem e semelhança.", "Os animais."], answer: 2, reference: "Gênesis 1:26-27" },
        { question: "Por que não precisamos buscar valor em bens materiais ou no que fazemos?", options: ["Porque isso é pecado.", "Porque nosso valor já foi estabelecido por Deus.", "Porque bens materiais são inúteis.", "Porque devemos ser pobres."], answer: 1, reference: "Isaías 64:8" },
        { question: "Deus é o criador de cada ser humano. O que isso nos ensina sobre nosso valor?", options: ["Que somos todos iguais e sem valor.", "Que nosso valor é inegociável porque somos Sua criação.", "Que somos insignificantes.", "Que nosso valor só existe se formos famosos."], answer: 1, reference: "Mateus 10:31" },
        { question: "O que a Bíblia diz sobre a nossa criação e o nosso propósito?", options: ["Fomos criados para viver sem propósito.", "Fomos criados para adorar e cumprir um propósito eterno.", "Fomos criados para trabalhar muito.", "Fomos criados para ficar em casa."], answer: 1, reference: "Efésios 2:10" },
        { question: "O que significa 'imagem e semelhança de Deus'?", options: ["Que somos fisicamente idênticos a Deus.", "Que refletimos o caráter, a moral e a espiritualidade de Deus.", "Que temos o mesmo poder que Deus.", "Que somos iguais a Deus em tudo."], answer: 1, reference: "Colossenses 3:10" },
        { question: "O que o reconhecimento de que fomos formados por Deus gera em nós?", options: ["Arrogância.", "Gratidão e um senso de propósito.", "Tristeza e culpa.", "Indiferença."], answer: 1, reference: "Isaías 43:1" },
        { question: "Como a verdade da criação pode combater a baixa autoestima?", options: ["Nos lembrando que somos defeituosos.", "Nos mostrando que somos únicos, amados e preciosos para Deus.", "Nos comparando a outras pessoas.", "Nos tornando arrogantes."], answer: 1, reference: "1 Pedro 2:9" },
        { question: "Qual é o perigo de se comparar com os outros?", options: ["Isso fortalece a fé.", "Isso nos leva a competir de forma saudável.", "Isso enfraquece a confiança em nossa própria identidade.", "Isso não tem perigo algum."], answer: 2, reference: "2 Coríntios 10:12" },
        { question: "O que Deus nos deu para que tenhamos uma identidade firme?", options: ["Nossa inteligência.", "A Palavra e o Espírito Santo.", "Riqueza e poder.", "Status social."], answer: 1, reference: "Jeremias 1:5" }
    ],
    reflexaoTitulo: "Um propósito maior",
    reflexaoTexto: [
        "Você não é um acidente.",
        "Deus te criou de forma única, com um propósito especial, e você é valioso para Ele. Não permita que as comparações roubem a sua alegria e a sua dignidade.",
        "Você é obra-prima do Criador, feita de modo especial e admirável!"
    ],
    reflexaoCitacao: "\"Eu te louvo porque me fizeste de modo assombrosamente maravilhoso; as tuas obras são admiráveis, e a minha alma o sabe muito bem.\"",
    reflexaoReferencia: "Salmos 139:14"
  },
    // Etapa 3
  {
    etapa: 3,
    tituloEtapa: "O Pecado e a Identidade", // Título para o Quiz
    videoUrl: "https://www.youtube.com/embed/VM3x-6CWKPM?enablejsapi=1&playsinline=1&rel=0&modestbranding=1", // URL do Vídeo 3
    videoPoster: "https://i.postimg.cc/mD8z4qW0/Capa-para-v-deo-do-You-Tube-esportes-moderna-azul-e-laranja-20250728-144701-0002.png",
    quiz: [ // quiz3 do script original
        { question: "O que o pecado causou na identidade do homem?", options: ["Nos tornou mais inteligentes.", "Nos deu liberdade.", "Trouxe vergonha e distorção da nossa verdadeira identidade.", "Nos tornou mais bonitos."], answer: 2, reference: "Gênesis 3:7-10" },
        { question: "O que Adão fez ao pecar?", options: ["Confessou e pediu perdão.", "Se escondeu e tentou se cobrir.", "Ficou feliz.", "Ignorou o que fez."], answer: 1, reference: "Gênesis 3:8" },
        { question: "O que são 'máscaras' espirituais?", options: ["Objetos para o carnaval.", "Uma forma de disfarçar quem somos para sermos aceitos.", "Símbolos de fé.", "Uma forma de ser mais santo."], answer: 1, reference: "Isaías 29:13" },
        { question: "O que acontece quando tentamos nos esconder de Deus?", options: ["Ele nos esquece.", "Ele nos busca e nos chama.", "Ele fica bravo.", "Ele nos castiga."], answer: 1, reference: "Gênesis 3:9" },
        { question: "Qual é o principal resultado do pecado em nossa relação com Deus?", options: ["Aproximação.", "Distanciamento e culpa.", "Felicidade.", "Riqueza."], answer: 1, reference: "Salmos 32:3-5" },
        { question: "Como a confissão de pecados afeta nossa identidade?", options: ["Nos torna piores.", "Nos liberta da culpa e restaura nossa identidade em Cristo.", "Nos deixa envergonhados.", "Nos faz esquecer quem somos."], answer: 1, reference: "1 João 1:9" },
        { question: "Qual é a única saída para a crise de identidade gerada pelo pecado?", options: ["Autoajuda e terapias.", "Religião e boas obras.", "Arrependimento e a graça de Cristo.", "Fingir que nada aconteceu."], answer: 2, reference: "João 1:12" },
        { question: "O que significa 'nova criação' em 2 Coríntios 5:17?", options: ["Ser uma pessoa perfeita.", "Esquecer o passado.", "Receber uma nova identidade e propósito em Cristo.", "Ter uma vida de luxo."], answer: 2, reference: "2 Coríntios 5:17" },
        { question: "O que a graça de Deus nos oferece?", options: ["Castigo e julgamento.", "Favor imerecido e perdão.", "Riqueza e fama.", "Uma vida sem problemas."], answer: 1, reference: "Efésios 2:8-9" },
        { question: "Qual é o papel do diabo na nossa identidade?", options: ["Nos encorajar.", "Plantar mentiras e nos afastar de Deus.", "Nos dar sabedoria.", "Nos ajudar a crescer."], answer: 1, reference: "João 8:44" }
    ],
    reflexaoTitulo: "A saída para a crise",
    reflexaoTexto: [
        "O pecado tem o poder de distorcer o nosso interior, fazendo com que a gente se sinta culpado e envergonhado diante de Deus.",
        "Mas, a boa notícia é que o caminho da libertação é a confissão e o arrependimento. Deus nos perdoa e nos transforma por Sua graça e misericórdia.",
        "Nós precisamos viver em Sua verdade para que as mentiras do mundo não nos prendam."
    ],
    reflexaoCitacao: "\"Se confessarmos os nossos pecados, ele é fiel e justo para nos perdoar os pecados e nos purificar de toda a injustiça.\"",
    reflexaoReferencia: "1 João 1:9"
  },
    // Etapa 4
  {
    etapa: 4,
    tituloEtapa: "A Nova Identidade", // Título para o Quiz
    videoUrl: "https://www.youtube.com/embed/VM3x-6CWKPM?enablejsapi=1&playsinline=1&rel=0&modestbranding=1", // URL do Vídeo 4
    videoPoster: "https://i.postimg.cc/tJn46X0Y/Capa-para-v-deo-do-You-Tube-esportes-moderna-azul-e-laranja-20250728-144701-0003.png",
    quiz: [ // quiz4 do script original
        { question: "O que significa ser 'adotado' por Deus?", options: ["Ser apenas um servo.", "Ser feito filho de Deus com todos os direitos.", "Ficar na porta de casa.", "Não ter mais problemas."], answer: 1, reference: "Romanos 8:15" },
        { question: "Qual é o efeito da cruz na nossa identidade?", options: ["Nos condena.", "Nos livra do nosso passado e da nossa velha identidade.", "Nos torna perfeitos.", "Nos deixa arrogantes."], answer: 1, reference: "2 Coríntios 5:17" },
        { question: "O que é 'graça'?", options: ["Um favor merecido.", "Favor imerecido que Deus nos dá.", "Apenas sorte.", "Algo que se compra."], answer: 1, reference: "Efésios 2:8-9" },
        { question: "O que nos torna 'participantes da família de Deus'?", options: ["Nossas boas obras.", "Frequentar a igreja.", "A fé em Jesus Cristo.", "Nosso status social."], answer: 2, reference: "João 1:12" },
        { question: "Qual a base para a nossa nova identidade em Cristo?", options: ["Nossa aparência.", "A riqueza.", "O amor de Deus e o sacrifício de Jesus.", "Nossos amigos."], answer: 2, reference: "1 João 3:1" },
        { question: "O que a Bíblia diz sobre a importância de ter uma nova identidade em Cristo?", options: ["Não é importante.", "É o fundamento para uma vida com propósito e liberdade.", "É para quem quer ser famoso.", "É opcional."], answer: 1, reference: "Colossenses 3:10" },
        { question: "Quem é o nosso Guia agora que temos uma nova identidade?", options: ["O horóscopo.", "O Espírito Santo.", "Nossos amigos.", "Nosso vizinho."], answer: 1, reference: "João 14:26" },
        { question: "O que acontece com o nosso passado após a adoção por Deus?", options: ["Ele é esquecido.", "Ele é usado para nos julgar.", "É perdoado e não define quem somos.", "É apagado da memória."], answer: 2, reference: "Miquéias 7:19" },
        { question: "O que a nova identidade nos dá?", options: ["Medo e insegurança.", "Confiança e propósito.", "Vazio.", "Tristeza."], answer: 1, reference: "Filipenses 4:13" },
        { question: "O que devemos fazer para viver nossa nova identidade em Cristo?", options: ["Continuar nos comportando da mesma forma.", "Renovar a nossa mente com a Palavra de Deus e confiar Nele.", "Seguir as tendências do mundo.", "Viver para agradar as pessoas."], answer: 1, reference: "Romanos 12:2" }
    ],
    reflexaoTitulo: "Uma nova criação",
    reflexaoTexto: [
        "Em Cristo, o seu passado foi perdoado, o seu presente está em um propósito e o seu futuro está garantido.",
        "Você é uma nova criação, as coisas antigas passaram, eis que tudo se fez novo. A sua identidade não está em você, mas em quem Ele é.",
        "Por isso, não perca tempo buscando ser reconhecido, Deus já te reconheceu como filho(a) amado(a) e te deu um propósito."
    ],
    reflexaoCitacao: "\"Assim que, se alguém está em Cristo, nova criatura é: as coisas velhas já passaram; eis que tudo se fez novo.\"",
    reflexaoReferencia: "2 Coríntios 5:17"
  },
    // Etapa 5
  {
    etapa: 5,
    tituloEtapa: "Vivendo como Filho", // Título para o Quiz
    videoUrl: "https://www.youtube.com/embed/VM3x-6CWKPM?enablejsapi=1&playsinline=1&rel=0&modestbranding=1", // URL do Vídeo 5
    videoPoster: "https://i.postimg.cc/tJn46X0Y/Capa-para-v-deo-do-You-Tube-esportes-moderna-azul-e-laranja-20250728-144701-0004.png",
    quiz: [ // quiz5 do script original
        { question: "O que significa 'andar como filhos da luz'?", options: ["Viver na escuridão.", "Viver uma vida que reflete o caráter de Deus.", "Apenas ler a Bíblia.", "Ser famoso."], answer: 1, reference: "Efésios 5:8" },
        { question: "Qual é a base para a nossa segurança em Cristo?", options: ["Nossa força.", "A fidelidade de Deus e o amor incondicional.", "Nossos bens materiais.", "Nossos amigos."], answer: 1, reference: "Romanos 8:38-39" },
        { question: "Como o Espírito Santo nos ajuda a viver nossa identidade?", options: ["Ele nos condena.", "Ele nos guia, convence do pecado e nos fortalece.", "Ele nos deixa sozinhos.", "Ele nos dá riqueza."], answer: 1, reference: "João 16:13" },
        { question: "O que acontece quando oramos como filhos de Deus?", options: ["Não somos ouvidos.", "Temos acesso direto ao Pai.", "A oração não muda nada.", "Nos tornamos perfeitos."], answer: 1, reference: "Romanos 8:15" },
        { question: "Qual é o principal resultado de viver como filho(a) amado(a)?", options: ["Medo e ansiedade.", "Uma vida de propósito e liberdade.", "Arrogância.", "Isolamento."], answer: 1, reference: "Gálatas 5:1" },
        { question: "O que a Bíblia nos ensina a fazer com a nossa velha identidade?", options: ["Lembrar dela com carinho.", "Deixá-la para trás e se revestir da nova.", "Escondê-la.", "Apenas ignorá-la."], answer: 1, reference: "Colossenses 3:9-10" },
        { question: "O que a vida de Jesus nos mostra sobre nossa identidade?", options: ["Que Ele é um Deus distante.", "Que fomos feitos para amar e servir como Ele.", "Que não podemos ser como Ele.", "Que não há um propósito."], answer: 1, reference: "Filipenses 2:5-7" },
        { question: "O que nos faz diferentes do mundo?", options: ["Roupas da moda.", "O fato de sermos filhos de Deus e a nossa esperança Nele.", "Dinheiro.", "Apenas nossa religião."], answer: 1, reference: "1 Pedro 2:9" },
        { question: "Qual é a herança que recebemos como filhos de Deus?", options: ["Bens materiais.", "A vida eterna, o Espírito Santo e o Reino de Deus.", "Fama.", "Poder sobre as nações."], answer: 1, reference: "Romanos 8:17" },
        { question: "Qual é a nossa principal fonte de identidade e valor?", options: ["Nossas conquistas.", "O amor e a aprovação de Deus.", "O que as pessoas dizem.", "Nossa beleza."], answer: 1, reference: "1 João 3:1" }
    ],
    reflexaoTitulo: "A Adoção nos Deu Poder",
    reflexaoTexto: [
        "A sua nova identidade em Cristo te dá o direito e a autoridade de ser chamado de filho(a) de Deus.",
        "Isso significa que você tem acesso direto ao Pai, pode viver sem medo e tem o Espírito Santo como seu guia e consolador. Não ande mais de cabeça baixa, pois você foi elevado(a) à condição de realeza.",
        "Viva essa verdade todos os dias!"
    ],
    reflexaoCitacao: "\"Vejam que grande amor o Pai nos concedeu, a ponto de sermos chamados filhos de Deus! E, de fato, somos filhos de Deus.\"",
    reflexaoReferencia: "1 João 3:1"
  },
    // Etapa 6
  {
    etapa: 6,
    tituloEtapa: "Propósito e Missão", // Título para o Quiz
    videoUrl: "https://www.youtube.com/embed/VM3x-6CWKPM?enablejsapi=1&playsinline=1&rel=0&modestbranding=1", // URL do Vídeo 6
    videoPoster: "https://i.postimg.cc/tJn46X0Y/Capa-para-v-deo-do-You-Tube-esportes-moderna-azul-e-laranja-20250728-144701-0005.png",
    quiz: [ // quiz6 do script original
        { question: "O que significa 'ser feitura de Deus'?", options: ["Ser uma obra inacabada.", "Ser uma obra-prima criada com um propósito divino.", "Ser uma pessoa comum.", "Ser um acidente."], answer: 1, reference: "Efésios 2:10" },
        { question: "O que a grande comissão nos ensina sobre nosso propósito?", options: ["Ficar parados.", "Ir e fazer discípulos de todas as nações.", "Viver apenas para nós mesmos.", "Acumular bens."], answer: 1, reference: "Mateus 28:19" },
        { question: "Qual é o papel dos dons espirituais na nossa missão?", options: ["São para benefício próprio.", "São para edificar a igreja e cumprir a missão de Deus.", "São inúteis.", "São apenas para pastores."], answer: 1, reference: "1 Coríntios 12:7" },
        { question: "O que é 'sal da terra e luz do mundo'?", options: ["Uma metáfora sem sentido.", "O chamado de Deus para os Seus filhos influenciarem positivamente o mundo.", "Um título religioso.", "Um apelido carinhoso."], answer: 1, reference: "Mateus 5:13-14" },
        { question: "Onde o nosso propósito e missão se encontram?", options: ["No dinheiro.", "Em nossa nova identidade em Cristo.", "Na nossa inteligência.", "Nos nossos talentos."], answer: 1, reference: "2 Coríntios 5:20" },
        { question: "Qual é a principal motivação para cumprir a missão de Deus?", options: ["Medo do inferno.", "A glória de Deus e o amor por Ele e pelo próximo.", "Para ser famoso.", "Para ganhar dinheiro."], answer: 1, reference: "2 Coríntios 5:14" },
        { question: "O que nos habilita a cumprir o nosso propósito?", options: ["Nosso talento.", "O poder do Espírito Santo.", "Nossos amigos.", "Nossa família."], answer: 1, reference: "Atos 1:8" },
        { question: "O que a Bíblia nos ensina sobre os talentos que Deus nos dá?", options: ["Devemos escondê-los.", "Devemos usá-los para o Reino de Deus.", "Não são importantes.", "Devemos usá-los apenas para nosso prazer."], answer: 1, reference: "Mateus 25:14-30" },
        { question: "O que a nossa vida, como filhos de Deus, deve manifestar?", options: ["Padrões do mundo.", "O fruto do Espírito, como amor, alegria e paz.", "Ansiedade.", "Tristeza."], answer: 1, reference: "Gálatas 5:22-23" },
        { question: "O que o Senhor nos diz em Jeremias 29:11?", options: ["Não temos um futuro.", "Ele tem planos de bem, de paz e um futuro para nós.", "Vamos sofrer para sempre.", "Ele não se importa conosco."], answer: 1, reference: "Jeremias 29:11" }
    ],
    reflexaoTitulo: "Seu Chamado Eterno",
    reflexaoTexto: [
        "Você foi criado para uma obra que Deus preparou para você.",
        "Sua identidade em Cristo te habilita a cumprir essa missão. Não é sobre o que você pode fazer por si mesmo, mas o que Deus pode fazer através de você. Seja um canal de bênção na vida de outras pessoas, compartilhando essa verdade que liberta.",
        "Abrace seu propósito e viva-o com alegria e ousadia."
    ],
    reflexaoCitacao: "\"Porque somos feitura sua, criados em Cristo Jesus para boas obras, as quais Deus de antemão preparou para que andássemos nelas.\"",
    reflexaoReferencia: "Efésios 2:10"
  },
];