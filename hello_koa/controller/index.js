const fn_index = async(ctx, next) => {
    ctx.response.body = `<h1>Index</h1>
    <form action="/signin" method="post">
        <p>Name:<input name="name" value="koa" type="text"></p>
        <p>Password:<input name="password" type="password"></p>
        <p><input type="submit" value="submit"></p>
    </form>`
}

const fn_sign = async(ctx, next) => {
    const name = ctx.request.body.name || ''
    const password = ctx.request.body.password || ''
    console.log(`sign in with name:${name},password:${password}`);
    if (name === 'jih' && password === '12345') {
        ctx.body = `<h1>Welcome ${name}</h1>`
    } else {
        ctx.body = `<h1>Login failed</h1>`
    }
}

module.exports = {
    'GET /': fn_index,
    'POST /signin': fn_sign
}