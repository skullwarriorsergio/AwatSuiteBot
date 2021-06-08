
//-----------Requires-----------
require('dotenv').config({path: __dirname + '/.env'});
const { Telegraf } = require('telegraf');
const HttpsProxyAgent = require('https-proxy-agent');
const fs = require('fs');
const bot = new Telegraf(process.env['token'], {
    telegram: {
      agent: new HttpsProxyAgent('http://127.0.0.1:51515')
    }});
var menu=require('./modules/menu');
menu.Init(bot);
//-----------Code-----------

bot.command('start', ctx => {  
    ctx.deleteMessage(); 
    var msg =`Hola <strong>${ctx.from.first_name}</strong>!\n`;
    msg += 'Bienvenido al bot de ayuda de la <strong>Suite Awat</strong>.\n';
    msg += 'Comandos disponibles:\n';
    msg += ' /awatsuite';
    ctx.replyWithHTML(msg); 
})	

bot.command('quit', (ctx) => {
    try
    {
        ctx.leaveChat()
    }
    catch
    {}
})

bot.command('awatsuite', ctx => {
    menu.ShowMenu(bot, ctx)
})
bot.on('callback_query', (ctx) => {
    ctx.answerCbQuery()
})
bot.on('inline_query', (ctx) => {
  const result = []
  // Using context shortcut
  ctx.answerInlineQuery(result)
})

bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))