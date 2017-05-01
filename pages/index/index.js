// pages/index/index.js
Page({
  data:{
    userInfo: {},
    groupId: '',
    members: [],
    plain: false,
    windowHeight: 0
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
    var app = getApp();
    var self = this;
    var globalData = app.globalData;
    wx.getSystemInfo({
      success: function (res) {
        self.setData({windowHeight: res.windowHeight});
      }
    });
    app.getUserInfo(function (userInfo) {
      var openid = wx.getStorageSync('openid');
      wx.request({
        url: `https://www.javenleung.com/group/list?openid=${openid}`,
        method: 'GET',
        success: function(res){
          console.log('用户群组', res.data);
          var groups = res.data;
          app.globalData = Object.assign({}, globalData, {groups: groups});
          var groupId = groups[0]._id;
          wx.request({
            url: `https://www.javenleung.com/group/${groupId}`,
            method: 'GET', 
            success: function(response){
              console.log('第一个群的信息', response);
              var members = response.data.members;
              self.setData({userInfo: userInfo, groupId: groupId, members: members});
            },
            fail: function() {
              // fail
            },
            complete: function() {
              // complete
            }
          })
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
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  scroll: function () {

  },
  onSendBean: function (e) {
    var data = e.currentTarget.dataset;
    var toUserId = data.id;
    var fromUserId = this.data.userInfo.userId;
    var nickname = data.nickname;
    var groupId = this.data.groupId;
    console.log('to send bean, userId groupId', toUserId, groupId);
    wx.navigateTo({
      url: `../present/index?groupId=${groupId}&fromUserId=${fromUserId}&toUserId=${toUserId}&nickname=${nickname}`
    });
  }
})