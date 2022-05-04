Page({
    data: {
      step: 1,
      type: 0,
      title: '',
      hint: '',
      color: '',
      message: '',
      contact: '',
      submitText: 'Submit'
    },
  
    handleType1() {
      this.setData({
        step: 2,
        type: 1,
        title: 'Feedback',
        hint: 'Please enter your feedback or questions',
        color: '#42da56',
        message: '',
        contact: '',
        submitText: 'Submit'
      })
    },
  
    handleType2() {
      this.setData({
        step: 2,
        type: 2,
        title: 'Program Debug',
        hint: 'Please provide us the error you meet',
        color: '#3268cf',
        message: '',
        contact: '',
        submitText: 'Submit'
      })
    },
  
    handleMessageChange(e) {
      this.setData({
        message: e.detail.value
      })
    },
  
    handleContactChange(e) {
      this.setData({
        contact: e.detail.value
      })
    },
  
    // 提交前先校验数据
    handleSubmit() {
      if (this.data.message.replace(/\s+/g, '') == '') {
        wx.showToast({
          title: 'Please enter your feedback',
          icon: 'loading',
          duration: 1500
        })
        return;
      }
      if (this.data.message.length > 100) {
        wx.showToast({
          title: 'Contents too long',
          icon: 'loading',
          duration: 1500
        })
        return;
      }
      if (this.data.contact.length > 50) {
        wx.showToast({
          title: 'Contact too long',
          icon: 'loading',
          duration: 1500
        })
        return;
      }
      this.setData({
        submitText: 'Processing..'
      })
      wx.request({
        url: 'http://www.xxx.cn/InsertFeedback.ashx',
        data: {
          'Type': this.data.type,
          'Message': this.data.message,
          'Contacts': this.data.contact
        },
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: this.submitSuccess.bind(this),
        fail: this.submitFail.bind(this)
      })
    },
  
    submitSuccess(res){
      var r = res.data;
      if(r == "ok") {
        this.setData({
          step: 3
        })
      }
      else {
        wx.showToast({
          title: 'Submission Fail',
          icon: 'loading',
          duration: 1800
        })
      }
    },
  
    submitFail() {
      wx.showToast({
        title: 'Submission Fail',
        icon: 'loading',
        duration: 1800
      })
    },
  
    handleBack(){
      this.setData({
        step: 1
      })
    }
  })
  