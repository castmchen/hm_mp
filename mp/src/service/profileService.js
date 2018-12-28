const profileInfo = {
    id: 1,
    avatar: 'https://i.loli.net/2017/08/21/599a521472424.jpg',
    name: '啦啦',
    description: "这是一只大美女",
    longitude: 1,
    latitude: 1
}

export const profileService = {
    getProfileById(id) {
        return new Promise((resolve, reject) => {
            resolve(profileInfo)
        })
    },
    addToFavorite() {

    }
}
