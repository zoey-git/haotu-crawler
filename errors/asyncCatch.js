module.exports = {
    catchErrors(requestHandle) {
        return async (ctx, next) => {
            try {
                return await requestHandle(ctx, next)
            } catch (error) {
                console.log(error);
                next(error)
            }
        }
    }
}