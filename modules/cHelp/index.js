//-----------Requires-----------
const { Telegraf } = require('telegraf');
//var bot=null;

//-----------Code-----------
function Init(bot)
{
    //this.bot = bot;
}
function ShowMenu(ctx)
{    
    ctx.deleteMessage();
    ctx.replyWithPhoto({source: './public/chelp.jpg'}).then(()=>{
        ctx.reply('En desarrollo');
    });
}

//-----------Exports-----------
module.exports = {ShowMenu, Init}