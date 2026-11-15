# Conecta

## Sobre o projeto
O Conecta é uma plataforma que aproxima jovens de oportunidades gratuitas de educação e desenvolvimento profissional na área de tecnologia. Nossa missão é servir como uma ponte entre pessoas interessadas em se profissionalizar e instituições que oferecem programas de capacitação tecnológica.

Por meio de um questionário simples e intuitivo, buscamos ajudar nossos usuários a descobrir oportunidades que façam sentido para seus interesses, objetivos e realidade.

## Objetivo
Nosso principal objetivo é facilitar o acesso à educação e à qualificação profissional na área de tecnologia, ajudando jovens a identificar oportunidades de aprendizagem compatíveis com seus perfis.

Para isso, utilizaremos um quiz interativo que analisará as respostas dos usuários e apresentará recomendações de programas educacionais gratuitos.

Queremos ajudar jovens interessados em ingressar no mercado de tecnologia a encontrar oportunidades de aprendizagem que contribuam para seu desenvolvimento pessoal e profissional.

## Tecnologias utilizadas
As principais tecnologias usadas para o desenvolvimento do projeto são:
- **HTML5:** estrutura e conteúdo das páginas.
- **CSS3:** estilização, organização visual e responsividade.
- **JavaScript:** interatividade, funcionamento do quiz e recomendações.

## Funcionalidades 
Algumas das funcionalidades planejadas para a plataforma são:
- [ ]  **Página inicial:** Apresentação do Conecta e botão para iniciar o quiz.
- [ ]  **Quiz:** Perguntas interativas, registro de respostas e navegação entre perguntas.
- [ ]  **Resultados:** Recomendações de programas de tecnologia, informações e links oficiais.
- [ ]  **Refazer quiz:** Permitir que o usuário responda novamente às perguntas.
- [ ]  **Validação das respostas:** Impedir que o questionário seja finalizado sem responder às perguntas obrigatórias.

## Estrutura do projeto

O projeto está organizado em diretórios que separam a estrutura das páginas, os estilos visuais e as funcionalidades JavaScript, facilitando o desenvolvimento colaborativo e a manutenção do código.

```text
proa-conecta/
│
├── .github/
│   └── pull_request_template.md
│
├── css/
│   └── style.css
│
├── javascript/
│   ├── quiz.js
│   ├── programas.js
│   ├── recomendacao.js
│   └── resultados.js
│
├── index.html
├── quiz.html
├── resultados.html
│
└── README.md
```

### Organização dos arquivos

- **index.html:** estrutura da página inicial da plataforma.
- **quiz.html:** estrutura da página do questionário interativo.
- **resultados.html:** estrutura da página de recomendações.
- **css/style.css:** arquivo responsável pelos estilos visuais compartilhados entre as páginas.
- **javascript/quiz.js:** controle das perguntas, respostas e navegação do quiz.
- **javascript/programas.js:** armazenamento dos dados dos programas educacionais.
- **javascript/recomendacao.js:** processamento das respostas e aplicação das regras de recomendação.
- **javascript/resultados.js:** apresentação dos programas recomendados ao usuário.
- **.github/pull_request_template.md:** modelo utilizado para padronizar os Pull Requests.
- **README.md:** documentação e apresentação geral do projeto.

## Equipe 
| Nome | Função | GitHub |
| --- | --- | --- |
| Pedro Manoel | Tech Lead | [Perfil](https://github.com/OMan0el) |

## Status do projeto
Atualmente, o Conecta está em fase de estruturação e desenvolvimento. As funcionalidades planejadas serão implementadas progressivamente.
