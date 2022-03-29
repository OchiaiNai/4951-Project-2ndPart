// pages/index/mine/mine.js
const app = getApp();
import Toast from '../../../miniprogram_npm/@vant/weapp/toast/toast';
var time = require("../../../utils/util.js");

Page({

    /**
     * 页面的初始数据
     */
    data: {
        canIUseUserProfile: false,
        hasUserInfo: false,
        userInfo:{},
        admin: false, //test
        QRString:'',
        currentDate: new Date().getTime(),
        array: [],
        num: null
    },
    scan: function(){
        var that = this;
        wx.scanCode({
          onlyFromCamera: true,
          success(res){
            var splitted = res.result.split(",");
            console.log(res.result.split(","))
            wx.cloud.callFunction({
                name:"createongoingvisits",
                data:{
                    visitTime: splitted[0],
                    name: splitted[1],
                    id: splitted[2],
                    phone: splitted[3],
                    visitDorm: splitted[4],
                    visitRoom: splitted[5],
                    reason: splitted[6],
                    leaveTime: splitted[7],
                    createTime: time.formatTimeTwo(that.data.currentDate,'Y/M/D h:m:s')
                },
                complete: res =>{
                    wx.cloud.callFunction({
                        name:'scanstatus',
                        complete: res=>{
                            Toast('Successfully Scanned QR Code')
                        }
                    })                
                }
            })           
          }
        })
    },
    navigateToVisitingPage: function(){
        var arr = []
        wx.cloud.callFunction({
            name:'getongoingvisits',
            complete: res=>{
                console.log(res)
                var len = res.result.data.length;
                for (var i = 0; i<len; i++){
                    arr.push(res.result.data[i])
                }
                app.globalData.arr = arr;
                app.globalData.num = len;
                wx.navigateTo({
                  url: '../mine/admin/ongoingVisits/ongoingVisits',
                })
            }
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        if(wx.getUserProfile){
            this.setData({
                canIUseUserProfile: true,
                hasUserInfo: true,
                userInfo: app.globalData.userInfo
            })
        }
        var openid = app.globalData.openid;
        wx.cloud.callFunction({
            name:"checkadmin",
            data:{
                _openid: openid
            },
            complete: res=>{
                console.log(res)
                if(res.result.data[0].rank == "admin"){
                    this.setData({
                        admin: true
                    })
                }
            }
        })  //end of cloud
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})