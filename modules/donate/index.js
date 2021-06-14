
var DeleteMSG = require("../deletemsg");
const { Telegraf, Markup } = require("telegraf");

//-----------Code-----------
function Init(bot, backfunction) {
  bot.action("btc", (ctx) => {
    ctx.replyWithHTML("Bitcoin: 3HduNqT7SVhQ8XhjiYc4f1vm3z6BRAfEK1");
  });
  bot.action("ethereum", (ctx) => {
    ctx.replyWithHTML("Ethereum: 0xfcf8dc944ec9e22f24de9f5ea9eea819fac94a35");
  });
  bot.action("donate_back", (ctx) => {
    backfunction(ctx);
  });
}

/**
 * Show apps menu.
 */
function ShowMenu(ctx) {
  DeleteMSG(ctx);
  let menuMSG = `Muchas gracias por apoyarnos\nSeleccione el método de donación deseado`;
  ctx.replyWithHTML(menuMSG, {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Bitcoin",
            callback_data: "btc",
          },
          {
            text: "Ethereum",
            callback_data: "ethereum",
          },
        ],
        [
          {
            text: "\u{1F448} atras",
            callback_data: "donate_back",
          },
        ],
      ],
    },
  });
}

module.exports = { ShowMenu, Init };
