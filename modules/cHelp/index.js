//-----------Requires-----------
const { Telegraf } = require('telegraf');
var imgOptions =[];
//var bot=null;

//-----------Code-----------
function Init(bot, options)
{
    //this.bot = bot;
    imgOptions = options;
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