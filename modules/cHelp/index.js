//-----------Requires-----------
const { Telegraf } = require("telegraf");
var imgOptions = [];
//var bot=null;

//-----------Code-----------
/**
 * Init the regvisor module.
 */
function Init(bot, options) {
  //this.bot = bot;
  imgOptions = options;
}
/**
 * Show cHelp main menu
 */
function ShowMenu(ctx) {
  //ctx.deleteMessage();
  ctx.replyWithPhoto({ source: "./public/chelp.jpg" }).then(() => {
    return ctx.reply(
      "Esta sección se encuentra en desarrollo. Disculpe las molestias ocacionadas."
    );
  });
}

//-----------Exports-----------
module.exports = { ShowMenu, Init };
