import { PAPA_GETNEARBYUSERS_URL } from '../common/constant'
import fly from '../utils/fly'

function getNearbyContactsFromApi(queryObj) {
    return fly.get(PAPA_GETNEARBYUSERS_URL, queryObj, { timeout: 180000 })
}

function getRobotContacts(longitude, latitude) {
    longitude = longitude + 0.03
    latitude = latitude + 0.03
    const robotList = []
    for (let i = 1; i <= 10; i++) {
        i % 2 === 1 ? longitude = longitude - 0.01 : latitude = latitude - 0.01

        robotList.push({
            id: 'robot_' + i,
            avatarUrl: `../../static/img/robot/${i}.jpg`,
            longitude,
            latitude,
            content: '撩友很懒, 还未设置标签'
        })
    }
    return robotList
}

function convertContactToMasker(contactList) {
    const color = '#ffffff'
    var bgColor = '#FFCED3'
    const width = 40
    const height = 40
    const zIndex = 99
    const textAlign = 'left'
    const borderRadius = 5

    let result = []
    contactList.forEach(contactInfo => {
        result.push({
            id: contactInfo.id,
            longitude: contactInfo.longitude,
            latitude: contactInfo.latitude,
            iconPath: contactInfo.avatarUrl,
            width,
            height,
            zIndex,
            callout: {
                display: contactInfo.content != null && contactInfo.content != '' ? 'ALWAYS' : 'BYCLICK',
                content: contactInfo.content,
                color,
                bgColor,
                borderRadius,
                textAlign
            }
        })
    })
    return result
}

export default {
    async getNearbyContacts(userId, longitude, latitude) {
        var result = null
        const callbackData = await getNearbyContactsFromApi({ userId, lng: longitude, lat: latitude })
        if (callbackData && callbackData.data) {
            result = callbackData.data.result
        }
        if (typeof result === 'string') {
            result = []
        }
        const robotList = getRobotContacts(longitude, latitude)
        result.push(...robotList)
        return convertContactToMasker(result)
    }
}
