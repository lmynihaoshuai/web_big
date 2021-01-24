$(function () {
    var layer = layui.layer
    var indexAdd = null
    var form = layui.form
    var indexEdit = null
    initArtCateList()
    // 获取文章分类的列表

    $('#tj').on('click', function () {

        indexAdd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#zj').html()
        })

    })

    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault()
        $.ajax({
            type: 'post',
            url: 'my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                initArtCateList()
                layer.msg('添加文章成功')
                layer.open(indexAdd)
            }
        })
    })

    $('tbody').on('click', '.btn-edit', function () {
        // 弹出一个修改文章分类信息的层
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $('#dialog-edit').html()
        })
        var id = $(this).attr('data-id')
        // 发起请求获取对应分类的数据
        $.ajax({
            method: 'GET',
            url: 'my/article/cates/' + id,
            success: function (res) {
                form.val('form-edit', res.data)
            }
        })
    })



    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: 'my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('更新分类数据失败！')
                }
                layer.msg('更新分类数据成功！')
                layer.close(indexEdit)
                initArtCateList()
            }
        })
    })

    $('tbody').on('click', '.btn-delete', function (e) {
        e.preventDefault()
        var id = $(this).attr('data-id')
        console.log();
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                type: 'get',
                url: 'my/article/deletecate/' + id,
                success: function (res) {
                    console.log(res);
                    if (res.status !== 0) {
                        return layer.msg('删除数据失败')
                    }
                    layer.close(index)
                    layer.msg('删除数据成功')
                    initArtCateList()
                }
            })

        })
    })
})



function initArtCateList() {
    $.ajax({
        method: 'GET',
        url: 'my/article/cates',
        success: function (res) {
            var htmlStr = template('tpl-table', res)
            $('tbody').html(htmlStr)
        }
    })
}
