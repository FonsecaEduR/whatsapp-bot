const wppconnect = require('@wppconnect-team/wppconnect');
const fs = require('fs');
const path = require('path');

const LOG_PATH = path.resolve(__dirname, 'clientes_log.json');

// garante que o arquivo exista
if (!fs.existsSync(LOG_PATH)) {
  fs.writeFileSync(LOG_PATH, '{}');
}

wppconnect
  .create({
    session: 'bot',
    headless: true,
    useChrome: false,
    debug: false
  })
  .then((client) => start(client))
  .catch((error) => console.log(error));

function start(client) {

  console.log('Bot iniciado com sucesso.');

  client.onMessage(async (message) => {

    try {

      if (!message.body) return;
      if (message.isGroupMsg) return;
      if (message.fromMe) return;

      const numero = message.chatId;

      if (!numero || typeof numero !== 'string') {
        console.log('ChatId inválido:', numero);
        return;
      }

      const texto = message.body.toLowerCase().trim();

      // 🍽️ CARDÁPIO NORMAL (apenas se a mensagem for exatamente cardapio ou cardápio)
      if (texto === 'cardapio' || texto === 'cardápio') {
        await enviarCardapio(client, numero);
        return;
      }

      // 🍱 CARDÁPIO MARMITA (apenas se a mensagem for exatamente marmita)
      if (texto === 'marmita') {
        await enviarCardapioMarmita(client, numero);
        return;
      }

      // ⏳ verifica janela de 24h
      const podeResponder = verificarJanela(numero);

      if (!podeResponder) {
        console.log('Dentro da janela de 24h:', numero);
        return;
      }

      registrarInteracao(numero);

      const agora = new Date();
      const diaSemana = agora.getDay();
      const saudacao = gerarSaudacao();

      // 🚫 fim de semana
      if (diaSemana === 0 || diaSemana === 6) {

        await client.sendText(
          numero,
          `${saudacao} 👋\n\nHoje não estamos em atendimento.\nRetornamos no próximo dia útil.`
        );

        return;
      }

      // ✅ atendimento normal
      await client.sendText(
        numero,
        `${saudacao} 👋\n\nSeja bem-vindo!\n\n🕒 Horário de funcionamento:\nSegunda a sexta das 08h às 22h.\n\n🍽️ Almoço: das 11h às 14h\n🌙 Jantar: das 18h às 20h30\n\nDigite *cardápio* para receber nossas opções de pratos.\nOu digite *marmita* para ver nosso cardápio de marmitas.`
      );

    } catch (erro) {
      console.log('Erro capturado:', erro);
    }

  });

}

function gerarSaudacao() {

  const hora = new Date().getHours();

  if (hora >= 5 && hora < 12) return 'Bom dia';
  if (hora >= 12 && hora < 18) return 'Boa tarde';
  return 'Boa noite';

}

function lerJSONSeguro() {

  try {

    const conteudo = fs.readFileSync(LOG_PATH, 'utf8');
    if (!conteudo) return {};

    return JSON.parse(conteudo);

  } catch {

    return {};

  }

}

function verificarJanela(numero) {

  const dados = lerJSONSeguro();
  const ultimoContato = dados[numero];

  if (!ultimoContato) return true;

  const agora = Date.now();
  const diferenca = agora - ultimoContato;

  return diferenca > 24 * 60 * 60 * 1000;

}

function registrarInteracao(numero) {

  const dados = lerJSONSeguro();

  dados[numero] = Date.now();

  fs.writeFileSync(LOG_PATH, JSON.stringify(dados, null, 2));

}

async function enviarCardapio(client, numero) {

  const img1 = path.resolve(__dirname, 'midia', 'cardapio1.jpg');
  const img2 = path.resolve(__dirname, 'midia', 'cardapio2.jpg');

  if (!fs.existsSync(img1) || !fs.existsSync(img2)) {

    await client.sendText(numero, 'Erro interno ao carregar o cardápio.');
    return;

  }

  await client.sendImage(numero, img1, 'cardapio1', 'Cardápio - Parte 1');
  await client.sendImage(numero, img2, 'cardapio2', 'Cardápio - Parte 2');

}

async function enviarCardapioMarmita(client, numero) {

  const img1 = path.resolve(__dirname, 'midia', 'marmita1.jpg');
  const img2 = path.resolve(__dirname, 'midia', 'marmita2.jpg');

  if (!fs.existsSync(img1) || !fs.existsSync(img2)) {

    await client.sendText(numero, 'Erro interno ao carregar o cardápio de marmitas.');
    return;

  }

  await client.sendImage(numero, img1, 'marmita1', 'Cardápio de Marmitas - Parte 1');
  await client.sendImage(numero, img2, 'marmita2', 'Cardápio de Marmitas - Parte 2');

}