$(function () {
    var layer = layui.layer
    //点击之后跳转登录或者注册事件
    $('#dr').on('click', function () {
        $('.login_box').hide()
        $('.zc_box').show()
    })
    $('#zc').on('click', function () {
        $('.login_box').show()
        $('.zc_box').hide()
    })

    var form = layui.form
    form.verify({
        pswd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repwd: function (value) {
            var pwd = $('#yhipt').val()
            if (pwd !== value) {
                return ('两次密码不一致')
            }
        }
    })
    $('#zhuche').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: 'api/reguser',
            data: {
                username: $('#yh').val(),
                password: $('#yhipt').val()
            },
            success: function (res) {
                if (res.status !== 0) {
                    console.log(res);
                    return layer.msg(res.message)
                }
                layer.msg('注册成功，请登录')
                $('#link_login').click()
            }
        })
    })
1
    $('#yh_dr').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            type: 'post',
            url: 'api/login',
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('登录成功', function () {
                    localStorage.setItem('token', res.token)
                    location.href = 'index.html'
                })
            }
        })
    })
})