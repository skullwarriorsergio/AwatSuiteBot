//-----------Exports-----------
/**
 * Send a mediafile and an call a function afterwards.
 *
 * @param {MatchedContext} ctx - Chat context
 * @param {Array} imgOptions - Value array ChatID/EnablePics
 * @param {Function} msgFunction - Function who send the message
 * @param {string} picURI - URI of the media file
 * @param {string} picCaption - Caption to show with the media file
 * @param {boolean} isanim - Is the media file an animation/video?
 */
module.exports = function SendMSGwithPicture(
  ctx,
  imgOptions,
  msgFunction,
  picURI,
  picCaption,
  isanim = false
) {
  var found = imgOptions.find(function (el) {
    return el.chatid === ctx.from.id;
  });
  if (found) {
    if (isanim)
      ctx
        .replyWithAnimation({ source: picURI }, { caption: picCaption })
        .then(() => {
          return msgFunction(ctx);
        });
    else
      ctx
        .replyWithPhoto({ source: picURI }, { caption: picCaption })
        .then(() => {
          return msgFunction(ctx);
        });
  } else {
    msgFunction(ctx);
  }
};
