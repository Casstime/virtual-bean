// pages/group/index.js
Page({
  data:{
    groupId: '',
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
    this.setData({groupId: groupId});
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
    const self = this;
    const groupId = this.data.groupId;
    const members = this.data.members;
    wx.showModal({
      content: '是否重置所有成员剩余的豆子？',
      success: function() {
        wx.request({
          url: 'https://www.javenleung.com/group/reset/remain_beans',
          data: {
            groupId: groupId 
          },
          method: 'POST',
          success: function(res){
            console.log('重置剩余豆子数成功', res);
            const resets = members.map((member) => {
              member.remainBeans = 50;
              return member;
            });
            self.setData({members: resets});
          },
          fail: function() {
            // fail
          },
          complete: function() {
            // complete
          }
        });
      }
    });
  },
  onResetGainBean: function() {
    const self = this;
    const groupId = this.data.groupId;
    const members = this.data.members;
    wx.showModal({
      content: '是否重置所有成员已获得的豆子？',
      success: function() {
        wx.request({
          url: 'https://www.javenleung.com/group/reset/gain_beans',
          data: {
            groupId: groupId 
          },
          method: 'POST',
          success: function(res){
            console.log('重置获得豆子数成功', res);
            const resets = members.map((member) => {
              member.gainBeans = 0;
              return member;
            });
            self.setData({members: resets});
          },
          fail: function() {
            // fail
          },
          complete: function() {
            // complete
          }
        });
      }
    });
  }
})