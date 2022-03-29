// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
    return await db.collection('visitInformation').add({
        data:{
            _openid: event._openid,
            leaveTime: event.leaveTime,
            visitTime: event.visitTime,
            name: event.name,
            id: event.id,
            dorm: event.dorm,
            gender: event.gender,
            reason: event.reason,
            visitDorm: event.visitDorm,
            visitRoom: event.visitRoom,
            createTime: event.createTime,
            phone: event.phone,
            scanned: event.scanned
        }
    })
}