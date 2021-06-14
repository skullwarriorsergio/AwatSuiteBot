//-----------Requires-----------
const { Telegraf } = require("telegraf");
var DeleteMSG = require("../deletemsg");
var imgOptions = [];

//-----------Code-----------

/**
 * Init Regvisor's import module
 */
function Init(bot, backfunction, options) {
  imgOptions = options;
  bot.action("import_filefilter", (ctx) => {
    DeleteMSG(ctx);
    FileFilter(ctx);
  });
  bot.action("import_selectprofile", (ctx) => {
    DeleteMSG(ctx);
    SelectProfile(ctx);
  });
  bot.action("import_defineprofile", (ctx) => {
    DeleteMSG(ctx);
    DefineProfile(ctx);
  });
  bot.action("import_back", (ctx) => {
    DeleteMSG(ctx);
    let menuMSG =
      "<strong>RegVisor</strong>  (<i>Sistema para el análisis de trazas de los servidores.</i>)\n";
    menuMSG +=
      "A continuación selecciona el tópico sobre el cual deseas recibir ayuda";
    backfunction(ctx, menuMSG);
  });
}
//-----Functions-----

/**
 * Show file filter help topic.
 */
function FileFilter(ctx) {
  PicMSG(
    ctx,
    imgOptions,
    () => {
      let menuMSG = "►<strong>Filtro de archivos</strong>\n";
      menuMSG +=
        "  \tEspecificar el filtro que se empleará para seleccionar los archivos de trazas. Es recomendable utilizar el filtro adecuado dependiendo del tipo de trazas a procesar para reducir la duración del proceso del importación\n";
      menuMSG += "  \tSe pueden emplear comodines(*) \n";
      menuMSG += "   \tEj: *access*     *.log     Drop*\n\n";
      menuMSG +=
        "  \tSi los archivos de trazas se encuentran compactados, no es necesario descomprimirlos ya que el propio sistema se encarga de esto. Los  archivos son descomprimidos en una carpeta temporal y eliminados al terminar el procesamiento.\n";
      ctx.replyWithHTML(menuMSG).then(() => {
        return ShowMenu(ctx);
      });
    },
    "./public/import_filter.png",
    "Menú: Importar,  Sección: Filtro de archivos"
  );
}
/**
 * Show profile help topic.
 */
function SelectProfile(ctx) {
  PicMSG(
    ctx,
    imgOptions,
    () => {
      let menuMSG = "►<strong>Selección del perfil de importación</strong>\n";
      menuMSG +=
        "  \tLa mayoría de los tipos de servidores poseen 2 tipos de perfiles de importación, los cuales definen la cantidad de datos que se pueden importar y el nivel de detalles de los mismos.\n";
      menuMSG +=
        " ◦ <b>Detallado</b>: Procesa y obtiene imformación con gan nivel de detalle desde los archivos de trazas, lo cual a su vez limita la cantidad de elementos que se pueden importar.\n";
      menuMSG +=
        " ◦ <b>General</b>: Obtiene información simplificada y agrupada estadísticamente, lo que a su vez posibilita importar un volumen enorme de trazas.\n";

      ctx.replyWithHTML(menuMSG).then(() => {
        return ShowMenu(ctx);
      });
    },
    "./public/import_profile.png",
    "Menú: Importar,  Sección: Seleccionar perfiles"
  );
}
/**
 * Show profile personalization help topic.
 */
function DefineProfile(ctx) {
  PicMSG(
    ctx,
    imgOptions,
    () => {
      let menuMSG = "►<strong>Definición de perfiles de importación</strong>\n";
      menuMSG +=
        "  \tEn esta sección del asistente se proveen opciones de filtrado específicas al tipo de servidor seleccionado. Dichas opciones permiten seleccionar información expecifica durante el proceso de importación, reduciendo a su vez el volumen de datos resultante.\n";
      menuMSG +=
        "  \tSe pueden seleccionar filtros por <b>Direcciones IP</b>, <b>Usuarios</b>, <b>Dirección email</b>, <b>Rango de fechas</b> entre otros.\n";
      menuMSG +=
        "  \tEstas opciones de filtrado pueden ser ejecutadas una vez o almacenadas como un nuevo perfil para ser utilizadas con mayor facilidad y rapidez.\n";
      ctx.replyWithHTML(menuMSG).then(() => {
        return ShowMenu(ctx);
      });
    },
    "./public/import_profile.png",
    "Menú: Importar,  Sección: Definir perfil"
  );
}

/**
 * Show Import subtopics menu
 */
function ShowMenu(ctx) {
  menuMSG = "\u{2795} <strong>Importar</strong>\n";
  menuMSG +=
    "Asistente para la importación de las trazas(logs) según el tipo de servidor seleccionado.\n";
  menuMSG +=
    "Seleccione la sección del asistente para obtener mas información\n";
  ctx.replyWithHTML(menuMSG, {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Filtro de archivos",
            callback_data: "import_filefilter",
          },
          {
            text: "Seleccionar perfiles",
            callback_data: "import_selectprofile",
          },
        ],
        [
          {
            text: "Definir perfil",
            callback_data: "import_defineprofile",
          },
          {
            text: "\u{1F448} atras",
            callback_data: "config_back",
          },
        ],
      ],
    },
  });
}

module.exports = { ShowMenu, Init };
