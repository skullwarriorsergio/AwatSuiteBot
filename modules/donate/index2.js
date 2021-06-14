import { Scenes } from 'telegraf';

const contactDataWizard = new Scenes.WizardScene(
  'CONTACT_DATA_WIZARD_SCENE_ID', // first argument is Scene_ID, same as for BaseScene
  (ctx) => {
    ctx.reply('What is your name?');
    ctx.wizard.state.contactData = {};
    return ctx.wizard.next();
  },
  (ctx) => {
    // validation example
    if (ctx.message.text.length < 2) {
      ctx.reply('Please enter name for real');
      return; 
    }
    ctx.wizard.state.contactData.fio = ctx.message.text;
    ctx.reply('Enter your e-mail');
    return ctx.wizard.next();
  },
  async (ctx) => {
    ctx.wizard.state.contactData.email = ctx.message.text;
    ctx.reply('Thank you for your replies, well contact your soon');
    await mySendContactDataMomentBeforeErase(ctx.wizard.state.contactData);
    return ctx.scene.leave();
  },
);

module.exports = function(bot)
{
    const stage = new Scenes.Stage([scene1, scene2, scene3, ...]);
    bot.use(session()); // to  be precise, session is not a must have for Scenes to work, but it sure is lonely without one
    bot.use(stage.middleware());    
};