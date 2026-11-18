function calcularRecomendacoes(respostas) {
  const contagem = {};
  
  respostas.forEach((area) => {
    contagem[area] = (contagem[area] || 0) + 1;
  });

  const areaPrincipal = Object.keys(contagem).reduce((a, b) =>
    contagem[a] >= contagem[b] ? a : b
  );

  const compativeis = catalogoProgramas.filter((p) => p.area === areaPrincipal);
  const outras = catalogoProgramas.filter((p) => p.area !== areaPrincipal);

  return [...compativeis, ...outras.slice(0, 1)];
}
