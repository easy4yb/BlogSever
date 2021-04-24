const getList = (author, keyword) => {
    return[
        {
            id: 1,
            title: '标题A',
            content: '内容A',
            createTime: 123456,
            author: 'zhangsan'
        },
        {
            id: 2,
            title: '标题B',
            content: '内容B',
            createTime: 234567,
            author: 'lisi'
        }
    ]
}

const getDetail = (id) => {
    return {
        id: 1,
        title: '标题A',
        content: '内容A',
        createTime: 123456,
        author: 'zhangsan'
    }
}

module.exports = {
    getList,
    getDetail
}