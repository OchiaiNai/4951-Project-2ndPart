// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
    try{
        return await db.collection('users')
    .where({
        _openid:event._openid
    })
    .field({
        rank: true
    })
    .get()
    .then()    
    }catch(e){
        console.error(e)
    }
}