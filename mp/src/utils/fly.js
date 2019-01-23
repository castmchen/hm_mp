var Fly = require('flyio/dist/npm/wx.js') // wx.js为flyio的微信小程序入口文件
var fly = new Fly() // 创建fly实例

// 添加拦截器
fly.interceptors.request.use((request) => {
    // 给suoyo9u请求添加自定义的header
    request.headers['X-Tag'] = 'flyio'
    request.headers['content-type'] = 'application/json'
        // request.headersp['content-type'] = 'application/x-www-form-urlencoded'

    if (typeof request.headers['Authorization'] == "undefined") {
        return request
    }

    // 寻找vuex中的accesstoken并添加到参数中, 如果vuex中不存在发请求获取token
    // let token = store.getters.accessToken
    let token = null
    if (token !== null) {
        request.headers['Authorization'] = token
        return request
    } else {
        fly.lock()
        return new Fly().get('/authenticate').then(_ => {
            request.headers['Authorization'] = _.data.data.token
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
        if (response.data && typeof response.data === 'string') {
            return JSON.parse(response.data)
        }
        return response
    },
    (e) => {
        //发生网络错误后会走到这里
        console.error('An error has occured while proccessing .', e)
            //return Promise.resolve("ssss")
    }
)

export default fly
