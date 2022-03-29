// pages/index/workspace/form/form.js
var time = require("../../../../utils/util.js");
var app = getApp();
import Dialog from '../../../../miniprogram_npm/@vant/weapp/dialog/dialog';
Page({

    data: {
        showDorm: false,
        dormCol:['palm','orchid','bamboo','chrysanthemum'],
        visitDorm:"", //ouput
        chooseDormTitleValue:"Choose Dormitory",
        linkstatus1:"true",
        showVisitTime: false,
        currentDate: new Date().getTime(),
        minDate: new Date().getTime(),
        maxDate: new Date(2023, 1, 1).getTime(),
        chooseVisitTimeTitleValue: "Visiting Time",
        linkstatus2:"true",
        visitTime:"", // output
        showLeaveTime:false,
        linkstatus3:"true",
        chooseLeaveTimeTitleValue: "Leaving Time",
        leaveTime:"", // output
        userdata:{
            name: null,
            id: null,
            dorm: null,
            gender: null,
            phone: null
        }, // input from database and output
        visitRoom:"", // output
        reason:"" //output

    },

    popupDorm: function(){
        this.setData({
            showDorm:true
        })
    },
    popupVisit: function(){
        this.setData({
            showVisitTime:true
        })
    },
    popupLeave: function(){
        this.setData({
            showLeaveTime:true
        })
    },
    onConfirmDorm: function(e){
        this.setData({
            showDorm: false,
            visitDorm: e.detail.value,
            linkstatus1: false,
            chooseDormTitleValue: "Dormitory: "
        })
    },
    onConfirmVisit: function(e){
        console.log(time.formatTimeTwo(e.detail,'Y/M/D h:m:s'))
        this.setData({
            visitTime: time.formatTimeTwo(e.detail,'Y/M/D h:m:s'),
            showVisitTime: false,
            linkstatus2: false
        })
    },
    onConfirmLeave: function(e){
        this.setData({
            leaveTime: time.formatTimeTwo(e.detail,'Y/M/D h:m:s'),
            showLeaveTime: false,
            linkstatus3: false
        })
    },
    onCancelDorm: function(e){
        this.setData({
            showDorm: false
        })  
    },
    onCancelVisit: function(e){
        this.setData({
            showVisitTime: false
        })  
    },
    onCancelLeave: function(e){
        this.setData({
            showLeaveTime: false
        })  
      },
    submit: function(e){
        var visitDorm = this.data.visitDorm
        var visitTime = this.data.visitTime
        var leaveTime = this.data.leaveTime
        var reason = this.data.reason
        var visitRoom = this.data.visitRoom
        if (visitDorm =="" || visitRoom == "" || leaveTime == "" || visitTime == "" || reason == "" ){
            Dialog.alert({
                message: 'Please fill the Required data',
                theme: 'round-button',
                confirmButtonText:'OK'
              })
        }else{
        wx.cloud.callFunction({
            name:'submitvisitinformation',
            data:{
                _openid: app.globalData.openid,
                leaveTime: leaveTime,
                visitTime: visitTime,
                name: this.data.userdata.name,
                id: this.data.userdata.id,
                dorm: this.data.userdata.dorm,
                gender: this.data.userdata.gender,
                reason: reason,
                visitDorm: visitDorm,
                visitRoom: visitRoom,
                createTime: time.formatTimeTwo(this.data.currentDate,'Y/M/D h:m:s'),
                phone: this.data.userdata.phone,
                scanned: false
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
                        url: '../../workspace/workspace',
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
        var openid = app.globalData.openid;
        wx.cloud.callFunction({
            name:"autofill",
            data:{
                _openid: openid
            },
            complete: res =>{
                console.log(res)
                this.setData({
                    'userdata.name': res.result.data[0].name,
                    'userdata.id': Number(res.result.data[0].id),
                    'userdata.dorm': res.result.data[0].dorm,
                    'userdata.phone': Number(res.result.data[0].phone),
                    'userdata.gender': res.result.data[0].gender
                })
            }
        })
    }
})