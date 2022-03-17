const express = require('express');
const router = express.Router();
const msgList = [
    {
        id: 1,
        name: "sxw1",
        msg: "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the gre‬."
    },
    {
        id: 2,
        name: "sxw2",
        msg: "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the gre‬."
    },
    {
        id: 3,
        name: "sxw3",
        msg: "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the gre‬."
    }
];
let count = msgList.length;

// 检查登陆状态
let isLogin = false;
const checkLoginStatus = function (req) {
    isLogin = false;
    if (req.signedCookies?.userid && req.signedCookies?.password) {
        isLogin = true;
    }
};
router.get('/', (req, res) => {
    checkLoginStatus(req);
    res.render("index", {
        title: '欢迎來到 MicroBlog',
        loginStatus: isLogin,
        msgList
    }) //模版文件名称
    // 配合express-partials 默认都展示layout.ejs模版
    // res.render('index.ejs',{layout:false}) 不展示模版
    // res.render('index.ejs',{layout:'mobile'}) 展示其他模版
});
router.get('/login', (req, res) => {
    res.render("login", {
        title: '登陆',
        loginStatus: isLogin,
    }) //模版文件名称
});
router.get('/reg', (req, res) => {
    res.render("login", {
        title: '注册',
        loginStatus: isLogin,
    }) //模版文件名称
});
router.post('/login', (req, res) => {
    setCookie(req, res)
});
router.post('/reg', (req, res) => {
    setCookie(req, res)
});
router.get('/u/:user', (req, res) => {
    checkLoginStatus(req);
    res.render("user", {
        title: '欢迎來到' + req.params.user + '页面',
        loginStatus: isLogin,
        msgList: msgList.filter((item) => item.name === req.params.user)
    }) //模版文件名称
    // 配合express-partials 默认都展示layout.ejs模版
    // res.render('index.ejs',{layout:false}) 不展示模版
    // res.render('index.ejs',{layout:'mobile'}) 展示其他模版
});
router.post('/post', (req, res) => {
    checkLoginStatus(req);
    msgList.push({id: count++, name: req.signedCookies.userid, msg: req.body['msg']})
    res.redirect('/')
});

function setCookie(req, res) {
    if (req.body['password-repeat'] !== req.body['password']) {
        console.log('密碼輸入不一致。');
        console.log('第一次輸入的密碼：' + req.body['password']);
        console.log('第二次輸入的密碼：' + req.body['password-repeat']);
        return res.redirect('/reg');
    } else {
        // 使用signed参数，会自动使用cookie-parser中间件对cookie进行加密
        res.cookie('userid', req.body['username'], {path: '/', signed: true});
        res.cookie('password', req.body['password'], {path: '/', signed: true});
        return res.redirect('/');
    }
}

module.exports = router;
