import fly from '../utils/fly'
import { PAPA_LOGIN_URL, PAPA_CHECKANDUPDATEUSER_URL, PAPA_GETUSERLOCATION_URL } from './constant'

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

function getUserInfo() {
    return new Promise((resolve, reject) => {
        wx.getSetting({
            success(res) {
                if (res.authSetting['scope.userInfo']) {
                    wx.getUserInfo({
                        success(res) {
                            resolve(res)
                        },
                        fail(res) {
                            reject(res)
                        }
                    })
                }
            },
            fail(res) {
                reject(res)
            }
        })
    })
}

function updateUserInfo(userInfo) {
    return fly.request(PAPA_CHECKANDUPDATEUSER_URL, { userInfo }, { method: 'post', timeout: 180000 })
}

async function getLocationFromApi(resolve, userId) {
    const targetUrl = `${PAPA_GETUSERLOCATION_URL}?userId=${userId}`
    var locationCallbackData = await fly.request(targetUrl, null, { method: 'get', timeout: 180000 })
    console.log(locationCallbackData)
    if (locationCallbackData && locationCallbackData.data) {
        return resolve(locationCallbackData.data)
    }
    resolve(false)
}

function getUserLocationFromWechat(resolve, userId) {
    wx.getLocation({
        type: 'wgs84',
        success(res) {
            const locationInfo = { lng: res.longitude, lat: res.latitude, isNewLocation: true }
            return resolve(locationInfo)
        },
        fail() {
            getLocationFromApi(resolve, userId)
        }
    })
}

function getUserLocation(resolve, userId) {
    wx.getSetting({
        success(res) {
            if (res.authSetting['scope.userLocation']) {
                getUserLocationFromWechat(resolve, userId)
            } else {
                wx.authorize({
                    scope: 'scope.userLocation',
                    success() {
                        getUserLocationFromWechat(resolve, userId)
                    },
                    fail() {
                        getLocationFromApi(resolve, userId)
                    }
                })
            }
        }
    })
}

export default {
    async login() {
        var code = await getAuthCode()
        var res = await getSessionKey(code)
        if (res.status !== 200 || typeof res.data === 'undefined' || !res.data) {
            showToast('登录失败, 请联系客服!')
        } else {
            return res.data
        }
    },
    async getUserInfo(sessionId) {
        var userInfo = await getUserInfo()
            .catch(err => {
                console.error(`An error has been occured while getting user information, Details: ${err}`)
                showToast('发生异常，请检查网络后重启!')
            })
        var postUserInfo = { sessionId: sessionId, userInfo: userInfo.userInfo, rawData: userInfo.rawData, signature: userInfo.signature }
        var res = await updateUserInfo(postUserInfo)
        if (res.status !== 200 || typeof res.data === 'undefined' || !res.data) {
            showToast('登录失败, 请联系客服!')
        } else if (res.data.message === 'success') {
            return postUserInfo.userInfo
        }
    },
    async checkSessionValid(resolve) {
        await wx.checkSession({ success() { resolve(true) }, fail() { resolve(false) } })
    },
    async getUserLocation(userId) {
        var result = await new Promise(async(resolve, reject) => {
            await getUserLocation(resolve, userId)
        })
        return result
    }
}
