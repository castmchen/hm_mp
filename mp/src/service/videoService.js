import fly from '../utils/fly'

export const getVideoList = (url) => {
    try {
        var headers = { ignoreToken: true }
        return fly.request(url, null, { method: 'get', headers: headers })
    } catch (e) {
        console.error('An error has occured when get video_gege', e)
    }
}

export default {
    getVideoList
}
