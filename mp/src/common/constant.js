//#region jmessage

export const JM_APPKEY = '7037d4a61f1d7699c8263f57'
export const JM_MASTERSECRET = 'b05b46a8e9a5eb72ccab1121'
export const JM_RANDOM_STR = '404'
    // export const JM_APPKEY = "4f7aef34fb361292c566a1cd"
    // export const JM_MASTERSECRET = "b05b46a8e9a5eb72ccab1121"
export const JM_USER_PASSWORD = '1234567890'

//#endregion

//#region www.lovepapa.site

const PAPA_SERVER_URL = 'https://www.lovepapa.site'
export const PAPA_CHATSERVER_URL = 'wss://www.lovepapa.site/chat'
export const PAPA_LOGIN_URL = `${PAPA_SERVER_URL}/wechat/login`
export const PAPA_CHECKANDUPDATEUSER_URL = `${PAPA_SERVER_URL}/wechat/checkandupdateuser`
export const PAPA_GETUSERBYID_URL = `${PAPA_SERVER_URL}/user/getuserbyid`
export const PAPA_GETUSERBYSESESSIONID_URL = `${PAPA_SERVER_URL}/user/getuserbysessionid`
export const PAPA_GETUPDATEUSERLOCATION_URL = `${PAPA_SERVER_URL}/user/updateuserlocation`
export const PAPA_GETUSERLOCATION_URL = `${PAPA_SERVER_URL}/user/getuserlocation`
export const PAPA_GETNEARBYUSERS_URL = `${PAPA_SERVER_URL}/user/getnearbyusers`

//#endregion

//#region  videoapi section

const TENCENTVIDEOURL = 'https://spidertencent.azurewebsites.net'
export const TENCENTVIDEOURL_KEYWORD = `${TENCENTVIDEOURL}/api/keyword?keyword={keyword}&num={number}`
export const TENCENTVIDEOURL_JIEJIE = `${TENCENTVIDEOURL}/api/keyword?keyword=伊素婉&num={number}`
export const TENCENTVIDEOURL_GEGE = `${TENCENTVIDEOURL}/api/keyword?keyword=蔡徐坤&num={number}`
export const TENCENTVIDEOURL_NONGYAO = `${TENCENTVIDEOURL}/api/keyword?keyword=王者荣耀搞笑&num={number}`
export const TENCENTVIDEOURL_DAXIAN = `${TENCENTVIDEOURL}/api/keyword?keyword=张大仙&num={number}`
export const TENCENTVIDEOURL_SAOBAI = `${TENCENTVIDEOURL}/api/keyword?keyword=骚白&num={number}`
export const TENCENTVIDEOURL_LOL = `${TENCENTVIDEOURL}/api/keyword?keyword=英雄联盟搞笑&num={number}`
export const TENCENTVIDEOURL_WOW = `${TENCENTVIDEOURL}/api/keyword?keyword=魔兽世界&num={number}`
export const TENCENTVIDEOURL_CHIJI = `${TENCENTVIDEOURL}/api/keyword?keyword=吃鸡搞笑时刻&num={number}`
export const TENCENTVIDEOURL_GAOXIAO = `${TENCENTVIDEOURL}/api/keyword?keyword=搞笑小视频&num={number}`

//#endregion

//#region tencent map

const TENCENTMAP_COMMON_APPKEY = 'd84d6d83e0e51e481e50454ccbe8986b'
export const TENCENTMAP_PRIVATE_APPKEY = 'IT5BZ-UVOWD-6EX4L-PX5ZR-FMWA5-HBF3U'
export function buildGetLocationUrl(place) {
    return encodeURI(`https://apis.map.qq.com/ws/place/v1/search?keyword=${place}&key=${TENCENTMAP_COMMON_APPKEY}&boundary=region(${place},0)`)
}
export const TENCENTMAP_API_GETLOCATION = 'https://apis.map.qq.com/ws/place/v1/search?keyword=大连市&key=d84d6d83e0e51e481e50454ccbe8986b&boundary=region(大连市,0)'

//#endregion

//#region video category section

export const VIDEOTYPELIST = [
    { tab: '1', title: '伊素婉' },
    { tab: '2', title: '朴恩率' },
    { tab: '3', title: '杨多顺' },
    { tab: '4', title: '冯提莫' },
    { tab: '5', title: '张大仙' },
    { tab: '6', title: '骚白' },
    { tab: '7', title: '韦神' },
    { tab: '8', title: '农药搞笑' },
    { tab: '9', title: '吃鸡搞笑' },
    { tab: '10', title: '宠物搞笑' }
]

export function getRealPlayUrl(key, num) {
    return `${TENCENTVIDEOURL}/api/keyword/?keyword=${key}&num=${num}`
}
// export const VIDEOTYPELIST = [
//     { tab: '1', title: '伊素婉', url: getRealPlayUrl(this.title, 0) },
//     { tab: '2', title: '朴恩率', url: getRealPlayUrl(this.title, 0) },
//     { tab: '3', title: '杨多顺', url: getRealPlayUrl(this.title, 0) },
//     { tab: '4', title: '冯提莫', url: getRealPlayUrl(this.title, 0) },
//     { tab: '5', title: '张大仙', url: getRealPlayUrl(this.title, 0) },
//     { tab: '6', title: '骚白', url: getRealPlayUrl(this.title, 0) },
//     { tab: '7', title: '韦神', url: getRealPlayUrl(this.title, 0) },
//     { tab: '8', title: '农药搞笑', url: getRealPlayUrl(this.title, 0) },
//     { tab: '9', title: '吃鸡搞笑', url: getRealPlayUrl(this.title, 0) },
//     { tab: '10', title: '宠物搞笑', url: getRealPlayUrl(this.title, 0) }
// ]

//#endregion
export default {
    TENCENTVIDEOURL,
    TENCENTVIDEOURL_KEYWORD,
    TENCENTVIDEOURL_JIEJIE,
    TENCENTVIDEOURL_GEGE,
    TENCENTVIDEOURL_NONGYAO,
    TENCENTVIDEOURL_DAXIAN,
    TENCENTVIDEOURL_SAOBAI,
    TENCENTVIDEOURL_LOL,
    TENCENTVIDEOURL_WOW,
    TENCENTVIDEOURL_CHIJI,
    TENCENTVIDEOURL_GAOXIAO,
    JM_APPKEY,
    JM_MASTERSECRET,
    JM_RANDOM_STR,
    JM_USER_PASSWORD,
    PAPA_CHATSERVER_URL,
    PAPA_LOGIN_URL,
    PAPA_CHECKANDUPDATEUSER_URL,
    PAPA_GETUSERBYID_URL,
    PAPA_GETUSERBYSESESSIONID_URL,
    PAPA_GETUPDATEUSERLOCATION_URL,
    PAPA_GETUSERLOCATION_URL,
    PAPA_GETNEARBYUSERS_URL,
    TENCENTMAP_COMMON_APPKEY,
    TENCENTMAP_PRIVATE_APPKEY,
    TENCENTMAP_API_GETLOCATION,
    VIDEOTYPELIST,
    getRealPlayUrl
}
