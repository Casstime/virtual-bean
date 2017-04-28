// pages/group/index.js
Page({
  data:{
    members: [],
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

    var groupId = options.id; 
    wx.request({
      url: `https://www.javenleung.com/group/${groupId}`,
      method: 'GET',
      success: function(res){
        console.log('获取群组信息', res);
        self.setData({members: res.data.members});
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
  onResetRemainBean: function () {
    wx.showModal({
      content: '是否重置所有成员剩余的豆子？',
      success: function() {
        // todo:接口请求，重置
      }
    });
  },
  onResetGainBean: function() {
    wx.showModal({
      content: '是否重置所有成员已获得的豆子？',
      success: function() {
        // todo:接口请求，重置
      }
    });
  }
})