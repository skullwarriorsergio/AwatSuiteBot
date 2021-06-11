//-----------Requires-----------
const { Telegraf } = require('telegraf');
//var bot=null;

//-----------Code-----------
function Init(bot, backfunction)
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
        backfunction(ctx,menuMSG)
    });
}

//-----Functions-----
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
        return ShowMenu(ctx)
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
        return ShowMenu(ctx)
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
        return ShowMenu(ctx)
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