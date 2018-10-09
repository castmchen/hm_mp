function formatNumber(n) {
    const str = n.toString()
    return str[1] ? str : `0${str}`
}

export function formatTime(date) {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()

    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    const t1 = [year, month, day].map(formatNumber).join('/')
    const t2 = [hour, minute, second].map(formatNumber).join(':')

    return `${t1} ${t2}`
}

export const statusOk = 0 // 正常访问

export const validateErrorCode = (response) => {
    let resFlag = false // 是否正常返回数据
    let data = null
    let code = null
    let msg = ''

    if (response.code === statusOk) {
        resFlag = !resFlag
        data = response.data
        return { resFlag, data, code, msg }
    } else {
        code = response.code
        msg = response.msg

        switch (response.code) {
            case 30401: // 异地登录
                // 清除登录的相关资料
                // store.dispatch('logout')
                wx.showModal({
                    title: '提示',
                    content: '账号登录异常，请进行登录操作',
                    showCancel: false,
                    success: function(res) {
                        // if (res.confirm) {
                        //     if (!validationIndex()) {
                        //         wx.switchTab({ url: '/pages/home/index/main' })
                        //     } else {
                        //         wx.navigateTo({ url: '/pages/user/login/main' })
                        //     }
                        // }
                    }
                })
                return
            default:
                data = response.data
                return { resFlag, data, code, msg }
        }
    }
}

export default {
    formatNumber,
    formatTime,
    validateErrorCode
}
