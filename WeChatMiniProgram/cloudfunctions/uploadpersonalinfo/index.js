// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
    return await db.collection('users').add({
        data:{
            name: event.name,
            id: event.id,
            gender: event.gender,
            phone: event.phone,
            dorm: event.dorm,
            room: event.room,
            rank: "user",
            _openid: event._openid
        }
    })
}