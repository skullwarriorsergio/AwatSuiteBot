//-----------Requires-----------
var configOption = require("./config");
var importOption = require("./import");
var DeleteMSG = require("../deletemsg");
var PicMSG = require("../msgPicture");
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
  importOption.Init(bot, ShowTopicsMenu, options);
  configOption.Init(bot, ShowTopicsMenu, options);

  bot.action("import", (ctx) => {
    // \u{2795}
    DeleteMSG(ctx);
    importOption.ShowMenu(ctx);
  });

  bot.action("report", (ctx) => {
    // \u{1F4C3}
    DeleteMSG(ctx);
    PicMSG(
      ctx,
      imgOptions,
      () => {
        let menuMSG = "►<strong>Reportes</strong>\n";
        menuMSG +=
          "  \tEn esta sección se inicia el asistente de reportes cuyas opciones dependen del tipo de servidor para el cual se procesan las trazas.\n";
        menuMSG +=
          "  \tLas opciones disponibles permiten una personalización del reporte medienta la aplicación de filtros, agrupamientos y clasificación de la información resultando en un reporte con un nivel detalles personalizado.\n";
        menuMSG +=
          "  \tLos reportes pueden imprimirse o exportarse a un PDF protegido para evitar adulteraciones de su contenido.\n\n";
        menuMSG +=
          "  \tLa generación del reporte puede ser genérica o personalizada:\n";
        menuMSG +=
          "  \t ◦ <b>Genérica</b>: Se genera el reporte con todas las opciones de filtro y clasificación por defecto.\n";
        menuMSG +=
          "  \t ◦ <b>Personalizada</b>: Se inicia el asistente de reportes el cual le brinda la posibilidad de definir las opciones del reporte.\n";
        ctx.replyWithHTML(menuMSG).then(() => {
          let menuMSG =
            "<strong>RegVisor</strong>  (<i>Sistema para el análisis de trazas de los servidores.</i>)\n";
          menuMSG +=
            "A continuación selecciona el tópico sobre el cual deseas recibir ayuda";
          return ShowTopicsMenu(ctx, menuMSG);
        });
      },
      "./public/report.gif",
      "Menú: Reporte. (Tráfico Proxy/Web)",
      true
    );
  });

  bot.action("filter", (ctx) => {
    // \u{2049}
    DeleteMSG(ctx);
    PicMSG(
      ctx,
      imgOptions,
      () => {
        let menuMSG = "►<strong>Mostrar datos</strong>\n";
        menuMSG +=
          "  \tEn esta sección se muestran los datos importados con el nivel de detalle definido según el perfil seleccionado.\n";
        menuMSG +=
          "  \tAqui se puede acceder a distintas funcionalidades de filtrado y generar resúmenes parciales o específicos a un campo o valor.\n";

        ctx.replyWithHTML(menuMSG).then(() => {
          let menuMSG =
            "<strong>RegVisor</strong>  (<i>Sistema para el análisis de trazas de los servidores.</i>)\n";
          menuMSG +=
            "A continuación selecciona el tópico sobre el cual deseas recibir ayuda";
          return ShowTopicsMenu(ctx, menuMSG);
        });
      },
      "./public/traffic.png",
      "Menú: Datos. (Tráfico Proxy/Web)"
    );
  });

  bot.action("extras", (ctx) => {
    // \u{1F6D2}
    DeleteMSG(ctx);
    PicMSG(
      ctx,
      imgOptions,
      () => {
        let menuMSG = "►<strong>Extras</strong>\n";
        menuMSG +=
          "  \tEsta opción esta enfocada a funcionalidades extras solicitadas por usuarios.\n";
        menuMSG +=
          "  \tAqui se cuenta con un analizador de archivos de correo(.eml  .msg y archivos de datos de Outlook[.pst]) a través del cual se puede acceder a los correos enviados y recibidos contenidos en los mismos.\n";

        ctx.replyWithHTML(menuMSG).then(() => {
          let menuMSG =
            "<strong>RegVisor</strong>  (<i>Sistema para el análisis de trazas de los servidores.</i>)\n";
          menuMSG +=
            "A continuación selecciona el tópico sobre el cual deseas recibir ayuda";
          return ShowTopicsMenu(ctx, menuMSG);
        });
      },
      "./public/extrafunctions.png",
      "Menú: Extras."
    );
  });

  bot.action("config", (ctx) => {
    DeleteMSG(ctx);
    configOption.ShowMenu(ctx);
  });
}

/**
 * Show regvisor's main menu.
 */
function ShowMenu(ctx) {
  DeleteMSG(ctx);
  ctx.replyWithPhoto({ source: "./public/regvisor.jpg" }).then(() => {
    let menuMSG =
      "<strong>RegVisor</strong>  (<i>Sistema para el análisis de trazas de los servidores.</i>)\n";
    menuMSG +=
      "A continuación selecciona el tópico sobre el cual deseas recibir ayuda";
    ShowTopicsMenu(ctx, menuMSG);
  });
}

/**
 * Show topics menu.
 */
function ShowTopicsMenu(ctx, menuMSG) {
  ctx.replyWithHTML(menuMSG, {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Importar",
            callback_data: "import",
          },
          {
            text: "Reportar",
            callback_data: "report",
          },
          {
            text: "Datos",
            callback_data: "filter",
          },
        ],
        [
          {
            text: "Extras",
            callback_data: "extras",
          },
          {
            text: "Configuración",
            callback_data: "config",
          },
        ],
      ],
    },
  });
}

//-----------Exports-----------
module.exports = { ShowMenu, Init };
