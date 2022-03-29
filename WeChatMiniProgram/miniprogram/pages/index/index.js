var app = getApp();
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
  },
 
// 获取输入账号
  phoneInput :function (e) {
    this.setData({
      phone:e.detail.value
    })
  },
 
// 获取输入密码
  passwordInput :function (e) {
    this.setData({
      password:e.detail.value
    })
  },
 
// 登录

    getUserProfile(e) {
        // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
         // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
        desc: 'get information', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: (res) => {
        app.globalData.userInfo = res.userInfo
        console.log(app.globalData.userInfo)    
        wx.cloud.callFunction({
            name:"openid",
            complete: res=>{
            app.globalData.openid = res.result.openid
            wx.switchTab({
                url: '../index/workspace/workspace',
            })
            }
        })

    }
  })
  
    }, 
/*getUserProfile: function(){
    wx.switchTab({
      url: '../index/workspace/workspace',
    })
} */
})
