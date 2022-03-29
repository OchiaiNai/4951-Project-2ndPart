// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
    try{
        return await db.collection('visitInformation')
    .where({
        _openid:event._openid
    })
    .orderBy('createTime', 'desc')
    .limit(1)
    .get()    
    .then()
    }catch(e){
        console.error(e)
    }
}