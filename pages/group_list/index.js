// pages/group_list/index.js
Page({
  data:{
    groups: [
      {id: 1, name: '开思红包群'},
      {id: 2, name: '开思电商群'},
      {id: 3, name: '开思豆子群'}
    ],
    windowHeight: 0
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
     var self = this;
     wx.getSystemInfo({
      success: function (res) {
        self.setData({windowHeight: res.windowHeight});
      }
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
  toGroup: function (e) {
    var data = e.currentTarget.dataset;
    wx.navigateTo({
      url: '../group/index?id=' + data.id,
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
})