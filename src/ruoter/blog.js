const {getList, getDetail, newBlog, updateBlog, delBlog} = require('../controller/blog')
const {SuccessModel, ErroModel} = require('../model/resModel')

//登录验证
const loginCheck = (req) => {
    if(!req.session.username){
        return Promise.resolve(new ErroModel('尚未登录'));
    }
    
}

const handerBlogRouter = (req, res) => {
    const method = req.method;
    const id = req.query.id;

    //获取博客列表
    if(method === 'GET' && req.path === '/api/blog/list'){
        const author = req.query.author || '';
        const keyword = req.query.keyword || '';

        const result = getList(author, keyword)
        return result.then(listData => {
            return new SuccessModel(listData);
        })
    }

    //获取博客详情
    if(method === 'GET' && req.path === '/api/blog/detail'){
        const result = getDetail(id);

        return result.then(data => {
            return new SuccessModel(data);
        })
    }

    //新建一篇博客
    if(method === 'POST' && req.path === '/api/blog/new'){
        const loginCheckResult = loginCheck(req);
        //未登录
        if(loginCheckResult){
            return loginCheck;
        }

        req.body.author = req.session.username;

        const result = newBlog(req.body);
        return result.then(data => {
            return new SuccessModel(data);
        })
    }

    if(method === 'POST' && req.path === '/api/blog/update'){
        const loginCheckResult = loginCheck(req);
        //未登录
        if(loginCheckResult){
            return loginCheck;
        }

        const result = updateBlog(id, req.body);
        return result.then(val => {
            if(val){
                return new SuccessModel();
            }else{
                return new ErroModel('更新博客失败')
            }
        })
    }

    //删除
    if(method === 'POST' && req.path === '/api/blog/del'){
        const loginCheckResult = loginCheck(req);
        //未登录
        if(loginCheckResult){
            return loginCheck;
        }
        
        const author = req.session.username
        const result = delBlog(id, author);
        
        return result.then(val => {
            if(val){
                return new SuccessModel();
            }else{
                return new ErroModel('删除博客失败')
            }
        })
    }
}

module.exports = handerBlogRouter;