//-----------Requires-----------
const { Telegraf } = require("telegraf");
var connOption = require("./connection");
var DeleteMSG = require("../deletemsg");
var PicMSG = require("../msgPicture");
var imgOptions = [];

//-----------Code-----------
/**
 * Init the regvisor module.
 */
function Init(bot, options) {
  //this.bot = bot;
  imgOptions = options;
  connOption.Init(bot, ShowTopicsMenu, options);

  bot.action("connections", (ctx) => {
    DeleteMSG(ctx);
    connOption.ShowMenu(ctx);
  });
}
/**
 * Show cHelp main menu
 */
function ShowMenu(ctx) {
  //ctx.deleteMessage();
  ctx.replyWithPhoto({ source: "./public/chelp.jpg" }).then(() => {
    let menuMSG =
      "<strong>RegVisor</strong>  (<i>Sistema de asistencia a la administración de redes y seguridad informática.</i>)\n";
    menuMSG +=
      "A continuación selecciona el tópico sobre el cual deseas recibir ayuda";
    ShowTopicsMenu(ctx, menuMSG);
  });
}

/**
 * Show topics menu.
 */
function ShowTopicsMenu(ctx, menuMSG) {
  ctx.replyWithHTML(menuMSG, {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Conexiones",
            callback_data: "connections",
          },
          {
            text: "Cache ARP",
            callback_data: "arp",
          },
          {
            text: "Proxy Squid",
            callback_data: "squidcache",
          },
        ],
        [
          {
            text: "Usuarios del LDAP",
            callback_data: "ldap",
          },
          {
            text: "Escaneres de red",
            callback_data: "netscan",
          },
        ],
      ],
    },
  });
}

//-----------Exports-----------
module.exports = { ShowMenu, Init };
