// pages/group/index.js
Page({
  data:{
    members: [
      {id: '1', nickname: 'a', gainCount: 10, remainCount: 20},
      {id: '2', nickname: 'b', gainCount: 10, remainCount: 20},
      {id: '3', nickname: 'c', gainCount: 10, remainCount: 20},
      {id: '4', nickname: 'c', gainCount: 10, remainCount: 20},
      {id: '5', nickname: 'c', gainCount: 10, remainCount: 20},
      {id: '6', nickname: 'c', gainCount: 10, remainCount: 20},
      {id: '7', nickname: 'c', gainCount: 10, remainCount: 20},
      {id: '8', nickname: 'c', gainCount: 10, remainCount: 20},
      {id: '9', nickname: 'c', gainCount: 10, remainCount: 20},
      {id: '10', nickname: 'c', gainCount: 10, remainCount: 20},
      {id: '11', nickname: 'd', gainCount: 10, remainCount: 20},
      {id: '12', nickname: 'e', gainCount: 10, remainCount: 20},
      {id: '13', nickname: 'f', gainCount: 10, remainCount: 20}
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

    var groupId = options.id; 
    var app = getApp();
    var userInfo = app.globalData.userInfo;
    var userInGroupInfo = userInfo['groups'] ? userInfo['groups'][groupId] : {};
    var isMaster = userInGroupInfo.role === 'MASTER';

    this.setData({groupId: groupId, userInfo: userInfo, isMaster: isMaster});
    console.log(app.globalData.userInfo);
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