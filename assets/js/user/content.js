$(function () {
    var layer = layui.layer
    var q = {
        pagenum: 1, // 页码值，默认请求第一页的数据
        pagesize: 2, // 每页显示几条数据，默认每页显示2条
        cate_id: '', // 文章分类的 Id
        state: '' // 文章的发布状态
    }
    getList()
    function getList() {
        $.ajax({
            type: 'get',
            url: "my/article/list",
            data: q,
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('获取文章数据失败')
                }
                var list = template('tpl-table', res)
                $('tbody').html(list)
            }
        })
    }
})
