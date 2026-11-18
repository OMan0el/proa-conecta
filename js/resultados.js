const listaResultados = document.getElementById("lista-resultados");
const respostasSalvas = JSON.parse(sessionStorage.getItem("respostasConecta") || "[]");

if (respostasSalvas.length === 0) {
  listaResultados.innerHTML = "<p>Nenhuma resposta encontrada. Faça o quiz primeiro!</p>";
} else {
  const programasRecomendados = calcularRecomendacoes(respostasSalvas);

  programasRecomendados.forEach((programa, index) => {
    const card = document.createElement("article");
    card.className = "card-destaque";

    card.innerHTML = `
      <span class="tag-verde">${index === 0 ? "Mais compatível" : "Outra opção"}</span>
      <h3>${programa.titulo}</h3>
      <p>${programa.descricao}</p>
      <a href="${programa.link}" target="_blank" rel="noopener noreferrer" class="btn-principal">Acessar página oficial →</a>
    `;
    
    //card montado pra tela
    listaResultados.appendChild(card);
  });
}

const btnRefazer = document.getElementById("btn-refazer");
btnRefazer.addEventListener("click", () => {
  sessionStorage.removeItem("respostasConecta");
});