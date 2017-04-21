App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    this.getUserInfo();
  },
  getUserInfo: function (cb) {
    var that = this;
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo);
    } else {
      //调用登录接口
      wx.login({
        withCredentials: true,
        success: function (response) {
          console.log('返回的code', response.code);
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo;
              console.log(that.globalData.userInfo);
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      });
    }
  },
  globalData: {
    userInfo: null
  }
})