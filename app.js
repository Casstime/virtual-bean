const config = require('./config');

const appConfig = {
  onLaunch: function () {
    //调用API从本地缓存中获取数据
  },
  getUserInfo: function (cb) {
    const that = this;
    if (this.globalData.userInfo) {
      typeof cb === "function" && cb(this.globalData.userInfo);
    } else {
      //调用登录接口
      wx.login({
        success: function (response) {
          console.log('返回的code', response.code);
          if (response.code) {
            wx.getUserInfo({
              withCredentials: true,
              success: function (res) {
                console.log('向微信请求用户信息返回', res);
                that.globalData.userInfo = Object.assign({}, res.userInfo);
                console.log('global', that.globalData.userInfo);

                wx.request({
                  url: `${config.origin}/login`,
                  data: {
                    code: response.code,
                    encryptedData: res.encryptedData,
                    iv: res.iv,
                    rawData: res.rawData,
                    signature: res.signature
                  },
                  method: 'POST',
                  success: function (result) {
                    console.log('登录成功返回', result.data);
                    that.globalData.userInfo = Object.assign({}, that.globalData.userInfo,  {userId: result.data.userId, openid: result.data.openid});
                    typeof cb === "function" && cb(that.globalData.userInfo);
                    wx.setStorage({
                      key: "openid",
                      data: result.data.openid,
                      success: function () {

                      }
                    });
                  },
                  fail: function() {
                    // fail
                  },
                  complete: function() {
                    // complete
                  }
                });
              }
            });
          }
        }
      });
    }
  },
  globalData: {
    userInfo: null
  }
};

App(appConfig);
