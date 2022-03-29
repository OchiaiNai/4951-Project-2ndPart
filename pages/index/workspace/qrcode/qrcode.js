// pages/index/workspace/qrcode/qrcode.js
const QRCode = require('../../../../utils/weapp-qrcode.js');
const app = getApp();
import rpx2px from '../../../../utils/rpx2px.js';
const qrcodeWidth = rpx2px(600);
let qrcode;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        openid:"",
        name:'',
        id:null,
        phone:null,
        visitDorm:"",
        visitRoom:"",
        reason:"",
        visitTime:"",
        leaveTime:"",
        qrcodeWidth: qrcodeWidth,
        text:""

    },
    connect: function(){
        var connected = this.data.visitTime + "," + this.data.name + "," + String(this.data.id) + "," + String(this.data.phone) + "," + this.data.visitDorm + "," + this.data.visitRoom + "," + this.data.reason + "," + this.data.leaveTime;
        this.setData({
            text: connected
        })
    },
    

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.setData({
            openid: app.globalData.openid
        })
        wx.cloud.callFunction({
            name:"getvisitqrcodeinfo",
            data:{
                _openid: this.data.openid
            },  
            complete: res =>{
                if(res.result.data[0].scanned == false){
                this.setData({
                    name: res.result.data[0].name,
                    id: res.result.data[0].id,
                    phone: res.result.data[0].phone,
                    visitDorm: res.result.data[0].visitDorm,
                    visitRoom: res.result.data[0].visitRoom,
                    reason: res.result.data[0].reason,
                    visitTime: res.result.data[0].visitTime,
                    leaveTime: res.result.data[0].leaveTime
                }),
                this.connect(),
                qrcode = new QRCode('canvas', {
                    text: this.data.text,
                    width: this.data.qrcodeWidth,
                    height: this.data.qrcodeWidth,
                    colorDark: "#45E73F",
                    colorLight: "white",
                    correctLevel: QRCode.CorrectLevel.H,
                })         
                }else{
                    qrcode = new QRCode('canvas', {
                        text: null,
                        width: this.data.qrcodeWidth,
                        height: this.data.qrcodeWidth,
                        colorDark: "#EA1F47",
                        colorLight: "white",
                        correctLevel: QRCode.CorrectLevel.H,
                    })
                }
            }
        })
    },
})