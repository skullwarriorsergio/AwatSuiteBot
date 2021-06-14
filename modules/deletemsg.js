//-----------Exports-----------
/**
 * Delete the previos chat message without errors.
 *
 * @param MatchedContext ctx - The date
 */
module.exports = function Delete(ctx) {
  try {
    ctx.deleteMessage();
  } catch (error) {}
};
