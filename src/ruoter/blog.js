const {getList, getDetail} = require('../controller/blog')
const {SuccessModel, ErroModel} = require('../model/resModel')

const handerBlogRouter = (req, res) => {
    const method = req.method;

    //获取博客列表
    if(method === 'GET' && req.path === '/api/blog/list'){
        const author = req.query.author || '';
        const keyword = req.query.keyword || '';
        const listData = getList(author, keyword);
        return new SuccessModel(listData);
    }

    //获取博客详情
    if(method === 'GET' && req.path === '/api/blog/detail'){
        const id = req.query.id;
        const data = getDetail(id);
        return new SuccessModel(data);
    }

    //新建一篇博客
    if(method === 'POST' && req.path === '/api/blog/new'){
        return {
            msg: '新建博客'
        }
    }

    //删除
    if(method === 'POST' && req.path === 'api/blog/del'){
        return {
            msg: '删除博客'
        }
    }
}

module.exports = handerBlogRouter;