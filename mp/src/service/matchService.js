const natureData = [{
        id: 1,
        description: '弯的',
        checked: false,
        color: 'red'
    },
    {
        id: 2,
        description: '白莲花',
        checked: false,
        color: 'red'
    },
    {
        id: 3,
        description: '心机婊',
        checked: false,
        color: 'blue'
    },
    {
        id: 4,
        description: '渣男',
        checked: false,
        color: 'yellow'
    },
    {
        id: 5,
        description: '乐天派',
        checked: false,
        color: 'green'
    },
    {
        id: 6,
        description: '佛系',
        checked: false,
        color: 'yellow'
    },
    {
        id: 7,
        description: '幽默风趣',
        checked: false,
        color: 'green'
    },
    {
        id: 8,
        description: '美貌和智慧',
        checked: false,
        color: 'yellow'
    },
    {
        id: 9,
        description: '文艺',
        checked: false,
        color: 'green'
    },
    {
        id: 10,
        description: '小清新',
        checked: false,
        color: 'red'
    },
    {
        id: 11,
        description: '屌丝',
        checked: false,
        color: 'red'
    },
    {
        id: 12,
        description: '女汉子',
        checked: false,
        color: 'default'
    },
    {
        id: 13,
        description: '打不死的小强',
        checked: false,
        color: 'default'
    },
    {
        id: 14,
        description: '坑爹',
        checked: false,
        color: 'yellow'
    },
    {
        id: 15,
        description: '贼6',
        checked: false,
        color: 'default'
    },
    {
        id: 16,
        description: '丫鬟命',
        checked: false,
        color: 'green'
    },
    {
        id: 17,
        description: '大小姐一样',
        checked: false,
        color: 'green'
    },
    {
        id: 18,
        description: '普普通通',
        checked: false,
        color: 'yellow'
    },
    {
        id: 19,
        description: '成熟稳重',
        checked: false,
        color: 'blue'
    },
    {
        id: 20,
        description: '王思聪一样',
        checked: false,
        color: 'red'
    }
]
const amountData = [{
        id: 1,
        amount: "小于5000"
    },
    {
        id: 2,
        amount: "5000~10000"
    },
    {
        id: 3,
        amount: "10000~2000"
    },
    {
        id: 4,
        amount: "20000~50000"
    },
    {
        id: 5,
        amount: "实现了一个小目标"
    }
]
const mindData = [{
        id: 1,
        sense: "老死不相往来"
    },
    {
        id: 2,
        sense: "who am I, where is here"
    },
    {
        id: 3,
        sense: "祝她幸福"
    },
    {
        id: 4,
        sense: "他/她若安好便是晴天"
    }
]
const lifeData = [{
        id: 1,
        sense: "人间不值得"
    },
    {
        id: 2,
        sense: "what's a fucking day"
    },
    {
        id: 3,
        sense: "安稳度日"
    },
    {
        id: 4,
        sense: "享生活"
    }
]
export const matchService = {
    getNatureData() {
        return new Promise((resolve, reject) => {
            let result = this.buildRandomNatureData(natureData)
            resolve(result)
        })
    },
    buildRandomNatureData(natrueList) {
        let randomArray = [Math.floor(Math.random() * 20 + 1), Math.floor(Math.random() * 20 + 1), Math.floor(Math.random() * 20 + 1), Math.floor(Math.random() * 20 + 1), Math.floor(Math.random() * 20 + 1), Math.floor(Math.random() * 20 + 1), Math.floor(Math.random() * 20 + 1), Math.floor(Math.random() * 20 + 1), Math.floor(Math.random() * 20 + 1), Math.floor(Math.random() * 20 + 1)]
        var result = []
        randomArray.forEach((p) => {
            natrueList.forEach(e => {
                if (e.id === p) {
                    result.push(e)
                }
            })
        })
        return result
    },
    getSalaryData() {
        return new Promise((resolve, reject) => {
            let result = amountData
            resolve(result)
        })
    },
    getMindData() {
        return new Promise((resolve, reject) => {
            let result = mindData
            resolve(result)
        })
    },
    getLifeData() {
        return new Promise((resolve, reject) => {
            resolve(lifeData)
        })
    }
}
