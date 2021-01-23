$(function () {
    var layer = layui.layer
    indexs_xuanran();
    //退出项
    $('#btn_tq').on('click', function () {
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
            //do something
            // 1. 清空本地存储中的 token
            localStorage.removeItem('token')
            // 2. 重新跳转到登录页面
            location.href = 'dr.html'
            // 关闭 confirm 询问框
            layer.close(index)
        })
    })
})


function indexs_xuanran() {
    $.ajax({
        type: 'get',
        url: 'my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token')
        // },
        success: function (res) {
            if (res.status !== 0) {
                return ('获取失败')
            }
            photoGet(res.data)
        },
        // complete: function (res) {
        //     console.log(res);
        //     if (res.responseJSON.status == 1 && res.responseJSON.message == '身份认证失败！') {
        //         //清空本地的token
        //         localStorage.removeItem('token')
        //         //强制调回登入页面
        //         location.href = 'dr.html'

        //     }
        // }
    })
}

    
function photoGet(user) {
    var name = user.nickname || user.username
    console.log(name);
    $('#welcome').html('欢迎&nbsp&nbsp' + name)
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    }
    else {
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()

    }
}