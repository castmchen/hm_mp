// const userLocation = {
//     longitude: "121.62",
//     latitude: "38.92"
// }
const paoyLocations = [{
        id: 1,
        iconPath: "/static/img/video.png",
        longitude: "121.6147600000",
        latitude: "38.9136900000",
        width: 30,
        height: 30,
        zIndex: 99,
        callout: {
            content: "喜欢我就点一下",
            color: "#628D41",
            borderRadius: 30,
            display: "ALWAYS",
            bgColor: "#FFC7B9",
            textAlign: "center"
        }
    },
    {
        id: 2,
        iconPath: "/static/img/game.png",
        longitude: "121.6211414337",
        latitude: "38.9136095232",
        width: 30,
        height: 30,
        zIndex: 99,
        callout: {
            content: "喜欢直男",
            color: "#628D41",
            borderRadius: 30,
            display: "ALWAYS",
            bgColor: "#FFC7B9",
            textAlign: "center"
        }
    },
    {
        id: 3,
        iconPath: "/static/img/joke.png",
        longitude: "121.6276645660",
        latitude: "38.9142773635",
        width: 30,
        height: 30,
        zIndex: 99,
        callout: {
            content: "喜欢美女",
            color: "#628D41",
            borderRadius: 30,
            display: "ALWAYS",
            bgColor: "#FFC7B9",
            textAlign: "center"
        }

    },
    {
        id: 4,
        iconPath: "/static/img/more.png",
        longitude: "121.6276645660",
        latitude: "38.9178835923",
        width: 30,
        height: 30,
        zIndex: 99,
        callout: {
            content: "喜欢美女",
            color: "#628D41",
            borderRadius: 30,
            display: "ALWAYS",
            bgColor: "#FFC7B9",
            textAlign: "center"
        }
    },
    {
        id: 5,
        iconPath: "/static/img/more.png",
        longitude: "121.6211414337",
        latitude: "38.9178835923",
        width: 30,
        height: 30,
        zIndex: 99,
        callout: {
            content: "我是王思聪",
            color: "#628D41",
            borderRadius: 30,
            display: "ALWAYS",
            bgColor: "#FFC7B9",
            textAlign: "center"
        }
    },
    {
        id: 6,
        iconPath: "/static/img/video.png",
        longitude: "121.6456031799",
        latitude: "38.9031904014",
        width: 30,
        height: 30,
        zIndex: 99,
        callout: {
            content: "6666666666",
            color: "#628D41",
            borderRadius: 30,
            display: "ALWAYS",
            bgColor: "#FFC7B9",
            textAlign: "center"
        }
    },
    {
        id: 7,
        iconPath: "/static/img/game.png",
        longitude: "121.6301536560",
        latitude: "38.9092016198",
        width: 30,
        height: 30,
        zIndex: 99,
        callout: {
            content: "敌军还有三十秒到达战场",
            color: "#628D41",
            borderRadius: 30,
            display: "ALWAYS",
            bgColor: "#FFC7B9",
            textAlign: "center"
        }
    },
    {
        id: 8,
        iconPath: "/static/img/joke.png",
        longitude: "121.6154766083",
        latitude: "38.9096691377",
        width: 30,
        height: 30,
        zIndex: 99,
        callout: {
            content: "小姐姐MMM",
            color: "#628D41",
            borderRadius: 30,
            display: "ALWAYS",
            bgColor: "#FFC7B9",
            textAlign: "center"
        }
    },
    {
        id: 9,
        iconPath: "/static/img/more.png",
        longitude: "121.6276645660",
        latitude: "38.9179908627",
        width: 30,
        height: 30,
        zIndex: 99,
        callout: {
            content: "我打到已饥渴难耐",
            color: "#628D41",
            borderRadius: 30,
            display: "ALWAYS",
            bgColor: "#FFC7B9",
            textAlign: "center"
        }
    },
    {
        id: 10,
        iconPath: "/static/img/more.png",
        longitude: "121.6116408135",
        latitude: "38.9179908627",
        width: 30,
        height: 30,
        zIndex: 99,
        callout: {
            content: "喜欢我就点一下",
            color: "#628D41",
            borderRadius: 30,
            display: "ALWAYS",
            bgColor: "#FFC7B9",
            textAlign: "center"
        }
    }
]
export const searchService = {
    findUsersbyCurrentLocation(longitude, latitude) {
        return new Promise((resolve, reject) => {
            resolve(paoyLocations)
        })
    }
}
