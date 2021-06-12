//-----------Requires-----------
require('dotenv').config({path: __dirname + '/.env'});
const { Telegraf, Markup } = require('telegraf');
const HttpsProxyAgent = require('https-proxy-agent');
const fs = require('fs');
var bot = null;
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
//-----Contact Info-----
const contactInfoExtra = Markup.inlineKeyboard([
    [
        Markup.button.url('\u{1F4AC} Grupo de Telegram', 'https://t.me/awatsuite'),
        //Markup.button.url('\u{1F4AC} Correo', 'mailto:awatsuite@gmail.com')
    ],
    [
        Markup.button.url('\u{1F30E} Facebook', 'https://www.facebook.com/awatsuite/'),
        Markup.button.url('\u{1F30D} Linkedin', 'https://www.linkedin.com/company/awatsuite')
    ],
    [
        Markup.button.url('\u{1F5C4} Google Drive', 'https://drive.google.com/drive/u/2/folders/1NAKi-0NR1CBeupyKmUpIyW3BOixJ5jOf'),        
        Markup.button.url('\u{1F5C4} Mega', 'https://mega.nz/#F!VENU0QCL!SwEHRn4oZWSgHcNR-JpzPA')
    ],
    [
        Markup.button.callback('\u{26D1} Iniciar asistente','showhelp'),        
        Markup.button.callback('\u{1F6E0} Opciones','options'),        
    ]
  ]);

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
    MainManuButtons(ctx,privateMSG);
}
function MainManuButtons(ctx,menuMSG)
{
    bot.telegram.sendMessage(ctx.from.id,menuMSG, {
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: "\u{26D1} Iniciar asistente",
                        callback_data: 'showhelp'
                    }
                ],
                [                                      
                    {
                        text: "\u{1F6E0} Opciones",
                        callback_data: 'options'
                    },
                    {
                        text: "\u{1F4DE} Contacto",
                        callback_data: 'contact'
                    }
                ]
        ]}
    })
}
//-----Buttons-----
bot.action('options', ctx => {
    ctx.replyWithHTML('Opciones del asistente').then(() =>
    {
        bot.telegram.sendMessage(ctx.from.id,'', {
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: "\u{26D1} Iniciar asistente",
                            callback_data: 'showhelp'
                        },
                        {
                            text: "\u{1F4DE} Contacto",
                            callback_data: 'contact'
                        }
                    ]
            ]}
        })
    });;
});
bot.action('showhelp', ctx => {
    menu.ShowMenu(bot, ctx)
});
bot.action('contact', ctx => {
    ctx.deleteMessage();
    ctx.replyWithHTML('Información de contacto y links de descarga de nuestra aplicación.\n\t\u{1F4E7} Email: awatsuite@gmail.com',contactInfoExtra);
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