$(function () {
    var form = layui.form
    var layer = layui.layer
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度必须在 1 ~ 6 个字符之间！'
            }
        }
    })
    
    userGet()

    function userGet() {
        $.ajax({
            type: 'get',
            url: 'my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败！')
                }
                console.log(res);
                form.val('userInfoForm', res.data)
            }
        })
    }


    $('#btnReset').on('click', function (e) {
        // 阻止表单的默认重置行为
        e.preventDefault()
        userGet()
    })


    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            type: 'post',
            url: 'my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('提交数据失败')
                }
                layer.msg('更新数据成功')
                console.log(window.parent);
                window.parent.indexs_xuanran()
            }
        })
    })
})

