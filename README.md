# 🤖 WhatsApp Bot - Atendimento Automático

![Node](https://img.shields.io/badge/Node.js-20+-green)
![Status](https://img.shields.io/badge/status-estável-brightgreen)
![License](https://img.shields.io/badge/license-Uso%20Interno-blue)

Bot de atendimento automático para WhatsApp utilizando WPPConnect, com controle de fluxo, janela de 24h e envio automatizado de cardápios.

---

## 🚀 O que esse bot faz (na prática)

- Responde automaticamente qualquer mensagem recebida  
- Envia saudação inteligente baseada no horário  
- Respeita a janela de 24h (evita spam)  
- Bloqueia respostas fora do horário comercial  
- Envia cardápio por comando:
  - `cardapio` ou `cardápio`
  - `marmita`
- Envia imagens automaticamente  
- Registra última interação do cliente  

---

## 🧠 Regras de Negócio

### 📩 Respostas automáticas
O bot responde apenas mensagens que:
- Não são de grupo  
- Não foram enviadas pelo próprio bot  
- Possuem conteúdo de texto válido  

---

### ⏱ Janela de 24 horas
Após responder um cliente, o bot só volta a responder automaticamente após 24 horas.

Arquivo responsável:
clientes_log.json

---

### 📅 Dias de funcionamento
- Segunda a sexta → atendimento normal  
- Sábado e domingo → mensagem de indisponibilidade  

---

### 🕒 Horário
Definido diretamente no código:

- Atendimento geral: 08h às 22h  
- Almoço: 11h às 14h  
- Jantar: 18h às 20h30  

---

### 🍽 Comandos disponíveis

| Comando   | Ação                         |
|----------|------------------------------|
| cardapio | Envia cardápio normal        |
| cardápio | Envia cardápio normal        |
| marmita  | Envia cardápio de marmitas   |

---

## 🛠 Stack

- Node.js  
- WPPConnect  
- PM2 (produção)  

---

## 📦 Requisitos

- Node.js 20+  
- Google Chrome instalado (recomendado)  
- 4GB RAM mínimo  
- Internet estável  
- Máquina sem suspensão automática  

---

## 🔧 Instalação (passo a passo)

git clone https://github.com/FonsecaEduR/whatsapp-bot.git  
cd whatsapp-bot  
npm install  
node server.js  

➡ Escaneie o QR Code com o WhatsApp  

---

## ⚠️ Instalação em outra máquina

- Será necessário escanear o QR Code novamente  
- A sessão NÃO é compartilhada entre máquinas  
- A pasta tokens/ será recriada automaticamente  

---

## ▶ Execução em produção (PM2)

npm install -g pm2  
pm2 start server.js --name whatsapp-bot  
pm2 save  

### Comandos úteis:

pm2 logs  
pm2 restart whatsapp-bot  
pm2 stop whatsapp-bot  

---

## 📁 Estrutura do Projeto

whatsapp-bot/
│
├── server.js  
├── package.json  
├── README.md  
├── clientes_log.json  
├── midia/  
│   ├── cardapio1.jpg  
│   ├── cardapio2.jpg  
│   ├── marmita1.jpg  
│   └── marmita2.jpg  
└── tokens/ (ignorado no git)  

---

## 🖼 Arquivos obrigatórios

Certifique-se de que existem:

/midia/cardapio1.jpg  
/midia/cardapio2.jpg  
/midia/marmita1.jpg  
/midia/marmita2.jpg  

Se não existirem, o bot não enviará os cardápios.

---

## 🔐 Boas práticas de segurança

- Nunca subir:
  - tokens/  
  - node_modules/  
  - .env  
- Não rodar como administrador  
- Evitar VPS sem interface gráfica  

---

## 🧩 Arquitetura

WhatsApp  
↓  
WPPConnect (Chromium)  
↓  
server.js  
↓  
Regras de negócio  
↓  
Resposta automática  

---

## 🚧 Limitações atuais

- Não utiliza banco de dados (apenas JSON local)  
- Não possui painel administrativo  
- Sessão depende da máquina  

---

## 🗺 Roadmap

- Banco de dados (MongoDB ou PostgreSQL)  
- Dashboard web  
- Integração com pedidos  
- API externa  
- Docker  
- Deploy em VPS  

---

## 👨‍💻 Autor

Eduardo Fonseca  

Projeto focado em automação de atendimento via WhatsApp com baixo custo e alta eficiência.