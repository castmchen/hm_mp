export default {
    init(initObj, success, error, timeout) {
        return this.callback(global.JIM.init(initObj), success, error, timeout)
    },
    login(loginObj, success, error, timeout) {
        return this.callback(global.JIM.login(loginObj), success, error, timeout)
    },
    register(registerObj, success, error, timeout) {
        return this.callback(global.JIM.register(registerObj, success, error, timeout))
    },
    callback(obj, ...args) {
        return new Promise(resolve => {
            if (obj && obj.onSuccess) {
                obj.onSuccess(successData => {
                    if (successData.code) {
                        delete successData.code
                    }
                    if (args[0] && args[0] instanceof Function) {
                        args[0](successData)
                    }
                    resolve(successData)
                }).onFail(errorData => {
                    if (args[1] && args[1] instanceof Function) {
                        args[1](errorData)
                    }
                    resolve(errorData)
                }).onTimeout(() => {
                    if (args[2] && args[2] instanceof Function) {
                        args[2]()
                    }
                    resolve({ code: -2 })
                })
            }
        })
    },
    msgCallback(obj, ...args) {
        return new Promise(resolve => {
            if (obj && obj.onSuccess) {
                obj.onSuccess((successData, msgs) => {
                    if (successData.key) {
                        msgs.key = successData.key
                    }
                    msgs.unread_count = successData.unread_count || 0
                    if (args[0] && args[0] instanceof Function) {
                        args[0](msgs)
                    }
                    resolve(msgs)
                }).onFail(errorData => {
                    if (args[1] && args[1] instanceof Function) {
                        args[1](errorData)
                    }
                    resolve(errorData)
                }).onTimeout(() => {
                    if (args[2] && args[2] instanceof Function) {
                        args[2]()
                    }
                    resolve({ code: -2 })
                })
            }
        })
    }
}
