const {login} = require('../controller/user');
const { SuccessModel, ErroModel } = require('../model/resModel');
const {set, get} = require('../db/redis');

const handleUserRouter = (req, res) => {
    const method = req.method;

    //登录
    if(method === 'POST' && req.path  === '/api/user/login'){
        const {username, password} = req.body;
        const result = login(username, password);
        return result.then(data => {
            if(data.username){
                //设置session
                req.session.username = data.username;
                req.session.realname = data.realname;
                //同步到redis
                set(req.sessionId, req.session)
                return new SuccessModel();
            }else{
                return new ErroModel('登录失败');
            }
        })
    }

    // //登录验证测试
    // if(method === 'GET' && req.path === '/api/user/login-test'){
    //     if(req.session.username){
    //         return Promise.resolve(new SuccessModel(
    //             {
    //                 session: req.session
    //             }
    //         ))
    //     }
    //     return Promise.resolve(new ErroModel('尚未登录'));
    // }
}

module.exports = handleUserRouter;