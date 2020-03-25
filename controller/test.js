const { catchErrors } = require('../errors/asyncCatch')
const { create } = require('../utils/handle')
const Test = catchErrors(async (ctx, next) => {
    const res = await create()
    ctx.body = {
        code: 200
    }
})

module.exports = {
    Test
}