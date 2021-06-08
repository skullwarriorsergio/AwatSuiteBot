//-----------Requires-----------
const { Telegraf } = require('telegraf');
//var bot=null;

//-----------Code-----------
function Init(bot)
{
    //this.bot = bot;

    bot.action('import', ctx => {
        ctx.reply('en desarrollo');
    })
    
    bot.action('report', ctx => {
        ctx.reply('en desarrollo');
    })
}
function ShowMenu(ctx)
{
    ctx.deleteMessage();
    let menuMSG = '<strong>RegVisor</strong>  (<i>Sistema para el análisis de trazas de los servidores.</i>)\n';
    menuMSG += 'A continuación seleccione el tópico sobre el cual desee recibir ayuda';
    ctx.replyWithHTML(menuMSG, {
        reply_markup: {
            inline_keyboard: [
                [                    
                    {                        
                        text: "Importar",
                        callback_data: 'import'
                    },
                    {
                        text: "Reportar",
                        callback_data: 'report'
                    }
                ],

            ]
        }
    })
}

//-----------Exports-----------
module.exports = {ShowMenu, Init}