# Arquitetura técnica — PROA Conecta

**Versão:** 0.1 — proposta para revisão da equipe  
**Issue relacionada:** #1 — Definir a arquitetura inicial do projeto  
**Responsável pela proposta:** Tech Lead  
**Prazo da Sprint 1:** 18/11/2026

> **Status:** este documento apresenta a arquitetura inicial proposta. As regras de elegibilidade, perguntas do quiz e pontuação de compatibilidade dependem da pesquisa e da validação da equipe. Elas **não** estão definidas aqui.

## 1. Objetivo do projeto

Desenvolver uma plataforma web que ajude jovens a descobrir oportunidades gratuitas de educação, capacitação e desenvolvimento profissional, a partir de respostas a um quiz. O site apresentará informações sobre programas e links para páginas oficiais; não fará inscrições nem prometerá elegibilidade ou aprovação.

## 2. Escopo técnico do MVP

O MVP terá três páginas:

1. `index.html` — apresenta a proposta da plataforma e o botão para iniciar o quiz.
2. `quiz.html` — apresenta as perguntas, registra respostas e permite concluir ou reiniciar o quiz.
3. `resultados.html` — apresenta programas compatíveis e links oficiais, além da opção para refazer o quiz.

Não fazem parte do MVP: login, cadastro de usuários, banco de dados, painel administrativo, inteligência artificial ou integração obrigatória com APIs externas.

## 3. Tecnologias e hospedagem

- **HTML5:** estrutura semântica das páginas.
- **CSS3:** estilos e responsividade (Flexbox e/ou Grid).
- **JavaScript puro:** quiz, processamento das respostas e apresentação dos resultados.
- **Git e GitHub:** versionamento, Issues e Pull Requests.
- **GitHub Pages (proposta):** publicação do site estático.

A aplicação será executada no navegador, sem backend próprio nesta versão.

## 4. Estrutura de diretórios proposta

```text
proa-conecta/
├── index.html
├── quiz.html
├── resultados.html
├── css/
│   └── style.css
├── js/
│   ├── quiz.js
│   ├── programas.js
│   ├── recomendacao.js
│   └── resultados.js
├── assets/
│   └── images/
├── docs/
│   └── arquitetura.md
├── .github/
│   └── pull_request_template.md
├── README.md
└── CONTRIBUTING.md
```

**Nota:** os arquivos `CONTRIBUTING.md` e `.github/pull_request_template.md` constam como parte da estrutura desejada; podem ainda não estar integrados à branch `main`.

## 5. Responsabilidade dos arquivos JavaScript

| Arquivo | Responsabilidade |
| --- | --- |
| `quiz.js` | Renderizar/controlar as perguntas, validar respostas obrigatórias e armazenar as respostas da sessão. |
| `programas.js` | Manter o catálogo de oportunidades em formato estruturado, com dados verificados pela pesquisa. |
| `recomendacao.js` | Aplicar requisitos obrigatórios e, posteriormente, calcular/ordenar compatibilidades segundo regras aprovadas. |
| `resultados.js` | Recuperar respostas da sessão e exibir mensagens e cartões de resultados. |

Os desenvolvedores alinharão a forma de importar/compartilhar os dados entre os scripts antes da implementação, para evitar variáveis globais e duplicação da lógica.

## 6. Fluxo da aplicação

```text
index.html
   ↓ botão "Começar"
quiz.html
   ↓ respostas validadas
sessionStorage (somente dados necessários à sessão)
   ↓
resultados.html
   ↓ lê respostas + catálogo de programas
recomendacao.js
   ↓ filtra elegibilidade e calcula compatibilidade
resultados.html
   ↓ cards com informações e links oficiais
sites das instituições
```

A página de resultados deverá tratar o acesso direto sem respostas salvas, orientando a pessoa a iniciar o quiz. A opção "Refazer quiz" deve limpar as respostas anteriores relevantes para o quiz.

## 7. Armazenamento e privacidade

- Utilizar **`sessionStorage`** como proposta inicial para transportar as respostas entre `quiz.html` e `resultados.html` na mesma aba e origem.
- Não solicitar nome completo, CPF, telefone ou endereço para a recomendação.
- Não enviar as respostas a serviços externos.
- Não assumir que respostas permanecerão disponíveis após o encerramento da sessão.
- Testar o fluxo em ambiente servido por HTTP/HTTPS (ex.: GitHub Pages ou servidor local); abrir HTML pelo protocolo `file://` pode ter comportamento diferente.

## 8. Modelo preliminar de dados

A estrutura definitiva dependerá das informações verificadas pelo responsável por Pesquisa e Conteúdo (Issue #8).

Exemplo **ilustrativo** de campos, sem dados reais:

```javascript
const programaExemplo = {
  id: 'programa-exemplo',
  nome: 'Programa de exemplo',
  instituicao: 'Instituição fictícia',
  descricao: 'Descrição ilustrativa',
  areas: ['tecnologia'],
  modalidade: 'online',
  requisitos: {},
  linkOficial: 'https://example.com',
  ultimaVerificacao: null
};
```

**Atenção:** nenhum campo do exemplo deve ser tomado como requisito confirmado de um programa real.

## 9. Política de recomendação (a validar)

1. **Elegibilidade:** primeiro avaliar requisitos obrigatórios **confirmados** de cada oportunidade.
2. **Compatibilidade:** depois, quando houver critérios definidos, ordenar as opções elegíveis conforme interesses e preferências declarados.
3. **Informações desconhecidas:** não tratar requisitos não verificados como se estivessem cumpridos; sinalizar incerteza ao usuário, quando necessário.
4. **Sem resultados:** apresentar uma mensagem clara e a opção de refazer o quiz.
5. **Transparência:** uma recomendação não garante vaga, inscrição ou aprovação.

**Pendente:** regras específicas de elegibilidade, pesos de pontuação, perguntas e alternativas (Issues #8 e #9, em conjunto com #6 e #11).

## 10. Convenções técnicas propostas

- Nomes de arquivos: letras minúsculas; usar hífen quando necessário.
- Classes CSS: `kebab-case` (por exemplo, `programa-card`).
- Variáveis e funções JavaScript: `camelCase` (por exemplo, `calcularCompatibilidade`).
- Indentação: 2 espaços.
- HTML semântico e textos alternativos em imagens informativas.
- Interface navegável por teclado e adaptável a telas pequenas.
- Evitar estilos inline e duplicação de código.
- Não integrar alterações diretamente na `main`; usar branches e Pull Requests.

## 11. Fluxo de contribuição proposto

1. Integrante assume uma Issue e altera seu status para **Em andamento**.
2. Cria uma branch a partir de `main`, nomeada conforme o trabalho (`feature/...`, `fix/...`, `docs/...`).
3. Faz commits pequenos, com mensagens descritivas.
4. Abre Pull Request mencionando a Issue relacionada.
5. Tech Lead ou revisor designado analisa; QA testa quando aplicável.
6. Após aprovação, o PR é integrado à `main`; a Issue só é encerrada quando seus critérios de aceitação forem atendidos.

## 12. Dependências e decisões pendentes

| Tema pendente | Responsável principal / referência | Impacto |
| --- | --- | --- |
| Catálogo real de oportunidades, requisitos e links | Pesquisa e Conteúdo — Issue #8 | Define campos e regras de elegibilidade. |
| Perguntas e alternativas definitivas | Pesquisa e Conteúdo — Issue #9 | Define formato de respostas do quiz. |
| Algoritmo e critérios de pontuação | Desenvolvedor JavaScript — Issue #6 | Define a lógica de recomendação. |
| Escopo/requisitos aprovados do MVP | Product Owner — Issue #11 | Confirma critérios de aceitação do produto. |
| Sitemap e wireframes | UX/UI — Issues #3 e #4 | Define detalhes de navegação e interface. |
| Estratégia de importação dos módulos JavaScript | Tech Lead + Desenvolvedor JavaScript | Evita problemas na integração entre arquivos. |

## 13. Critérios para aprovar esta versão da arquitetura

- [ ] Três páginas e suas responsabilidades identificadas.
- [ ] Tecnologias e escopo técnico documentados.
- [ ] Estrutura de pastas e arquivos proposta.
- [ ] Fluxo do quiz até os resultados documentado.
- [ ] Abordagem de armazenamento temporário definida.
- [ ] Responsabilidades dos módulos JavaScript descritas.
- [ ] Padrões de desenvolvimento e fluxo de PR registrados.
- [ ] Decisões dependentes da pesquisa explicitamente sinalizadas.
- [ ] Documento revisado pelo Tech Lead e compartilhado com os desenvolvedores.
