// pages/index/index.js
Page({
  data:{
    members: [
      {id: '1', nickname: 'a'},
      {id: '2', nickname: 'b'},
      {id: '3', nickname: 'c'},
      {id: '4', nickname: 'c'},
      {id: '5', nickname: 'c'},
      {id: '6', nickname: 'c'},
      {id: '7', nickname: 'c'},
      {id: '8', nickname: 'c'},
      {id: '9', nickname: 'c'},
      {id: '10', nickname: 'c'},
      {id: '11', nickname: 'd'},
      {id: '12', nickname: 'e'},
      {id: '13', nickname: 'f'}
    ],
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
    wx.request({
      url: 'https://www.javenleung.com/',
      data: {},
      method: 'GET',
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