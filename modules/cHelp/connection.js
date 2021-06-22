//-----------Requires-----------
const { Telegraf } = require("telegraf");
var DeleteMSG = require("../deletemsg");
var PicMSG = require("../msgPicture");
var imgOptions = [];

//-----------Code-----------
/**
 * Init Regvisor's config module
 */
function Init(bot, backfunction, options) {
  imgOptions = options;
  bot.action("conn_list", (ctx) => {
    DeleteMSG(ctx);
    ConnConnections(ctx);
  });
  bot.action("conn_performance", (ctx) => {
    DeleteMSG(ctx);
    ConnPerformance(ctx);
  });
  bot.action("conn_commands", (ctx) => {
    DeleteMSG(ctx);
    ConnCommands(ctx);
  });
  bot.action("conn_wol", (ctx) => {
    DeleteMSG(ctx);
    ConnWOL(ctx);
  });

  bot.action("conn_back", (ctx) => {
    DeleteMSG(ctx);
    let menuMSG =
      "<strong>RegVisor</strong>  (<i>Sistema de asistencia a la administración de redes y seguridad informática.</i>)\n";
    menuMSG +=
      "A continuación selecciona el tópico sobre el cual deseas recibir ayuda";
    backfunction(ctx, menuMSG);
  });
}

function ConnWOL(ctx) {
  PicMSG(
    ctx,
    imgOptions,
    () => {
      let menuMSG = "►<strong>Wake On Lan y apagado remoto</strong>\n";
      menuMSG +=
        "Esta funcionalidad permite iniciar la secuencia de apagado en un servidor o todos los servidores de un grupo.\n";
      menuMSG +=
        "Además permite el envio de paquetes WOL(Wake On LAN) a servidores que tengan activa esta funcionalidad, posibilitando que se inicien sin tener que presionar el botón de Encendido(Power).\n";
      ctx.replyWithHTML(menuMSG).then(() => {
        return ShowMenu(ctx);
      });
    },
    "./public/conn_command.png",
    "Funcionalidad: WOL y apagado remoto,  Sección: Conexiones"
  );
}
function ConnCommands(ctx) {
  PicMSG(
    ctx,
    imgOptions,
    () => {
      let menuMSG = "►<strong>Comandos remotos</strong>\n";
      menuMSG +=
        "Esta funcionalidad permite definir la lista comandos a ser ejecutados de forma remota.\n";
      menuMSG +=
        "En necesario tener conocimientos sobre el CLI(Command Line Interface) de cada sistema operativo y las funcionalidades que estos proveen.\n";
      menuMSG +=
        "Adicionalmente se pueden ejecutar scripts, especificando su ubicación en el sistema de archivos del servidor de destino y especificando correctamente los parámetros en caso de tener.\n";
      ctx.replyWithHTML(menuMSG).then(() => {
        return ShowMenu(ctx);
      });
    },
    "./public/conn_command.png",
    "Funcionalidad: Comandos remotos,  Sección: Conexiones"
  );
}

function ConnConnections(ctx) {
  PicMSG(
    ctx,
    imgOptions,
    () => {
      let menuMSG = "►<strong>Conexiones</strong>\n";
      menuMSG +=
        "Esta funcionalidad permite definir la lista de servidores en la red.\n";
      menuMSG +=
        "En necesario especificar Sistema Operativo, dirección IP, Credenciales, Grupo, entre otros datos específicos al Sistema Operativo especificado.\n";
      menuMSG +=
        "En el caso de Windows la conexión remota se realiza via MSTSC, en los Linux, es necesario instalar el servidor SSH permitiendo la posibilidad de conectarse utilizando Putty y WinSCP.\n";
      menuMSG +=
        "Además se pueden especificar servicios a monitorear, notificando si se encuentran en ejecución o no.\n";
      ctx.replyWithHTML(menuMSG).then(() => {
        return ShowMenu(ctx);
      });
    },
    "./public/conn_list.png",
    "Funcionalidad: Lista de conexiones,  Sección: Conexiones"
  );
}

function ConnPerformance(ctx) {
  PicMSG(
    ctx,
    imgOptions,
    () => {
      let menuMSG = "►<strong>Datos de rendimiento</strong>\n";
      menuMSG +=
        "Esta funcionalidad permite mostrar datos de rendimiento del servidor seleccionado (Uso de RAM, Disco duro, CPU y tiempo de encendido).\n";
      menuMSG +=
        "Los datos de rendimiento son obtenidos utilizando WMI en el caso de los Windows, para lo cual es necesario especificar credenciales con acceso administrativo; en el caso de los Linux se emplea SNMP, por lo cual debe instalarse este servicio y permitir su acceso (UDP/161).\n";
      ctx.replyWithHTML(menuMSG).then(() => {
        return ShowMenu(ctx);
      });
    },
    "./public/conn_performance.png",
    "Funcionalidad: Datos de rendimiento,  Sección: Conexiones"
  );
}

/**
 * Show config menu
 */
function ShowMenu(ctx) {
  menuMSG = "\u{1F9F0} <strong>\tLista de conexiones</strong>\n";
  menuMSG +=
    "En esta sección se pueden declarar los datos de conexiones a servidores, tanto en Windows como en Linux. Proporcionando un grupo de datos y funcionalidades.\n";
  menuMSG += "Seleccione la funcionalidad deseada\n";
  ctx.replyWithHTML(menuMSG, {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Conexiones",
            callback_data: "conn_list",
          },
          {
            text: "Rendimiento",
            callback_data: "conn_performance",
          },
        ],
        [
          {
            text: "Comandos",
            callback_data: "conn_commands",
          },
          {
            text: "Wake On Lan",
            callback_data: "conn_wol",
          },
          {
            text: "\u{1F448} atras",
            callback_data: "conn_back",
          },
        ],
      ],
    },
  });
}

module.exports = { ShowMenu, Init };
