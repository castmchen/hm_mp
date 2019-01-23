import global from './global'
import { md5 } from '../utils/md5.tool'
import { JM_APPKEY, JM_MASTERSECRET, JM_RANDOM_STR, JM_USER_PASSWORD } from './constant'
import JIMService from './jm.operationService'

function createSignature(authPayload) {
    return md5(`appkey=${authPayload.appkey}&timestamp=${authPayload.timestamp}&random_str=${authPayload.randomStr}&key=${authPayload.masterSecret}`)
}

function onInitSuccessful(resolve, currentUser) {
    // TODO => 通过微信API获取user信息
    let username = ''
    const loginObj = {
        username,
        password: JM_USER_PASSWORD
    }
    let data = JIMService.login(loginObj)
    if (data.code) {
        if (data.code == 880203) {
            const registerObj = {
                username,
                password: JM_USER_PASSWORD
            }
            const data = JIMService.register(registerObj)
            if (data.code) {
                resolve(false)
            } else {
                return onInitSuccessful(resolve, username)
            }
        }
        return resolve(false)
    } else {
        global.username = data.user
        return resolve(true)
    }
}

export default {
    JMInit: async(resolve) => {
        let timestamp = new Date().getTime()
        const authPayload = {
            appkey: JM_APPKEY,
            timestamp: timestamp,
            random_str: JM_RANDOM_STR,
            masterSecret: JM_MASTERSECRET
        }
        let signature = createSignature(authPayload)

        const initObj = {
            appkey: authPayload.appkey,
            random_str: authPayload.random_str,
            signature,
            timestamp
        }
        const data = await JIMService.init(initObj)
        if (data.code) {
            resolve(false)
        } else {
            return onInitSuccessful(resolve)
        }
    }
}
