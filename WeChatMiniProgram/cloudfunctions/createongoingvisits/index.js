// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
    return await db.collection('ongoingVisits').add({
        data:{
            visitTime: event.visitTime,
            name: event.name,
            id: event.id,
            phone: event.phone,
            visitDorm: event.visitDorm,
            visitRoom: event.visitRoom,
            leaveTime: event.leaveTime,
            reason: event.reason,           
            createTime: event.createTime
            
        }
    })
}