📦 Stokup

Sistema completo de controle de estoque para varejo focado em tomada de decisão rápida, prevenção de rupturas e visualização clara do status dos produtos.

Projeto desenvolvido para demonstrar habilidades reais de Front-End aplicadas a um cenário de negócio — não é apenas CRUD, é uma aplicação com regras, métricas e comportamento de produção.

✨ Demonstração

🔗 Sistema: http://stokup-frontend.s3-website.us-east-2.amazonaws.com/login

🎯 Problema resolvido

No varejo físico, a ruptura de estoque geralmente acontece por falta de visibilidade:

Não sabem quantos dias o produto ainda dura

Não percebem consumo acelerado

Descobrem a falta apenas quando o cliente chega

O Stokup transforma dados simples em informação acionável.

Ele responde:

"Quanto tempo ainda tenho antes de faltar produto?"

🧠 Principais funcionalidades
Dashboard Inteligente

Métricas em tempo real

Status automático de produtos

Cálculo de cobertura (days of coverage)

Visão geral da saúde do estoque

Gestão de Produtos e Lojas

Cadastro de produtos com GTIN e SKU

Controle por múltiplas lojas

Regras de negócio aplicadas (não é CRUD simples)

Controle de Estoque

Estoque inicial

Consumo diário

Estoque mínimo

Atualização automática de status

Visualização de Dados

Tabelas dinâmicas

Gráficos de status

Resumo operacional

🧩 Regra de negócio implementada (caso real)

Um produto não pode ser excluído se ainda existir estoque vinculado.

Isso evita inconsistências e simula comportamento esperado em sistemas corporativos.

🛠️ Stack utilizada

Front-End

React

TypeScript

TailwindCSS

React Router

Hooks customizados

Arquitetura modular

Integração

API REST autenticada (JWT)

Tratamento de erros de servidor

Estados de loading e feedback ao usuário

UI/UX

Feedback visual de sucesso/erro

Modais controlados

Filtros dinâmicos

Interface limpa orientada a operação

🧱 Arquitetura

O projeto foi estruturado visando escalabilidade:

src/
  api/
  components/
  hooks/
  pages/
  types/
  layouts/

Padrões aplicados

Separação clara entre UI e lógica

Hooks reutilizáveis para cada operação

Tipagem forte

Tratamento de estado previsível

Componentização orientada a domínio

📊 O que este projeto demonstra

Construção de aplicações reais com React

Consumo de APIs autenticadas

Organização de código escalável

Modelagem de estados complexos

Implementação de regras de negócio no front

UX pensada para uso operacional

Visualização de dados útil (não apenas estética)

🚀 Como rodar o projeto
git clone [repo]
cd stokup
npm install
npm run dev

💡 Sobre o objetivo do projeto

Este sistema foi desenvolvido como peça principal de portfólio para demonstrar capacidade de:

Entender problemas de negócio

Traduzir requisitos em interface funcional

Criar aplicações próximas do ambiente corporativo

Entregar algo além de telas estáticas

👨‍💻 Autor

Vinicius Vicente Pereira Rosa
Front-End Developer

LinkedIn: https://www.linkedin.com/in/vinicius-vicente-developer?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BZyr3Sf4ZTP%2BQQRdIsM%2BsOw%3D%3D

