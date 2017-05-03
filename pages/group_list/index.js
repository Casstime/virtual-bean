// pages/group_list/index.js
const config = require('../../config');

const pageConfig = {
  data: {
    groups: null,
    windowHeight: 0
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    const self = this;
    wx.getSystemInfo({
      success: function (res) {
        self.setData({windowHeight: res.windowHeight});
      }
    });
    const openid = wx.getStorageSync('openid');
    wx.request({
      url: `${config.origin}/group/list?openid=${openid}`,
      method: 'GET',
      success: function (res) {
        console.log('获取群列表成功', res);
        const groups = res.data;
        const mapGroups = groups.map(function (group) {
          return {id: group._id, name: group.name};
        });
        self.setData({groups: mapGroups});
      },
      fail: function (res) {
        // fail
        console.log('fail', res);
      },
      complete: function () {
        // complete
      }
    });
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
  toGroup: function (e) {
    const data = e.currentTarget.dataset;
    wx.navigateTo({
      url: '../group/index?id=' + data.id,
      success: function (res) {
        // success
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  }
};

Page(pageConfig);
