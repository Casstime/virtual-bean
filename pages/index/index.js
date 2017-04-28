// pages/index/index.js
var app = getApp();
Page({
  data:{
    members: [],
    plain: false,
    windowHeight: 0
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var app = getApp();
    console.log('globalData', app.globalData);
    var self = this;
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
          wx.request({
            url: `https://www.javenleung.com/group/${groups[0]._id}`,
            method: 'GET', 
            success: function(response){
              console.log('第一个群的信息', response);
              var members = response.data.members;
              self.setData({members});
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
  onReady:function(){
    // 页面渲染完成
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
  scroll: function () {

  },
  onSendBean: function (e) {
    var data = e.currentTarget.dataset;
    var id = data.id;
    var nickname = data.nickname;
    console.log('send bean', id);
    wx.navigateTo({
      url: '../present/index?id=' + id + '&nickname=' + nickname
    });
  }
})