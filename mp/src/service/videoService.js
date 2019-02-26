import fly from '../utils/fly'

export function getVideoList(url) {
    try {
        return fly.request(url, null, { method: 'get', timeout: 180000 })
    } catch (err) {
        console.err(`An error has been occured while getting videos' information from url ${url}, Details: ${err}`)
    }
}

export default {
    getVideoList
}
