const { Scenes, session } = require("telegraf");
const fs = require("fs");
var botObject;
var reportCallBack;

const reportWizard = new Scenes.WizardScene(
  "AwatSuite_Report_ID",
  (ctx) => {
    ctx.replyWithHTML(
      "Identificador del problema o sugerecia.\nEj:<i>\t'Regvisor-Importar'  \t'cHelp-error de conexión'</i>"
    );
    ctx.wizard.state.report = {};
    return ctx.wizard.next();
  },
  (ctx) => {
    // validation example
    if (ctx.message.text.length <= 0) {
      ctx.replyWithHTML("<b><i>Debe especificar un identificador</i></b>.");
      return;
    }
    if (ctx.message.text.length > 100) {
      ctx.replyWithHTML(
        "<b><i>Por favor, detallenos el problema o sugerencia</i></b>."
      );
      return;
    }
    ctx.wizard.state.report.title = ctx.message.text;
    ctx.replyWithHTML("Detalle el problema o sugerencia");
    return ctx.wizard.next();
  },
  async (ctx) => {
    if (ctx.message.text.length <= 0) {
      ctx.replyWithHTML(
        "<b><i>Por favor, detallenos el problema o sugerencia</i></b>."
      );
      return;
    }
    ctx.wizard.state.report.details = ctx.message.text;
    let reportID = `${ctx.from.id}-${Date.now()}`;
    fs.writeFile(
      `./reports/${reportID}.json`,
      JSON.stringify(ctx.wizard.state.report),
      (err) => {
        if (err) {
          console.error(err);
          ctx.replyWithHTML(
            "Ha ocurrido un error al generar el archivo del reporte."
          );
        }
      }
    );
    reportCallBack(
      ctx,
      `Muchas gracias ${ctx.from.first_name} por el reporte, le contactaremos con la mayor brevedad posible.\n\tID del reporte: (${reportID})\nSi desea enviarnos alguna información adicional, escribanos a awatsuite@gmail.com y agregue el ID del reporte.\n`
    );
    botObject.telegram.sendMessage(
      -1001477824552,
      `Muchas gracias ${ctx.from.first_name} por el reporte o sugerencia, le contactaremos con la mayor brevedad posible.`
    );
    return ctx.scene.leave();
  }
);

function Init(bot, callback) {
  const stage = new Scenes.Stage([reportWizard]);
  bot.use(session());
  bot.use(stage.middleware());
  botObject = bot;
  reportCallBack = callback;
  var dir = "./reports";
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
}

function ShowReportWizard(ctx) {
  ctx.scene.enter("AwatSuite_Report_ID");
}

module.exports = { Init, ShowReportWizard };
