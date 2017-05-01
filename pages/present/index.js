// pages/present/index.js
Page({
  data:{
    nickname: '',
    toUserId: '',
    fromUserId: '',
    groupId: ''
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    console.log('用户id', options.toUserId);
    this.setData({
      fromUserId: options.fromUserId,
      toUserId: options.toUserId,
      groupId: options.groupId,
      nickname: options.nickname
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
  onSubmit: function (e) {
    console.log(e.detail);
    const val = e.detail.value;
    const data = this.data;
    let beanCount = val.count.replace(/\s/g, '');
    let reason = val.reason.trim();
    if (/\D+/.test(beanCount)) {
      wx.showToast({
        title: '赠送数必须为正整数',
        duration: 2000
      });
    } else if (!reason) {
      wx.showToast({
        title: '赠送理由不能为空',
        duration: 2000
      });
    } else {
        beanCount = parseInt(beanCount, 10);
        wx.request({
          url: 'https://www.javenleung.com/statistic/create',
          data: {
            groupId: data.groupId,
            fromUserId: data.fromUserId,
            toUserId: data.toUserId,
            beanCount: beanCount,
            reason: reason
          },
          method: 'POST',
          success: function(res){
            wx.switchTab({
              url: '../statistic/index',
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
          fail: function() {
            // fail
          },
          complete: function() {
            // complete
          }
      });
    }
  }
})