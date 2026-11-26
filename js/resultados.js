// elementos da tela
const listaResultados = document.getElementById("lista-resultados");
const botoesFiltro = document.querySelectorAll(".filtro-btn");
const btnRefazer = document.getElementById("btn-refazer");
const avisoSemQuiz = document.getElementById("aviso-sem-quiz");

// pega as respostas salvas na sessão
const respostasSalvas = JSON.parse(sessionStorage.getItem("respostasConecta"));

// mostra o aviso se alguém abrir a página direto sem fazer o quiz
if (!respostasSalvas && avisoSemQuiz) {
  avisoSemQuiz.classList.remove("oculto");
}

// exemplos temporários
const exemplosTemporarios = [
  {
    nome: "Instituição Exemplo 1",
    subtitulo: "Área de Formação (dados)",
    categoria: "Formação Tech",
    descricao: "Descrição oficial do programa cadastrada em programas.js.",
    rodape: "Gratuito · Online",
    link: "#"
  },
  {
    nome: "Instituição Exemplo 2",
    subtitulo: "Oportunidade Inicial (dados)",
    categoria: "Primeiro Emprego",
    descricao: "Descrição da vaga ou programa de estágio/aprendizagem.",
    rodape: "Gratuito · Online",
    link: "#"
  },
  {
    nome: "Comunidade Exemplo 3",
    subtitulo: "Comunidade Tech (dados)",
    categoria: "Comunidades",
    descricao: "Descrição da comunidade ou trilha gratuita para iniciantes.",
    rodape: "Gratuito · Comunidade",
    link: "#"
  }
];

// puxa lista
function obterProgramasParaExibir() {
  if (typeof calcularRecomendacoes === "function" && respostasSalvas) {
    const recomendados = calcularRecomendacoes(respostasSalvas);
    if (Array.isArray(recomendados) && recomendados.length > 0) {
      return recomendados;
    }
  }
  return exemplosTemporarios;
}

// desenha os cards na tela conforme o filtro escolhido
function renderizarCards(filtro = "todas") {
  listaResultados.innerHTML = "";
  const listaBase = obterProgramasParaExibir();

  const filtrados = filtro === "todas"
    ? listaBase
    : listaBase.filter((item) => item.categoria === filtro);

  filtrados.forEach((programa) => {
    const card = document.createElement("article");
    card.className = "card-branco card-programa";

    card.innerHTML = `
      <div>
        <span class="tag-azul">${programa.categoria || "Tecnologia"}</span>
        <h3>${programa.nome}</h3>
        <p class="programa-subtitulo">${programa.subtitulo || programa.instituicao || "Programa gratuito"}</p>
        <p class="texto-card">${programa.descricao}</p>
      </div>

      <div class="card-rodape">
        <span>${programa.rodape || programa.modalidade || "Gratuito"}</span>
        <a href="${programa.link || programa.linkOficial || "#"}" target="_blank" rel="noopener noreferrer">Acessar site ↗</a>
      </div>
    `;

    listaResultados.appendChild(card);
  });
}

// clique nos botões de filtro
botoesFiltro.forEach((botao) => {
  botao.addEventListener("click", () => {
    botoesFiltro.forEach((b) => b.classList.remove("ativo"));
    botao.classList.add("ativo");
    renderizarCards(botao.dataset.filtro);
  });
});

if (btnRefazer) {
  btnRefazer.addEventListener("click", () => {
    sessionStorage.removeItem("respostasConecta");
  });
}

renderizarCards("todas");
