const express = require('express');
const { routerApi } = require('./router/routerApi.js')
const app = express()

app.use(routerApi)

app.listen(8080, () => {
    console.log("server running on port", 8080)
});