import fly from '../utils/fly'

export const getVideoList = (url) => {
    try {
        return fly.request(url, null, { method: 'get' })
    } catch (e) {
        console.error('An error has occured when get video_gage', e)
    }
}

export default {
    getVideoList
}
