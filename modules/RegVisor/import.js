//-----------Requires-----------
const { Telegraf } = require('telegraf');

//-----------Code-----------
function Init(bot)
{
    //this.bot = bot;
    bot.action('regvisor', ctx => {
        regvisor.ShowMenu(ctx);
    })
    
    bot.action('chelp', ctx => {
        chelp.ShowMenu(ctx);
    })
}
function ShowMenu(ctx)
{

}

module.exports = {ShowMenu, Init}