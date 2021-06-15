//-----------Requires-----------
require("dotenv").config({ path: __dirname + "/.env" });
const { Telegraf, Markup } = require("telegraf");
const HttpsProxyAgent = require("https-proxy-agent");
const fs = require("fs");
var bot = null;
var options = [];
if (process.env["proxy"] == "true") {
  bot = new Telegraf(process.env["token"], {
    telegram: {
      agent: new HttpsProxyAgent("http://127.0.0.1:51515"),
    },
  });
} else {
  bot = new Telegraf(process.env["token"]);
}
var archiver = require("archiver");
var donate = require("./modules/donate/index");
var wizard = require("./modules/wizards");
var menu = require("./modules/index");
var DeleteMSG = require("./modules/deletemsg");
const deletemsg = require("./modules/deletemsg");
bot.telegram.getMe().then((botInfo) => {
  bot.options.username = botInfo.username;
});
wizard.Init(bot, MainMenuButtons);
menu.Init(bot, options);
donate.Init(bot, (ctx) => {
  MainMenu(ctx);
});

//-----Contact Info-----
const contactInfoExtra = Markup.inlineKeyboard([
  [
    Markup.button.url("\u{1F4AC} Grupo de Telegram", "https://t.me/awatsuite"),
    //Markup.button.url('\u{1F4AC} Correo', 'mailto:awatsuite@gmail.com')
  ],
  [
    Markup.button.url(
      "\u{1F30E} Facebook",
      "https://www.facebook.com/awatsuite/"
    ),
    Markup.button.url(
      "\u{1F30D} Linkedin",
      "https://www.linkedin.com/company/awatsuite"
    ),
  ],
  [
    Markup.button.url(
      "\u{1F5C4} Google Drive",
      "https://drive.google.com/drive/u/2/folders/1NAKi-0NR1CBeupyKmUpIyW3BOixJ5jOf"
    ),
    Markup.button.url(
      "\u{1F5C4} Mega",
      "https://mega.nz/#F!VENU0QCL!SwEHRn4oZWSgHcNR-JpzPA"
    ),
  ],
  [Markup.button.callback("\u{26D1} Iniciar asistente", "showhelp")],
  [
    Markup.button.callback("\u{1F6E0} Opciones", "options"),
    Markup.button.callback("Donar", "donate"),
  ],
  [Markup.button.callback("Reportar problema o sugerencia", "reportwizard")],
]);

//-----------Code-----------
bot.command("start", (ctx) => {
  Welcome(ctx);
});
bot.command("hello", (ctx) => {
  Welcome(ctx);
});
bot.command("hola", (ctx) => {
  Welcome(ctx);
});
/**
 * welcome message
 */
function Welcome(ctx) {
  if (ctx.chat.id === ctx.from.id) {
    MainMenu(ctx);
  } else {
    var msg = `Hola <strong>${ctx.from.first_name}</strong>!\n`;
    msg += "Soy bot de ayuda de la <strong>Suite Awat</strong>.\n";
    msg += "Comandos disponibles:\n";
    msg += " /awatsuite";
    ctx.replyWithHTML(msg);
  }
}

//-----commands-----
//Enable/Disable example images
bot.command("img", (ctx) => {
  let tooglemsg = "habilitado";
  var found = options.find(function (el) {
    return el.chatid === ctx.from.id;
  });
  if (found) {
    found.showpics = !found.showpics;
    tooglemsg = found.showpics ? "habilitado" : "deshabilitado";
  } else {
    options.push({
      chatid: ctx.from.id,
      showpics: true,
    });
  }
  ctx.replyWithHTML(
    `Se han ${tooglemsg} las imágenes de ejemplo para ${ctx.from.first_name}`
  );
});
//Exit command
bot.command("quit", (ctx) => {
  try {
    ctx.leaveChat();
  } catch {}
});
//Admin's command - Help
bot.command("admin", (ctx) => {
  if (ctx.from.id === 1351572572) {
    ctx.reply(
      "Comandos administrativos:\n/getreports  ---  Buscar todos los reportes realizados, compactarlos, enviar el zip y eliminar archivos de reportes.\n/getlastzip  ---  Obtener el último compactado de reportes."
    );
  } else ctx.reply("Lo siento, ud no posee los privilegios necesarios.");
});
//Admin's command - Get last ZIP
bot.command("getlastzip", (ctx) => {
  if (ctx.from.id === 1351572572) {
    ctx.telegram.sendDocument(ctx.from.id, {
      source: "./reports.zip",
      filename: "reports.zip",
    });
  } else ctx.reply("Lo siento, ud no posee los privilegios necesarios.");
});
//Start report's wizard
bot.command("report", (ctx) => {
  if (ctx.chat.id != ctx.from.id) {
    ctx.reply(
      "Te he enviado un mensaje privado para atender tu solicitud de reporte o sugerencia."
    );
    bot.telegram.sendMessage(
      ctx.from.id,
      "Ahora podemos conversar con tranquilidad.\nPor favor teclea /report para iniciar el generador de reportes o sugerencias."
    );
  } else wizard.ShowReportWizard(ctx);
});
//Show bot's help
bot.command("help", (ctx) => {
  BotHelp(ctx);
});
//Show bot's help
bot.command("ayuda", (ctx) => {
  BotHelp(ctx);
});

//Admin's command - Generar compactado y eliminar archivos de reportes
bot.command("getreports", (ctx) => {
  if (ctx.from.id === 1351572572) {
    const glob = require("glob");
    const files = glob.sync("./reports/*.json", { nodir: true });
    if (files.length != 0) {
      var output = fs.createWriteStream("reports.zip");
      var archive = archiver("zip");
      output.on("close", function () {
        ctx.telegram.sendDocument(ctx.from.id, {
          source: "./reports.zip",
          filename: "reports.zip",
        });
        const fsExtra = require("fs-extra");
        fsExtra.emptyDirSync("./reports/");
        ctx.replyWithHTML(
          `Se encontraron reportes(${files.length}) los cuales estan contenidos dentro de reports.zip.\nTodos los archivos de los reportes(*.json) fueron eliminados.`
        );
      });
      archive.on("error", function (err) {
        ctx.replyWithHTML(err);
      });
      archive.pipe(output);
      archive.directory("./reports/", false);
      archive.finalize();
    } else {
      ctx.replyWithHTML("No existen reportes pendientes");
    }
  } else ctx.reply("Lo siento, ud no posee los privilegios necesarios.");
});
//Show bot's main menu
bot.command("awatsuite", (ctx) => {
  if (ctx.chat.id != ctx.from.id) {
    let menuMSG = `Hola <b>${ctx.from.first_name}</b>\nTe he enviado un mensaje privado para iniciar el asistente de ayuda.\nNos vemos allí.`;
    ctx.replyWithHTML(menuMSG);
  }
  MainMenu(ctx);
});
//-----hears-----
//Show bot's main menu
bot.hears("ayuda", (ctx) => {
  if (ctx.chat.id === ctx.from.id) {
    MainMenu(ctx);
  }
});
//Show bot's main menu
bot.hears("Hola", (ctx) => {
  if (ctx.chat.id === ctx.from.id) {
    MainMenu(ctx);
  }
});
//Show bot's main menu
bot.hears("Hello", (ctx) => {
  if (ctx.chat.id === ctx.from.id) {
    MainMenu(ctx);
  }
});
//Show bot's main menu
bot.hears("hola", (ctx) => {
  if (ctx.chat.id === ctx.from.id) {
    MainMenu(ctx);
  }
});
//Show bot's main menu
bot.hears("ayuda", (ctx) => {
  if (ctx.chat.id === ctx.from.id) {
    BotHelp(ctx);
  }
});
//Show bot's main menu
bot.hears("Ayuda", (ctx) => {
  if (ctx.chat.id === ctx.from.id) {
    BotHelp(ctx);
  }
});
//Show bot's main menu
bot.hears("hello", (ctx) => {
  if (ctx.chat.id === ctx.from.id) {
    MainMenu(ctx);
  }
});
//Show bot's main menu
bot.hears("Awatsuite", (ctx) => {
  if (ctx.chat.id != ctx.from.id) {
    let menuMSG = `Preguntabas por mi <b>${ctx.from.first_name}</b>?\nTe he enviado un mensaje privado para iniciar el asistente de ayuda.\nNos vemos allí.`;
    ctx.replyWithHTML(menuMSG);
  }
  MainMenu(ctx);
});
//Show bot's main menu
bot.hears("awatsuite", (ctx) => {
  if (ctx.chat.id != ctx.from.id) {
    let menuMSG = `Preguntabas por mi <b>${ctx.from.first_name}</b>?\nTe he enviado un mensaje privado para iniciar el asistente de ayuda.\nNos vemos allí.`;
    ctx.replyWithHTML(menuMSG);
  }
  MainMenu(ctx);
});
//-----functions-----

/**
 * Show main text menu.
 */
function MainMenu(ctx) {
  let privateMSG = `Bienvenido ${ctx.from.first_name}\nGracias por permitirme ayudarte. Recuerda habilitar las imágenes de ejemplo para recibir capturas de pantalla de la aplicación.\n\nQue deseas hacer?.`;
  MainMenuButtons(ctx, privateMSG);
}
/**
 * Show help text
 */
function BotHelp(ctx) {
  ctx.replyWithHTML(
    "Soy el asistente de ayuda y soporte para AwatSuite.\nPara iniciar puedes utilizar los comandos /start /hola /awatsuite. Existen opciones a las cuales puedes acceder directamente:\n Para habilitar/deshabilitar imágenes de ejemplos utiliza /img\n Para realizar un reporte o sugerencia emplea /report"
  );
}

/**
 * Main menu buttons
 */
function MainMenuButtons(ctx, menuMSG) {
  bot.telegram.sendMessage(ctx.from.id, menuMSG, {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "\u{26D1} Iniciar asistente",
            callback_data: "showhelp",
          },
        ],
        [
          {
            text: "\u{1F6E0} Opciones",
            callback_data: "options",
          },
          {
            text: "\u{1F4DE} Contacto",
            callback_data: "contact",
          },
          {
            text: "Donar",
            callback_data: "donate",
          },
        ],
        [
          {
            text: "Reportar problema o sugerencia",
            callback_data: "reportwizard",
          },
        ],
      ],
    },
  });
}
//-----Buttons & actions-----
bot.action("reportwizard", (ctx) => {
  wizard.ShowReportWizard(ctx);
});
bot.action("options", (ctx) => {
  DeleteMSG(ctx);
  let showpics = false;
  let menutext = "\u{1F5BC} Mostrar imágenes de ejemplo";
  var found = options.find(function (el) {
    return el.chatid === ctx.from.id;
  });
  if (found) {
    showpics = found.showpics;
  } else {
    options.push({
      chatid: ctx.from.id,
      showpics: false,
    });
  }
  if (showpics) {
    menutext = "\u{1F6D1} Ocultar imágenes de ejemplo";
  }
  ctx.replyWithHTML("Opciones del asistente", {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: menutext,
            callback_data: "tooglePictures",
          },
        ],
        [
          {
            text: "\u{26D1} Asistente",
            callback_data: "showhelp",
          },
          {
            text: "\u{1F4DE} Contacto",
            callback_data: "contact",
          },
          {
            text: "Donar",
            callback_data: "donate",
          },
        ],
      ],
    },
  });
});
bot.action("tooglePictures", (ctx) => {
  DeleteMSG(ctx);
  var found = options.find(function (el) {
    return el.chatid === ctx.from.id;
  });
  found.showpics = !found.showpics;
  let tooglemsg = found.showpics ? "habilitado" : "deshabilitado";
  MainMenuButtons(
    ctx,
    `Excelente! ${ctx.from.first_name} has ${tooglemsg} las imagenes de ejemplo.\n Que deseas hacer a continuación?`
  );
});
bot.action("showhelp", (ctx) => {
  BotHelp(ctx);
});
bot.action("donate", (ctx) => {
  donate.ShowMenu(ctx);
});
bot.action("contact", (ctx) => {
  ctx.deleteMessage();
  ctx.replyWithHTML(
    "Información de contacto y links de descarga de nuestra aplicación.\n\t\u{1F4E7} Email: awatsuite@gmail.com",
    contactInfoExtra
  );
});
bot.on("callback_query", (ctx) => {
  ctx.answerCbQuery();
});
bot.on("inline_query", (ctx) => {
  const result = [];
  ctx.answerInlineQuery(result);
});
///Launching Bot///
bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
