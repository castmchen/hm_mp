import fly from '../utils/fly'
import { PAPA_GETUPDATEUSERLOCATION_URL } from '../common/constant'

const profileInfo = {
    id: 1,
    avatar: 'https://i.loli.net/2017/08/21/599a521472424.jpg',
    name: '啦啦',
    description: "这是一只大美女",
    longitude: 1,
    latitude: 1
}

export default {
    getUserById(id) {
        return new Promise((resolve, reject) => {
            resolve(profileInfo)
        })
    },
    addToFavorite() {},
    updateUserLocation(location) {
        fly.request(PAPA_GETUPDATEUSERLOCATION_URL, location, { method: 'post', timeout: 18000 })
    }
}
