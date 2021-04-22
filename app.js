const serverHandle = (req, res) => {
    //设置返回格式JSON
    res.setHeader('Content-type', 'application/json');

    const resData = {
        name: '袁斌',
        site: 'ez4yb'
    }

    res.end(
        JSON.stringfy(resData)
    )
}