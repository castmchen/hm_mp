import fly from '../utils/fly'
import { PAPA_LOGIN_URL } from '../common/constant'

function showToast(content) {
    wx.showToast({
        title: content,
        icon: 'none'
    })
}

function getAuthCode() {
    return new Promise((resolve, reject) => {
        wx.login({
            success(res) {
                if (res.code) {
                    resolve(res.code)
                } else {
                    showToast('登录失败, 请稍后重试!')
                }
            }
        })
    })
}

function getSessionKey(code) {
    return fly.request(PAPA_LOGIN_URL, { code }, { method: 'post', timeout: 180000 })
}

export default {
    async login() {
        var code = await getAuthCode()
        console.log(code)
        var res = await getSessionKey(code)
        if (res.status !== 200 || typeof res.data == 'undefined' || !res.data) {
            showToast('登录失败, 请联系客服!')
        } else {
            return res.data
        }
    }
}
