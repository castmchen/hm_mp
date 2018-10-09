var Fly = require('flyio/dist/npm/wx.js') // wx.js为flyio的微信小程序入口文件
var fly = new Fly() // 创建fly实例

// 添加拦截器
fly.interceptors.request.use((request) => {
    // 给suoyo9u请求添加自定义的header
    request.headers['X-Tag'] = 'flyio'
        // request.headersp['content-type'] = 'application/x-www-form-urlencoded'
        // request.headers['content-type'] = 'application/json'

    if (request.headers['ignoreToken']) {
        return request
    }

    // 寻找vuex中的accesstoken并添加到参数中, 如果vuex中不存在发请求获取token
    // let token = store.getters.accessToken
    let token = null
    if (token !== null) {
        request.headers['token'] = token
        return request
    } else {
        fly.lock()
        return new Fly().get('/token').then(_ => {
            request.headers['csrfToken'] = _.data.data.token
                // TODO => token添加到vuex中保存
            return request
        }).finally(() => {
            fly.unlock()
        })
    }
})

fly.interceptors.response.use(
    (response) => {
        //只将请求结果的data字段返回
        return response.data
    },
    (e) => {
        //发生网络错误后会走到这里
        console.error('An error has occured.', e)
            //return Promise.resolve("ssss")
    }
)

export default fly
