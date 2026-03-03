# WhatsApp Bot - Atendimento Automático

![Node](https://img.shields.io/badge/Node.js-20+-green)
![Status](https://img.shields.io/badge/status-estável-brightgreen)
![License](https://img.shields.io/badge/license-Uso%20Interno-blue)

Bot de atendimento automático para WhatsApp desenvolvido em Node.js utilizando a biblioteca @wppconnect-team/wppconnect.

---

## 🚀 Funcionalidades

- Saudação automática (Bom dia / Boa tarde / Boa noite)
- Resposta automática para qualquer mensagem recebida
- Verificação de horário de funcionamento
- Aviso automático fora do horário comercial
- Envio automático de cardápio
- Respeito à janela de 24 horas do WhatsApp
- Registro básico de clientes
- Estrutura preparada para expansão

---

## 🛠 Stack Tecnológica

- Node.js
- @wppconnect-team/wppconnect
- PM2 (para produção)

---

## 📦 Requisitos do Sistema

- Node.js 20+ (LTS recomendado)
- 4GB de RAM mínimo
- Internet estável
- Windows 10/11 ou Linux
- Computador configurado para não entrar em suspensão

---

## 🔧 Instalação Local

Clone o repositório:

git clone https://github.com/FonsecaEduR/whatsapp-bot.git

Acesse a pasta do projeto:

cd whatsapp-bot

Instale as dependências:

npm install

Execute o bot:

node server.js

Escaneie o QR Code exibido no terminal com o WhatsApp.

---

## ▶ Execução em Produção (Recomendado)

Instale o PM2 globalmente:

npm install -g pm2

Inicie o bot:

pm2 start server.js
pm2 save

Para visualizar logs:

pm2 logs

Para reiniciar:

pm2 restart server.js

---

## 🏗 Arquitetura Simplificada

Usuário WhatsApp
        ↓
WPPConnect (Chromium)
        ↓
server.js
        ↓
Regras de Negócio
        ↓
Envio de Respostas / Cardápio

---

## ⏰ Configuração de Horário

O horário de funcionamento é configurado diretamente no arquivo server.js.

Exemplo:

const horarioInicio = 8;
const horarioFim = 18;

Fora desse intervalo, o bot envia mensagem automática informando indisponibilidade.

---

## 📁 Estrutura do Projeto

whatsapp-bot/
│
├── server.js
├── package.json
├── package-lock.json
├── README.md
├── clientes.json
├── clientes_log.json
├── midia/
└── tokens/ (ignorado no Git)

---

## 🔐 Segurança

- A pasta tokens/ não deve ser versionada.
- O arquivo .env (caso utilizado) deve estar no .gitignore.
- Não versionar node_modules.
- Não executar o bot como administrador.
- Garantir que o computador não entre em suspensão.

---

## ☁ Deploy em Outro Computador

1. Instalar Node.js 20+
2. Clonar o repositório
3. Executar npm install
4. Executar node server.js
5. Escanear QR Code novamente

A sessão é vinculada à máquina.

---

## 📌 Controle de Versão

Versão inicial estável para atendimento automatizado.

Sugestão de versionamento futuro:
v1.0.0 - Base funcional
v1.1.0 - Melhorias de fluxo
v2.0.0 - Integração com API externa

---

## 🗺 Roadmap

- Implementar banco de dados real
- Integração com sistema de pedidos
- Dashboard administrativo
- Integração com API de pagamento
- Deploy em VPS
- Containerização com Docker

---

## 👨‍💻 Autor

Eduardo Fonseca

Projeto de automação para atendimento via WhatsApp.
