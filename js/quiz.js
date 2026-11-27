const perguntas = [
  {
    tipo: "numero",
    pergunta: "Quantos anos você tem?",
    subtitulo: "Sua idade (somente números)",
    ajuda: "Digite apenas números inteiros positivos. Letras e valores negativos não são permitidos."
  },
  {
    tipo: "unica",
    pergunta: "Como você prefere estudar?",
    subtitulo: "Queremos encontrar oportunidades que se encaixem na sua rotina",
    opcoes: [
      { titulo: "Presencial", descricao: "Nunca fiz cursos ou projetos em tecnologia", valor: "presencial" },
      { titulo: "Tanto faz", descricao: "Estou aberto(a) a cursos presenciais e online", valor: "hibrido" },
      { titulo: "Online", descricao: "Prefiro estudar pela internet, de onde estiver", valor: "online" }
    ]
  },
  {
    tipo: "unica",
    pergunta: "Em qual área você gostaria de aprender?",
    subtitulo: "Escolha a área que mais desperta seu interesse. Vamos encontrar cursos gratuitos que combinem com você!",
    opcoes: [
      { titulo: "Tecnologia", descricao: "Programação, informática e inovação.", valor: "tecnologia" },
      { titulo: "Design e Criatividade", descricao: "Design gráfico, edição de vídeo e interfaces.", valor: "design" },
      { titulo: "Administração e Negócios", descricao: "Gestão, empreendedorismo e finanças.", valor: "gestao" },
      { titulo: "Marketing Digital e Comunicação", descricao: "Redes Sociais, vendas e produção de conteúdos", valor: "marketing" }
    ]
  },
  {
    tipo: "multipla",
    pergunta: "Quais áreas da tecnologia despertam seu interesse?",
    subtitulo: "Você pode selecionar uma ou mais alternativas abaixo para combinarmos com o seu perfil.",
    opcoes: [
      { titulo: "Programação e desenvolvimento", descricao: "Sites, aplicativos, sistemas e lógica de código", valor: "programacao" },
      { titulo: "UX/UI Design", descricao: "Interfaces digitais, protótipos e experiência", valor: "design" },
      { titulo: "Dados e Inteligência Artificial", descricao: "Análise de dados, automação e IA", valor: "dados" },
      { titulo: "Redes e infraestrutura", descricao: "Servidores, nuvem e conectividade", valor: "redes" },
      { titulo: "Segurança da informação", descricao: "Proteção de dados e cibersegurança", valor: "seguranca" },
      { titulo: "Suporte técnico", descricao: "Atendimento, manutenção e resolução técnica", valor: "suporte" },
      { titulo: "Ainda não sei qual área escolher", descricao: "Quero explorar opções para descobrir o que combina comigo", valor: "explorar", full: true }
    ]
  },
  {
    tipo: "unica",
    pergunta: "O que você procura atualmente na área de tecnologia?",
    subtitulo: "Selecione a opção que melhor representa o seu objetivo principal neste momento.",
    opcoes: [
      { titulo: "Cursos gratuitos para começar.", descricao: "Aprender os primeiros conceitos sem custo", valor: "iniciante" },
      { titulo: "Formação profissional na área de tecnologia.", descricao: "Trilhas completas para atuar no mercado", valor: "formacao" },
      { titulo: "Projetos e programas de capacitação.", descricao: "Vivência prática em iniciativas e bootcamps", valor: "capacitacao" },
      { titulo: "Estágio na área de tecnologia.", descricao: "Aprender na prática enquanto estudo", valor: "estagio" },
      { titulo: "Meu primeiro emprego na área de tecnologia.", descricao: "Vaga inicial ou trainee para começar", valor: "emprego" },
      { titulo: "Ainda estou explorando possibilidades.", descricao: "Conhecer caminhos antes de escolher", valor: "explorar" }
    ]
  }
];

// pergunta e respostas salvas
let indiceAtual = 0;
let respostasUsuario = [null, null, null, [], null];

// elementos da tela
const telaIntro = document.getElementById("tela-intro-quiz");
const telaPerguntas = document.getElementById("tela-perguntas");
const btnComecar = document.getElementById("btn-comecar-quiz");

const contadorPergunta = document.getElementById("contador-pergunta");
const porcentagemProgresso = document.getElementById("porcentagem-progresso");
const barraProgresso = document.getElementById("barra-progresso");
const textoPergunta = document.getElementById("texto-pergunta");
const subtituloPergunta = document.getElementById("subtitulo-pergunta");
const opcoesContainer = document.getElementById("opcoes-container");

const btnAnterior = document.getElementById("btn-anterior");
const btnProxima = document.getElementById("btn-proxima");
const btnReiniciar = document.getElementById("btn-reiniciar");

// troca tela de introdução pelas perguntas
btnComecar.addEventListener("click", () => {
  telaIntro.classList.add("oculto");
  telaPerguntas.classList.remove("oculto");
  mostrarPergunta();
});

// monta pergunta na tela
function mostrarPergunta() {
  const atual = perguntas[indiceAtual];
  const numero = indiceAtual + 1;
  const total = perguntas.length;
  const percentual = Math.round((numero / total) * 100);

  contadorPergunta.textContent = `Pergunta ${numero} de ${total}`;
  porcentagemProgresso.textContent = `${percentual}%`;
  barraProgresso.style.width = `${percentual}%`;

  textoPergunta.textContent = atual.pergunta;
  subtituloPergunta.textContent = atual.subtitulo;
  opcoesContainer.innerHTML = "";

  // campo de número idade
  if (atual.tipo === "numero") {
    const div = document.createElement("div");
    div.className = "campo-idade-box";
    div.innerHTML = `
      <input type="number" id="input-idade" class="input-idade" min="10" max="99" placeholder="18" value="${respostasUsuario[indiceAtual] || ""}">
      <span>anos</span>
      <p class="texto-ajuda">${atual.ajuda}</p>
    `;
    opcoesContainer.appendChild(div);

    const inputIdade = document.getElementById("input-idade");
    inputIdade.addEventListener("input", (e) => {
      respostasUsuario[indiceAtual] = e.target.value;
    });
  } else {
// botões das opções
    const grid = document.createElement("div");
    grid.className = "opcoes-grid";

    atual.opcoes.forEach((opcao) => {
      const botao = document.createElement("button");
      botao.type = "button";
      botao.className = "opcao-card";
      if (opcao.full) botao.classList.add("full");

      const selecionada = atual.tipo === "multipla"
        ? respostasUsuario[indiceAtual].includes(opcao.valor)
        : respostasUsuario[indiceAtual] === opcao.valor;

      if (selecionada) botao.classList.add("selecionada");

      const classeCheck = atual.tipo === "multipla" ? "check-bolinha quadrado" : "check-bolinha";

      botao.innerHTML = `
        <div>
          <strong>${opcao.titulo}</strong>
          <span>${opcao.descricao}</span>
        </div>
        <div class="${classeCheck}">${selecionada ? "✓" : ""}</div>
      `;

      botao.addEventListener("click", () => {
        if (atual.tipo === "multipla") {
          const lista = respostasUsuario[indiceAtual];
          if (lista.includes(opcao.valor)) {
            respostasUsuario[indiceAtual] = lista.filter((item) => item !== opcao.valor);
          } else {
            respostasUsuario[indiceAtual].push(opcao.valor);
          }
        } else {
          respostasUsuario[indiceAtual] = opcao.valor;
        }
        mostrarPergunta();
      });

      grid.appendChild(botao);
    });

    opcoesContainer.appendChild(grid);
  }

  btnProxima.textContent = indiceAtual === total - 1 ? "Ver resultado →" : "Continuar →";
}
// botão voltar
btnAnterior.addEventListener("click", () => {
  if (indiceAtual > 0) {
    indiceAtual--;
    mostrarPergunta();
  } else {
    telaPerguntas.classList.add("oculto");
    telaIntro.classList.remove("oculto");
  }
});

btnReiniciar.addEventListener("click", () => {
  indiceAtual = 0;
  respostasUsuario = [null, null, null, [], null];
  mostrarPergunta();
});
// continuar e salvar respostas
btnProxima.addEventListener("click", () => {
  const atual = perguntas[indiceAtual];
  const resp = respostasUsuario[indiceAtual];

  if (atual.tipo === "numero" && (!resp || Number(resp) <= 0)) {
    alert("Por favor, digite uma idade válida para continuar.");
    return;
  }

  if (atual.tipo === "unica" && !resp) {
    alert("Por favor, selecione uma opção antes de continuar.");
    return;
  }

  if (atual.tipo === "multipla" && resp.length === 0) {
    alert("Por favor, selecione pelo menos uma opção antes de continuar.");
    return;
  }

  if (indiceAtual < perguntas.length - 1) {
    indiceAtual++;
    mostrarPergunta();
  } else {
    sessionStorage.setItem("respostasConecta", JSON.stringify(respostasUsuario));
    window.location.href = "resultados.html";
  }
});
