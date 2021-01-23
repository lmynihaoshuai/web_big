$(function () {
    var form = layui.form
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        samePwd: function (value) {
            if (value === $('#ym').val()) {
                return '新旧密码不能一样'
            }
        },
        qrPwd: function (value) {
            if (value !== $('#newPwd').val()) {
                return '两次密码不一致'
            }
        }
    })
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        changePwd()
    })
})

function changePwd() {
    var layer = layui.layer
    $.ajax({
        type: 'post',
        url: 'my/updatepwd',
        data: {
            oldPwd: $('#ym').val(),
            newPwd: $('#newPwd').val()
        },
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layui.layer.msg('更新密码成功！')
            $('.layui-form')[0].reset()
        }
    })
}