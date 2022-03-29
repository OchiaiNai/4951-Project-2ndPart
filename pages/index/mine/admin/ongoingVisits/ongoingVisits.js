// pages/index/mine/admin/ongoingVisits/ongoingVisits.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        arr:[],
        num: null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.setData({
            arr: app.globalData.arr,
            num: app.globalData.num
        })
    },
    onShow(){
       
    },
    onReady(){
    }
})