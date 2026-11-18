const perguntas = [
  {
    texto: "Pergunta 1",
    opcoes: [
      { letra: "A", texto: "Opção A", area: "jogos" },
      { letra: "B", texto: "Opção B", area: "esporte" },
      { letra: "C", texto: "Opção C", area: "musica" },
      { letra: "D", texto: "Opção D", area: "idiomas" }
    ]
  },
  {
    texto: "Pergunta 2",
    opcoes: [
      { letra: "A", texto: "Opção A", area: "jogos" },
      { letra: "B", texto: "Opção B", area: "esporte" },
      { letra: "C", texto: "Opção C", area: "musica" },
      { letra: "D", texto: "Opção D", area: "idiomas" }
    ]
  },
  {
    texto: "Pergunta 3",
    opcoes: [
      { letra: "A", texto: "Opção A", area: "jogos" },
      { letra: "B", texto: "Opção B", area: "esporte" },
      { letra: "C", texto: "Opção C", area: "musica" },
      { letra: "D", texto: "Opção D", area: "idiomas" }
    ]
  },
  {
    texto: "Pergunta 4",
    opcoes: [
      { letra: "A", texto: "Opção A", area: "jogos" },
      { letra: "B", texto: "Opção B", area: "esporte" },
      { letra: "C", texto: "Opção C", area: "musica" },
      { letra: "D", texto: "Opção D", area: "idiomas" }
    ]
  }
];

// mostra pergunta onde o usuário está e respostas escolhidas
let indiceAtual = 0;
let respostasUsuario = [];

// elementos da tela "quiz" pelo ID
const textoPergunta = document.getElementById("texto-pergunta");
const opcoesContainer = document.getElementById("opcoes-container");
const barraProgresso = document.getElementById("barra-progresso");
const contadorPergunta = document.getElementById("contador-pergunta");
const porcentagemProgresso = document.getElementById("porcentagem-progresso");
const btnAnterior = document.getElementById("btn-anterior");
const btnReiniciar = document.getElementById("btn-reiniciar");
const btnProxima = document.getElementById("btn-proxima");

// mostra pergunta atual e criação dos botões a, b, c e d na tela
function mostrarPergunta() {
  const atual = perguntas[indiceAtual];
  textoPergunta.textContent = atual.texto;
  contadorPergunta.textContent = `Pergunta ${indiceAtual + 1} de ${perguntas.length}`;
  barraProgresso.style.width = `${((indiceAtual + 1) / perguntas.length) * 100}%`;
    const percentual = Math.round(((indiceAtual + 1) / perguntas.length) * 100);
  porcentagemProgresso.textContent = `${percentual}%`;


  // sai botões antigos e entra novos da pergunta atual
  opcoesContainer.innerHTML = "";
  atual.opcoes.forEach((opcao) => {
    const botao = document.createElement("button");
    botao.className = "opcao-btn";
    botao.innerHTML = `<span class="letra-opcao">${opcao.letra}</span> <span>${opcao.texto}</span>`;

    // mantém opção marcada se quiser voltar pra ver
    if (respostasUsuario[indiceAtual] === opcao.area) {
      botao.classList.add("selecionada");
    }

    // salva área escolhida quando clica e destaca o botão marcado
    botao.addEventListener("click", () => {
      respostasUsuario[indiceAtual] = opcao.area;
      document.querySelectorAll(".opcao-btn").forEach((b) => b.classList.remove("selecionada"));
      botao.classList.add("selecionada");
    });

    //cada botão criado dentro da caixa de opções na tela
    opcoesContainer.appendChild(botao);
  });

  // esconde botão voltar na 1 questão e muda o texto na última
 btnAnterior.classList.toggle("oculto", indiceAtual === 0);
  btnProxima.textContent = indiceAtual === perguntas.length - 1 ? "Concluir quiz" : "Próxima";
}

btnAnterior.addEventListener("click", () => {
  if (indiceAtual > 0) {
    indiceAtual--;
    mostrarPergunta();
  }
});

btnReiniciar.addEventListener("click", () => {
  indiceAtual = 0;
  respostasUsuario = [];
  sessionStorage.removeItem("respostasConecta");
  mostrarPergunta();
});

btnProxima.addEventListener("click", () => {
  if (!respostasUsuario[indiceAtual]) {
    alert("Selecione uma opção antes de continuar!");
    return;
  }

  if (indiceAtual < perguntas.length - 1) {
    indiceAtual++;
    mostrarPergunta();
  } else {
    
    //guarda respostas no navegador pra página resultados.html ler
    sessionStorage.setItem("respostasConecta", JSON.stringify(respostasUsuario));
    window.location.href = "resultados.html";
  }
});

mostrarPergunta();
