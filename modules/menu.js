//-----------Requires-----------
var regvisor = require('./RegVisor/index');
var chelp = require('./cHelp/index');
const { Telegraf, Markup } = require('telegraf');
//var bot=null;

//-----------Code-----------
function Init(bot)
{
    //this.bot = bot;
    regvisor.Init(bot);
    chelp.Init(bot);

    bot.action('regvisor', ctx => {
        regvisor.ShowMenu(ctx);
    })
    
    bot.action('chelp', ctx => {
        chelp.ShowMenu(ctx);
    })
}
7
function ShowMenu(bot,ctx)
{
    ctx.deleteMessage(); 
    let menuMSG = `Entendido, ahora selecciona la aplicación de la suite para la cual deseas obtener ayuda`;    
    ctx.replyWithHTML(menuMSG, {
        reply_markup: {
            inline_keyboard: [
                [                    
                    {
                        text: "RegVisor",
                        callback_data: 'regvisor'
                    },
                    {
                        text: "cHelp",
                        callback_data: 'chelp'
                    }
                ],

            ]
        }
    })   
}

module.exports = {ShowMenu, Init}