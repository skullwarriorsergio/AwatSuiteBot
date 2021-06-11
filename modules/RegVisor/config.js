//-----------Requires-----------
const { Telegraf } = require('telegraf');
//var bot=null;

//-----------Code-----------
function Init(bot)
{
    //this.bot = bot;
    bot.action('config_general', ctx => {
        ctx.deleteMessage();
        ConfigGeneral(ctx);
    });
    bot.action('config_interface', ctx => {
        ctx.deleteMessage();
        ConfigInterface(ctx);
    });
    bot.action('config_storage', ctx => {
        ctx.deleteMessage();
        ConfigStorage(ctx);
    });
    bot.action('config_back', ctx => {
        ctx.deleteMessage();
        let menuMSG = '<strong>RegVisor</strong>  (<i>Sistema para el análisis de trazas de los servidores.</i>)\n';
        menuMSG += 'A continuación selecciona el tópico sobre el cual deseas recibir ayuda';
        ShowTopicsMenu(ctx,menuMSG)
    });
}
function ShowMenu(ctx)
{
    menuMSG='\u{1F9F0} <strong>\tConfiguración</strong>\n';
    menuMSG+='Seleccione la clasificación deseada\n';
    ctx.replyWithHTML(menuMSG, {
        reply_markup: {
            inline_keyboard: 
                [
                    [
                        {
                            text: "General",
                            callback_data: 'config_general'
                        },
                        {
                            text: "Interfaz",
                            callback_data: 'config_interface'
                        }
                    ],
                    [
                        {
                            text: "Almacenamiento",
                            callback_data: 'config_storage'
                        },
                        {
                            text: "\u{1F448} atras",
                    callback_data: 'config_back'
                        }
                    ]
                ]
        }
    });
}






module.exports = {ShowMenu, Init}