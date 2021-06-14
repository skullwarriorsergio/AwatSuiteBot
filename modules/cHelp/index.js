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
    //ctx.deleteMessage();
    ctx.replyWithPhoto({source: './public/chelp.jpg'}).then(()=>{
        return ctx.reply('Esta sección se encuentra en desarrollo. Disculpe las molestias ocacionadas.');
    });
}

//-----------Exports-----------
module.exports = {ShowMenu, Init}