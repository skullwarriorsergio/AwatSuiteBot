//-----------Exports-----------
module.exports = function SendMSGwithPicture(ctx, imgOptions, msgFunction, picURI, picCaption)
{
    var found = imgOptions.find(function(el) {
        return el.chatid === ctx.from.id;
    });    
    if (found)
    {
        ctx.replyWithPhoto({source: picURI} , {caption: picCaption}).then(() => { return msgFunction(ctx)} );
    }
    else
    {
        msgFunction(ctx);
    }
}