// pages/index/workspace/workspace.js
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        openid:'4444'
    },
    form: function(){
        wx.navigateTo({
          url: '../workspace/form/form',
        })
    },
    qrcode: function(){
        wx.navigateTo({
          url: '../workspace/qrcode/qrcode',
        })
    },
    history: function(){
        wx.navigateTo({
          url: '../workspace/history/history',
        })
    },
    feedback: function(){
        wx.navigateTo({
          url: '../workspace/feedback/feedback',
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log('workspace page:' + app.globalData.openid)
        this.setData({
            openid: app.globalData.openid
        })
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