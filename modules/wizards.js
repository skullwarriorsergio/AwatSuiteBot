const { Scenes, session } = require('telegraf');

const reportWizard = new Scenes.WizardScene(
 'AwatSuite_Report_ID',
 (ctx) => {   
   ctx.replyWithHTML('Indentificador del problema o sugerecia.\nEj:[i]\t\'Regvisor-Importar\'\t\'Chelp-error de conexión\'[/i]');
   ctx.wizard.state.report = {};
   return ctx.wizard.next();
 },
 (ctx) => {
   // validation example
   if (ctx.message.text.length <= 0) {
     ctx.replyWithHTML('<b><i>Debe especificar un identificador</i></b>.');
     return; 
   }
   ctx.wizard.state.report.title = ctx.message.text;
   ctx.reply('Detalle el problema o sugerencia');
   return ctx.wizard.next();
 },
 async (ctx) => {
  if (ctx.message.text.length <= 0) {
    ctx.replyWithHTML('<b><i>Por favor, detallenos el problema o sugerencia</i></b>.');
    return; 
  }
   ctx.wizard.state.report.details = ctx.message.text;
   ctx.replyWithHTML('Muchas gracias <strong>${ctx.from.first_name}</strong> por el reporte, le contactaremos con la mayor brevedad posible.');
   require('fs').writeFile(
    `./reports/${ctx.from.id}-${Date.now()}.json`,
    JSON.stringify(this.Services),
    function (err) {
        if (err) {
            console.error('Crap happens');
        }
    }
);
   return ctx.scene.leave();
 },
);

function Init(bot)
{
    var stage = new Scenes.Stage([reportWizard]);
    bot.use(session());
    bot.use(stage.middleware());
}

function ShowReportWizard(ctx)
{
    ctx.scene.enter('AwatSuite_Report_ID');
}

module.exports = { Init, ShowReportWizard}