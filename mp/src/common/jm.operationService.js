export default {
    init(initObj, success, error, timeout) {
        return this.callback(global.JIM.init(initObj), success, error, timeout)
    },
    login(loginObj, success, error, timeout) {
        return this.callback(global.JIM.login(loginObj), success, error, timeout)
    },
    register(registerObj, success, error, timeout) {
        return this.callback(global.JIM.register(registerObj), success, error, timeout)
    },
    getUserInfoByUserName(userInfo, success, error, timeout) {
        return this.callback(global.JIM.getUserInfo(userInfo), success, error, timeout)
    },
    updateUserInfo(userInfo, success, error, timeout) {
        return this.callback(global.JIM.updateSelfInfo(userInfo), success, error, timeout)
    },
    checkIfLogin() {
        return global.JIM.isLogin()
    },
    checkIfInit() {
        return global.JIM.isInit()
    },
    checkIfConnect() {
        return global.JIM.isConnect()
    },
    getFriendList(success, error, timeout) {
        return this.callback(global.JIM.getFriendList(), success, error, timeout)
    },
    sendSingleMsg(msgInfo, success, error, timeout) {
        debugger
        return this.callback(global.JIM.sendSingleMsg(msgInfo), success, error, timeout)
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
            } else if (!obj) {
                resolve(obj)
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
