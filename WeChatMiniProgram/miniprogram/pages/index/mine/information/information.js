// pages/index/mine/information/information.js
import Dialog from '../../../../miniprogram_npm/@vant/weapp/dialog/dialog';
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        showDorm: false,
        showGender: false,
        dormCol:['palm','orchid','bamboo','chrysanthemum'],
        genderCol:['male','female','choose not to decide'],
        linkstatus1: true,
        linkstatus2: true,
        dorm:"",
        disabledValue: false,
        name:"",
        id: null,
        gender: "",
        phone: null,
        requiredStatus: true,
        readonlyStatus: false,
        chooseDormTitleValue: "Choose Living Dormitory",
        room:"",
    },
    popupDorm: function(){
        this.setData({
            showDorm:true
        })
    },
    popupGender: function(){
        this.setData({
            showGender:true
        })
    },
    onConfirmDorm: function(e){
        this.setData({
            showDorm: false,
            dorm: e.detail.value,
            linkstatus1: false,
            chooseDormTitleValue: "Living Dormitory"
        })
    },
    onCancelDorm: function(e){
      this.setData({
          showDorm: false
      })  
    },
    onConfirmGender: function(e){
        this.setData({
            showGender: false,
            gender: e.detail.value,
            linkstatus2: false
        })
    },
    onCancelGender: function(e){
      this.setData({
          showGender: false
      })  
    },
    submit: function(){
        var dorm = this.data.dorm
        var name = this.data.name
        var id = this.data.id
        var gender = this.data.gender
        var room = this.data.room
        var phone = this.data.phone
        if (dorm =="" || name == "" || id == "" || gender == "" || room == "" || phone == "" ){
            Dialog.alert({
                message: 'Please fill the Required data',
                theme: 'round-button',
                confirmButtonText:'OK'
              })
        }else{
            wx.cloud.callFunction({
                name:"uploadpersonalinfo",
                data:{
                    name: this.data.name,
                    id: this.data.id,
                    gender: this.data.gender,
                    phone: this.data.phone,
                    dorm: this.data.dorm,
                    room: this.data.room,
                    _openid: app.globalData.openid
                },
                complete: res =>{
                    console.log(res)
                    Dialog.alert({
                        message: 'Submitted successfully',
                        theme: 'round-button',
                        confirmButtonText:'OK'
                      })
                        .then(() => {
                          wx.switchTab({
                            url: '../../mine/mine',
                          })
                        })
                }
            })
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        wx.cloud.callFunction({
            name:"getuserinfo",
            data:{
                _openid: app.globalData.openid
            },  
            complete: res =>{
                console.log(res)
                this.setData({
                    readonlyStatus: true,
                    disabledValue: true,
                    requiredStatus: false,
                    room: res.result.data[0].room,
                    name: res.result.data[0].name,
                    id: res.result.data[0].id,
                    phone: res.result.data[0].phone,
                    gender: res.result.data[0].gender,
                    dorm: res.result.data[0].dorm,
                    chooseDormTitleValue: "Living Room"
                    
                })
            }
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})