import { JM_APPKEY, JM_MASTERSECRET, JM_RANDOM_STR, JM_USER_PASSWORD } from './constant'
import JIMService from './jm.operationService'
const CryptoJS = require('crypto-js')

function createSignature(authPayload) {
    return CryptoJS.MD5(
        `appkey=${authPayload.appkey}&timestamp=${authPayload.timestamp}&random_str=${
          authPayload.randomStr
        }&key=${authPayload.masterSecret}`
    ).toString()
}

async function onInitSuccessful(resolve, currentUser, isRecursiveFlag) {
    if (!isRecursiveFlag) {
        if (currentUser == null || typeof currentUser === 'undefined') {
            return resolve(false)
        }

        const loginStatusCallbackData = await JIMService.checkIfLogin()
        if (loginStatusCallbackData) {
            return resolve(true)
        }
    }
    var that = this
    const username = currentUser.userName
        // if (isRecursiveFlag) {
        // await JIMService.getUserInfoByUserName({ username })
        // await JIMService.updateUserInfo({media_id: currentUser.avatarUrl})
        // }
    const loginCallbackData = await JIMService.login({
        username,
        password: JM_USER_PASSWORD
    }).catch(err => {
        console.error(`An error has been occured while logining JI GUANG account, Details: ${err}`)
    })

    if (loginCallbackData.code) {
        if (loginCallbackData.code == 880103 || loginCallbackData.code == 880203) {
            const registerInfo = {
                username,
                nickname: currentUser.nickName,
                password: JM_USER_PASSWORD,
                gender: currentUser.gender,
                region: currentUser.city,
                address: `${currentUser.country}\\${currentUser.province}\\${currentUser.city}`,
                extras: {
                    avatar: currentUser.avatarUrl
                }
            }
            console.log('---------------JIM prepare to register new user----------------')
            const registerCallbackData = await JIMService.register(registerInfo).catch(err => {
                console.error(`An error has been occured while registering account, Details: ${err}`)
            })
            if (registerCallbackData.code) {
                console.log('---------------JIM register fail----------------')
                resolve(false)
            } else {
                console.log('---------------JIM register successfully and retry to login----------------')
                return onInitSuccessful(resolve, currentUser, true)
            }
        }
        return resolve(false)
    } else {
        global.JIM.onDisconnect((res) => {
            console.log('---------------JIM has disconnected and retry to init----------------')
            that.JMInit(currentUser)
        })
        console.log('---------------JIM login successfully----------------')
        global.username = loginCallbackData.userName
        return resolve(true)
    }
}

export default {
    JMInit: async(resolve, currentUser) => {
        try {
            const initStatusCallbackData = await JIMService.checkIfInit()
            if (initStatusCallbackData) {
                return await onInitSuccessful(resolve, currentUser)
            } else {
                const timestamp = new Date().getTime()
                const authPayload = {
                    appkey: JM_APPKEY,
                    timestamp,
                    randomStr: JM_RANDOM_STR,
                    masterSecret: JM_MASTERSECRET
                }
                const signature = createSignature(authPayload)

                const initObj = {
                    appkey: authPayload.appkey,
                    random_str: authPayload.randomStr,
                    signature,
                    timestamp: authPayload.timestamp
                }
                console.log('---------------JIM is initing----------------')
                const data = await JIMService.init(initObj)
                if (data.code) {
                    resolve(false)
                } else {
                    console.log('---------------JIM init successfully----------------')
                    return onInitSuccessful(resolve, currentUser)
                }
            }
        } catch (err) {
            console.error(`An error has been occured while processing JI GUANG account, Details: ${err}`)
            throw err
        }
    }
}
