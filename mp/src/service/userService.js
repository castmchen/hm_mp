import fly from '../utils/fly'
import { PAPA_GETUPDATEUSERLOCATION_URL, PAPA_GETUSERBYID_URL } from '../common/constant'

const profileInfo = {
    id: 1,
    avatar: 'https://i.loli.net/2017/08/21/599a521472424.jpg',
    name: '小拉拉',
    description: "君不见，闭月羞花给谁看",
    loc: {
        longitude: 1,
        latitude: 1
    }
}

export default {
    getUserById(id) {
        return new Promise(async(resolve, reject) => {
            if (id.indexOf('robot') > -1) {
                profileInfo.id = id
                return resolve(profileInfo)
            } else {
                const result = await fly.get(PAPA_GETUSERBYID_URL, { userId: id }, { timeout: 180000 })
                return resolve({ id, name: result.userName, avatar: result.avatarUrl, loc: result.loc, description: typeof result.description === 'undefined' || result.description == null ? '很懒，没留下个人描述' : result.description })
            }
        })
    },
    addToFavorite() {},
    updateUserLocation(locationInfo) {
        fly.request(PAPA_GETUPDATEUSERLOCATION_URL, locationInfo, { method: 'post', timeout: 180000 })
    }
}
