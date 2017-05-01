// pages/join_group/index.js
Page({
  data:{
    groupId: ''
  },
  onLoad:function(options){
    console.log('options群id', options);
    this.setData({groupId: options.groupId});
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
  getUserInfo() {
    const app = getApp();
    return app.globalData.userInfo;
  },
  onJoinGroup: function(e) {
    const data = e.detail.value;
    const userInfo = this.getUserInfo();
    const openid = userInfo.openid || wx.getStorageSync('openid');
    const nickname = userInfo.nickName;
    const groupId = this.data.groupId;
    wx.request({
      url: 'https://www.javenleung.com/group/join_group',
      data: {
        groupId: groupId,
        openid: openid,
        nickname: nickname,
        password: data.password
      },
      method: 'POST',
      success: function(res){
        if (res.statusCode === 200) {
          console.log('加群成功', res);
          wx.showToast({
            title: '加群成功',
            duration: 2000,
            success: function () {
              wx.navigateTo({
                url: '../group_list/index',
                success: function(res){
                  // success
                },
                fail: function() {

                },
                complete: function() {
                  // complete
                }
              });
            }
          });
        } else {
          wx.showToast({
            title: '密码错误',
            duration: 2000
          });
        }
      },
      fail: function() {
         wx.showToast({
            title: '加群失败',
            duration: 2000
         });
      },
      complete: function() {
        // complete
      }
    })
  }
});
