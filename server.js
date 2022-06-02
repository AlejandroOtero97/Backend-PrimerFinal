const express = require('express');
const { routerApi } = require('./router/routerApi.js')
const app = express()
const path = require('node:path');

app.use(routerApi)

routerApi.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/index.html"))
})

app.listen(8080, () => {
    console.log("server running on port", 8080)
});