// pages/index/index.js
const config = require('../../config');

const pageConfig = {
  data:{
    userInfo: {},
    groupId: 'id',
    members: [],
    windowHeight: 0
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    
  },
  onReady:function(){
    // 页面渲染完成
    wx.showLoading({
      title: '加载中...'
    });

    const app = getApp();
    const self = this;
    const globalData = app.globalData;
    wx.getSystemInfo({
      success: function (res) {
        self.setData({windowHeight: res.windowHeight});
      }
    });
    app.getUserInfo(function (userInfo) {
      self.setData({userInfo});
      const openid = userInfo.openid || wx.getStorageSync('openid');
      wx.request({
        url: `${config.origin}/group/list?openid=${openid}`,
        method: 'GET',
        success: function(res){
          console.log('用户群组', res.data);
          const groups = res.data;
          app.globalData = Object.assign({}, globalData, {groups: groups});
          const groupId = groups[0] ? groups[0]._id : '';
          self.setData({groupId});
          if (groupId) {
            wx.request({
              url: `${config.origin}/group/${groupId}`,
              method: 'GET',
              success: function(response){
                const members = response.data.members;
                console.log('群组成员', members);
                self.setData({members});
                wx.hideLoading();
              },
              fail: function() {
                // fail
              },
              complete: function() {
                // complete
              }
            });
          }   
        },
        fail: function() {
          // fail
        },
        complete: function() {
          // complete
        }
      });
    });
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  onPullDownRefresh: function () {
    const self = this;
    const start = Date.now();
    const openid = this.data.userInfo.openid || wx.getStorageSync('openid');
    const dataGroupId = this.data.groupId;
    if (dataGroupId && dataGroupId !== 'id') {
      wx.request({
        url: `${config.origin}/group/list?openid=${openid}`,
        method: 'GET',
        success: function(res){
          const groups = res.data;
          const groupId = groups[0] ? groups[0]._id : '';
          self.setData({groupId});
          if (groupId) {
            wx.request({
              url: `${config.origin}/group/${groupId}`,
              method: 'GET',
              success: function(response){
                const members = response.data.members;
                const end = Date.now();
                if (end - start > 1000) {
                  self.setData({members});
                  wx.stopPullDownRefresh();
                } else {
                  setTimeout(() => {
                    self.setData({members});
                    wx.stopPullDownRefresh();
                  }, 1000 - (end - start));
                }
              },
              fail: function() {
                // fail
              },
              complete: function() {
                // complete
              }
            });
          }   
        },
        fail: function() {
          // fail
        },
        complete: function() {
          // complete
        }
      });
    } else {
      wx.request({
        url: `${config.origin}/group/${dataGroupId}`,
        method: 'GET',
        success: function(response){
          const members = response.data.members;
          const end = Date.now();
          if (end - start > 1000) {
            self.setData({members});
            wx.stopPullDownRefresh();
          } else {
            setTimeout(() => {
              self.setData({members});
              wx.stopPullDownRefresh();
            }, 1000 - (end - start));
          }
        },
        fail: function() {
          // fail
        },
        complete: function() {
          // complete
        }
      });
    }
    
  },
  onSendBean: function (e) {
    const data = e.currentTarget.dataset;
    const toUserId = data.id;
    const fromUserId = this.data.userInfo.userId;
    const nickname = data.nickname;
    const groupId = this.data.groupId;
    console.log('to send bean, userId groupId', toUserId, groupId);
    wx.navigateTo({
      url: `../present/index?groupId=${groupId}&fromUserId=${fromUserId}&toUserId=${toUserId}&nickname=${nickname}`
    });
  },
  toCreateGroup: function () {
    wx.navigateTo({
      url: '../create_group/index',
      success: function(res){
        // success
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    });
  },
  toSearchGroup: function () {
    wx.navigateTo({
      url: '../search_group/index',
      success: function(res){
        // success
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  }
};

Page(pageConfig);
