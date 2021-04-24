const handleBlogRuoter = require('./src/ruoter/blog');
const handleUserRuoter = require('./src/ruoter/user');
const querystring = require('querystring');

const serverHandle = (req, res) => {
    //设置返回格式JSON
    res.setHeader('Content-type', 'application/json');

    //获取path
    const url = req.url;
    req.path = url.split('?')[0];

    //解析query
    req.query = querystring.parse(url.split('?')[1]);

    //处理blog路由
    const blogData = handleBlogRuoter(req, res);
    if(blogData){
        res.end(
            JSON.stringify(blogData)
        )
        return;
    }

    //处理user路由
    const userData = handleUserRuoter(req, res);
    if(userData){
        res.end(
            JSON.stringify(userData)
        )
        return;
    }

    //未命中路由。返回404
    res.writeHead(404, {"Content-type": "text/plain"})
    res.write("404 Not Found\n");
    res.end();
}

module.exports = serverHandle;

// env: process.env.NODE_ENV