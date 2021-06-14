//-----------Exports-----------
module.exports = function SendMSGwithPicture(ctx, imgOptions, msgFunction, picURI, picCaption, isanim=false)
{
    var found = imgOptions.find(function(el) {
        return el.chatid === ctx.from.id;
    });    
    if (found)
    {
        if (isanim)
            ctx.replyWithAnimation({source: picURI} , {caption: picCaption}).then(() => { return msgFunction(ctx)} );
        else 
            ctx.replyWithPhoto({source: picURI} , {caption: picCaption}).then(() => { return msgFunction(ctx)} );
    }
    else
    {
        msgFunction(ctx);
    }
}