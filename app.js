//
var http = require('http');
http.createServer(function (req, res)
{
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.send('Bot is running\n');
}).listen(process.env.PORT || 5000);

//-----------Requires-----------
require('dotenv').config({path: __dirname + '/.env'});
const { Telegraf } = require('telegraf');
const HttpsProxyAgent = require('https-proxy-agent');
const fs = require('fs');
var bot = null;
console.log(process.env['proxy']);
if (process.env['proxy'] == 'true')
{
    bot = new Telegraf(process.env['token'], {
    telegram: {
      agent: new HttpsProxyAgent('http://127.0.0.1:51515')
    }});
}
else
{
    bot = new Telegraf(process.env['token']);
}
var menu=require('./modules/menu');
bot.telegram.getMe().then((botInfo) => {
    bot.options.username = botInfo.username
  })
menu.Init(bot);
//-----------Code-----------

bot.command('start', ctx => {      
    Welcome(ctx) ;   
});
bot.command('hello', ctx => {      
    Welcome(ctx) ;    
});
bot.command('hola', ctx => { 
    Welcome(ctx) ;
});
function Welcome(ctx)
{
    if (ctx.chat.id === ctx.from.id)
    {
        MainMenu(ctx);
    }
    else
    {
        var msg =`Hola <strong>${ctx.from.first_name}</strong>!\n`;
        msg += 'Soy bot de ayuda de la <strong>Suite Awat</strong>.\n';
        msg += 'Comandos disponibles:\n';
        msg += ' /awatsuite';
        ctx.replyWithHTML(msg);  
    }
}

//-----commands-----
bot.command('quit', (ctx) => {
    try
    {
        ctx.leaveChat()
    }
    catch
    {}
});
bot.command('awatsuite', ctx => {
    if (ctx.chat.id != ctx.from.id)
    {
        let menuMSG = `Hola <b>${ctx.from.first_name}</b>\nTe he enviado un mensaje privado para iniciar el asistente de ayuda.\nNos vemos allí.`;
        ctx.replyWithHTML(menuMSG);
    }        
    MainMenu(ctx);
});
//-----hears-----
bot.hears('Hola', ctx => {
    if (ctx.chat.id === ctx.from.id)
    {
        MainMenu(ctx);
    }
});
bot.hears('Hello', ctx => {
    if (ctx.chat.id === ctx.from.id)
    {
        MainMenu(ctx);
    }
});
bot.hears('hola', ctx => {
    if (ctx.chat.id === ctx.from.id)
    {
        MainMenu(ctx);
    }
});
bot.hears('hello', ctx => {
    if (ctx.chat.id === ctx.from.id)
    {
        MainMenu(ctx);
    }
});
bot.hears('Awatsuite', ctx => {
    if (ctx.chat.id != ctx.from.id)
    {
        let menuMSG = `Preguntabas por mi <b>${ctx.from.first_name}</b>?\nTe he enviado un mensaje privado para iniciar el asistente de ayuda.\nNos vemos allí.`;
        ctx.replyWithHTML(menuMSG);
    }
    MainMenu(ctx);
});
bot.hears('awatsuite', ctx => {
    if (ctx.chat.id != ctx.from.id)
    {
        let menuMSG = `Preguntabas por mi <b>${ctx.from.first_name}</b>?\nTe he enviado un mensaje privado para iniciar el asistente de ayuda.\nNos vemos allí.`;
        ctx.replyWithHTML(menuMSG);
    }
    MainMenu(ctx);
});
//-----functions-----
function MainMenu(ctx)
{    
    let privateMSG = `Bienvenido ${ctx.from.first_name}\nGracias por permitirme ayudarte. Que deseas hacer?.`;        
    bot.telegram.sendMessage(ctx.from.id,privateMSG, {
        reply_markup: {
            inline_keyboard: [
                [                    
                    {
                        text: "Iniciar asistente",
                        callback_data: 'showhelp'
                    }
                ]
        ]}
    })
}

//-----others-----
bot.action('showhelp', ctx => {
    menu.ShowMenu(bot, ctx)
});
bot.on('callback_query', (ctx) => {
    ctx.answerCbQuery()
});
bot.on('inline_query', (ctx) => {
  const result = []
  ctx.answerInlineQuery(result)
});
///Launching Bot///
bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));