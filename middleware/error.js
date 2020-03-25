
module.exports = {
    handleError (ctx, next) {
        ctx.body = {
            msg: 'error'
        }
    }
}