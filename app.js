const express = require('express')
const path = require("path");
const routes = require("./routes")
const partials = require('express-partials')
const bodyParser = require('body-parser')
const cookieParser=require('cookie-parser')
const app = express()
// 设置模版
app.set('views', path.join(__dirname, 'views'))
// 设置模版引擎
app.set('view engine', 'ejs')
// 展示模版layout.ejs
app.use(partials())
// parse application/json
app.use(bodyParser.json())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// 通过传入的test字符串 加密cookie
app.use(cookieParser('test'))
// 引入静态文件
app.use(express.static(path.join(__dirname, 'public')))

// 设置模版和模版引擎之后，就可以通过路由方法对应的模版
app.use('/', routes)

app.listen(3000, () => {
    console.log("server running on http://localhost:3000")
})
