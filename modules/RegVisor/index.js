//-----------Requires-----------
var configOption = require('./config');
var importOption = require('./import');
const { Telegraf } = require('telegraf');
//var bot=null;

//-----------Code-----------
function Init(bot)
{
    //this.bot = bot;
    importOption.Init(bot,ShowTopicsMenu);
    configOption.Init(bot,ShowTopicsMenu);

    bot.action('import', ctx => { // \u{2795}
        ctx.deleteMessage();
        importOption.ShowMenu(ctx);
    });
    
    bot.action('report', ctx => { // \u{1F4C3}
        ctx.reply('en desarrollo');
    });

    bot.action('filter', ctx => { // \u{2049} 
        ctx.reply('en desarrollo');
    });

    bot.action('extras', ctx => { // \u{1F6D2} 
        ctx.reply('en desarrollo');
    });

    bot.action('config', ctx => {
        ctx.deleteMessage();
        configOption.ShowMenu(ctx);
    });
}
function ShowMenu(ctx)
{    
    ctx.deleteMessage();
    ctx.replyWithPhoto({source: './public/regvisor.jpg'}).then(()=>{
        let menuMSG = '<strong>RegVisor</strong>  (<i>Sistema para el análisis de trazas de los servidores.</i>)\n';
        menuMSG += 'A continuación selecciona el tópico sobre el cual deseas recibir ayuda';
        ShowTopicsMenu(ctx,menuMSG);
    });    
}
//-----functions-----
function ShowTopicsMenu(ctx,menuMSG)
{
    ctx.replyWithHTML(menuMSG, {
        reply_markup: {
            inline_keyboard:
            [
                [                    
                    {                        
                        text: "Importar",
                        callback_data: 'import'
                    },
                    {
                        text: "Reportar",
                        callback_data: 'report'
                    },
                    {
                        text: "Filtros",
                        callback_data: 'filter'
                    }
                ],
                [
                    {
                        text: "Extras",
                        callback_data: 'extras'
                    },
                    {
                        text: "Configuración",
                        callback_data: 'config'
                    }
                ]
            ]
        }
    })
}


//-----------Exports-----------
module.exports = {ShowMenu, Init}