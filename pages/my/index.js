// pages/my/index.js
Page({
  data:{
    userInfo: {}
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var app = getApp();
    var userInfo = app.globalData.userInfo;
    this.setData({userInfo: userInfo});
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
  toMyGroups: function () {
    wx.navigateTo({
      url: '../group_list/index',
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
    });
  }
})