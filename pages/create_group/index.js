// pages/create_group/index.js
const config = require('../../config');

const pageConfig = {
  data: {
    userInfo: null
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    const app = getApp();
    const userInfo = app.globalData.userInfo;
    this.setData({userInfo: userInfo});
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  onFormSubmit: function (e) {
    console.log('创建群主', e.detail.value);
    const data = e.detail.value;
    const userInfo = this.data.userInfo;
    wx.request({
      url: `${config.origin}/group/create_group`,
      data: {
        openid: wx.getStorageSync('openid'),
        nickname: userInfo.nickName,
        groupName: data.groupName,
        groupPwd: data.groupPwd
      },
      method: 'POST',
      success: function (res) {
        console.log('创建群成功', res.data);
        wx.switchTab({
          url: '../my/index',
          success: function (res) {
            console.log('创建群后成功跳转至我的页面');
          },
          fail: function () {
            // fail
          },
          complete: function () {
            // complete
          }
        })
      },
      fail: function (res) {
        // fail
        console.log('fail', res);
      },
      complete: function () {
        // complete
      }
    });
  }
};

Page(pageConfig);
