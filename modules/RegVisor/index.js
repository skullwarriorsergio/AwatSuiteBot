//-----------Requires-----------
var configOption = require('./config');
var importOption = require('./import');
const { Telegraf } = require('telegraf');
//var bot=null;

//-----------Code-----------
function Init(bot)
{
    //this.bot = bot;
    importOption.Init(bot);
    configOption.Init(bot);

    bot.action('import', ctx => { // \u{2795}
        ctx.reply('en desarrollo');
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
        Config(ctx);
    });

    bot.action('config', ctx => {
        ctx.deleteMessage();
        configOption.ShowMenu(ctx);
        Config(ctx);
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
function ConfigGeneral(ctx)
{
    let menuMSG = '►<strong>General</strong>\n';
    menuMSG += '<u><b>\tCopia de seguridad</b></u>\n';
    menuMSG += ' ◦ <b>Importar</b>: Importar seteos de configuración desde una copia de seguridad\n';
    menuMSG += ' ◦ <b>Exportar</b>: Exportar seteos de configuración hacia una copia de seguridad\n';
    menuMSG += '<u><b>\tContraseña de acceso</b></u>\n';
    menuMSG += '  \tCambiar la constraseña para acceder a la aplicación\n';
    ctx.replyWithHTML(menuMSG).then(() => 
    {
        menuMSG='Seleccione la clasificación deseada\n';
        return Config(ctx,menuMSG)
    });
}
function ConfigInterface(ctx)
{
    let menuMSG='►<strong>Interfaz</strong>\n';
    menuMSG += '<u><b>\tIntroducciones y ayudas</b></u>\n';
    menuMSG += '  \tActivar/desactivar los mensajes de ayuda iniciales por cada funcionalidad\n';
    menuMSG += '<u><b>\tColores de la Interfaz gráfica</b></u>\n';
    menuMSG += '  \tSeleccionar los colores de fondo y de letra de la aplicación\n';
    ctx.replyWithHTML(menuMSG).then(() => 
    {
        menuMSG='Seleccione la clasificación deseada\n';
        return Config(ctx,menuMSG)
    });
}
function ConfigStorage(ctx)
{
    menuMSG='►<strong>Almacenamiento</strong>\n'; 
    menuMSG += '<u><b>\tDirectorio de temporales</b></u>\n';
    menuMSG += '  \tEspecificar la ubicación donde se realizarán las operaciones de extración de archivos comprimidos\n';
    menuMSG += '<u><b>\tArchivo de DB</b></u>\n';
    menuMSG += '  \tAlgunas funcionalidades de la aplicación almacenan datos en un archivo local, por esta vía se puede reubicar dicho archivo.\n';
    menuMSG += '<u><b>\tReportes del menú contextual</b></u>\n';
    menuMSG += '  \tUbicación en donde se almacenarán los reportes realizados utilizando el menú contextual sobre archivos de trazas y carpetas.\n';
    ctx.replyWithHTML(menuMSG).then(() => 
    {
        menuMSG='Seleccione la clasificación deseada\n';
        return Config(ctx,menuMSG)
    });
}

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