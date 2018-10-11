export const keyword = ''
export const number = 0
export const TENCENTVIDEOURL = "https://castmspider.azurewebsites.net"
export const TENCENTVIDEOURL_KEYWORD = 'https://castmspider.azurewebsites.net/api/keyword?keyword={keyword}&num={number}'
export const TENCENTVIDEOURL_JIEJIE = 'https://castmspider.azurewebsites.net/api/keyword?keyword=伊素婉&num={number}'
export const TENCENTVIDEOURL_GEGE = 'https://castmspider.azurewebsites.net/api/keyword?keyword=蔡徐坤&num={number}'
export const TENCENTVIDEOURL_NONGYAO = 'https://castmspider.azurewebsites.net/api/keyword?keyword=王者荣耀搞笑&num={number}'
export const TENCENTVIDEOURL_DAXIAN = 'https://castmspider.azurewebsites.net/api/keyword?keyword=张大仙&num={number}'
export const TENCENTVIDEOURL_SAOBAI = 'https://castmspider.azurewebsites.net/api/keyword?keyword=骚白&num={number}'
export const TENCENTVIDEOURL_LOL = 'https://castmspider.azurewebsites.net/api/keyword?keyword=英雄联盟搞笑&num={number}'
export const TENCENTVIDEOURL_WOW = 'https://castmspider.azurewebsites.net/api/keyword?keyword=魔兽世界&num={number}'
export const TENCENTVIDEOURL_CHIJI = 'https://castmspider.azurewebsites.net/api/keyword?keyword=吃鸡搞笑时刻&num={number}'
export const TENCENTVIDEOURL_GAOXIAO = 'https://castmspider.azurewebsites.net/api/keyword?keyword=搞笑小视频&num={number}'
export function buildTargetUrl(url, number, keyword) {
    var targetUrl = ''
    if (keyword != null && url.indexOf('{keyword}') > -1) {
        targetUrl = url.replace('{keyword}', keyword)
    }
    targetUrl = url.replace('{number}', number)
    console.log(targetUrl)
    return targetUrl
}

export function buildTargetUrlByNumber(url, number) {
    this.number = number
    return url
}

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
    buildTargetUrl,
    buildTargetUrlByNumber
}
