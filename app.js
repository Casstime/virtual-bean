
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
  },
  getUserInfo: function (cb) {
    var that = this;
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo);
    } else {
      //调用登录接口
      wx.login({
        success: function (response) {
          console.log('返回的code', response.code);
          if (response.code) {
            wx.request({
              url: 'https://www.javenleung.com/login',
              data: {
                js_code: response.code
              },
              method: 'POST',
              success: function (result) {
                console.log('登录成功返回', result.data);
                wx.setStorage({
                  key: "openid",
                  data: result.data.openid,
                  success: function () {
                    wx.getUserInfo({
                      withCredentials: true,
                      success: function (res) {
                        console.log('向微信请求用户信息返回', res);
                        that.globalData.userInfo = Object.assign({}, {userId: result.data.userId, openid: result.data.openid}, res.userInfo);
                        console.log('global', that.globalData.userInfo);
                        typeof cb == "function" && cb(that.globalData.userInfo)
                      }
                    });
                  }
                });
              },
              fail: function() {
                // fail
              },
              complete: function() {
                // complete
              }
            })
          }
         
        }
      });
    }
  },
  globalData: {
    userInfo: null
  }
})