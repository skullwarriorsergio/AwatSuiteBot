//-----------Requires-----------
var regvisor = require("./RegVisor/index");
var chelp = require("./cHelp/index");
var DeleteMSG = require("./deletemsg");
const { Telegraf, Markup } = require("telegraf");

//-----------Code-----------
function Init(bot, options) {
  regvisor.Init(bot, options);
  chelp.Init(bot, options);

  bot.action("regvisor", (ctx) => {
    regvisor.ShowMenu(ctx);
  });

  bot.action("chelp", (ctx) => {
    chelp.ShowMenu(ctx);
  });
}

/**
 * Show apps menu.
 */
function ShowMenu(ctx) {
  DeleteMSG(ctx);
  let menuMSG = `Entendido, ahora selecciona la aplicación de la suite para la cual deseas obtener ayuda`;
  ctx.replyWithHTML(menuMSG, {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "RegVisor",
            callback_data: "regvisor",
          },
          {
            text: "cHelp",
            callback_data: "chelp",
          },
        ],
      ],
    },
  });
}

module.exports = { ShowMenu, Init };
