// pages/present/index.js
Page({
  data:{
    id: null,
    nickname: ''
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    console.log('iptions', options.id);
    this.setData({
      id: options.id,
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
  }
})