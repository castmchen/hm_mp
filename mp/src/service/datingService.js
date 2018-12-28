var contactArray = [{
        id: 1,
        name: 'alice',
        avatar: 'https://i.loli.net/2017/08/21/599a521472424.jpg',
        description: "这是一只大美女",
        longitude: 1,
        latitude: 1
    },
    {
        id: 2,
        name: 'bob',
        avatar: 'https://i.loli.net/2017/08/21/599a521472424.jpg',
        description: "这是一只大美女",
        longitude: 1,
        latitude: 1
    },
    {
        id: 3,
        name: 'dennis',
        avatar: 'https://i.loli.net/2017/08/21/599a521472424.jpg',
        description: "这是一只大美女",
        longitude: 1,
        latitude: 1
    }, {
        id: 4,
        name: 'chenqiang',
        avatar: 'https://i.loli.net/2017/08/21/599a521472424.jpg',
        description: "这是一只大美女",
        longitude: 1,
        latitude: 1
    }, {
        id: 5,
        name: 'rose',
        avatar: 'https://i.loli.net/2017/08/21/599a521472424.jpg',
        description: "这是一只大美女",
        longitude: 1,
        latitude: 1
    }, {
        id: 6,
        name: 'nick',
        avatar: 'https://i.loli.net/2017/08/21/599a521472424.jpg',
        description: "这是一只大美女",
        longitude: 1,
        latitude: 1
    }, {
        id: 7,
        name: 'lee',
        avatar: 'https://i.loli.net/2017/08/21/599a521472424.jpg',
        description: "这是一只大美女",
        longitude: 1,
        latitude: 1
    }, {
        id: 8,
        name: 'kobe',
        avatar: 'https://i.loli.net/2017/08/21/599a521472424.jpg',
        description: "这是一只大美女",
        longitude: 1,
        latitude: 1
    }
]
export const datingService = {
    getContactList(userId) {
        return new Promise((resolve, reject) => {
            resolve(contactArray)
        })
    },
    removeSpecifiedContact(contactInfo) {
        return new Promise((resolve, reject) => {
            let result = []
            contactArray.forEach((p, index) => {
                if (p.id !== contactInfo.id) {
                    result.push(p)
                }
            })
            contactArray = result
            resolve(result)
        })
    }
}
