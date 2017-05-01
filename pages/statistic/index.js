// pages/logs/index.js
Page({
  data:{
    pager: 1,
    records: [],
    windowHeight: 0,
    hasRefresh: false,
    hidden: false,
    hasMore: false
  },
  onLoad:function(options){
    const self = this;
     wx.getSystemInfo({
      success: function (res) {
        self.setData({windowHeight: res.windowHeight});
      }
    });
    const app = getApp();
    let groups = app.globalData.groups;
    if (!groups.length) {
      const openid = wx.getStorageSync('openid');
      wx.request({
        url: `https://www.javenleung.com/group/list?openid=${openid}`,
        method: 'GET',
        success: function(res){
          groups = res.data;
          wx.request({
            url: `https://www.javenleung.com/statistic?groupId=${groups[0]._id}&pager=1&count=10`,
            method: 'GET',
            success: function(res){
              console.log('拉取送豆记录', res);
              self.setData({pager: 1, records: res.data, hidden: true});
            },
            fail: function() {
              // fail
            },
            complete: function() {
              // complete
            }
          });
        },
        fail: function() {
          // fail
        },
        complete: function() {
          // complete
        }
      });
    } else {
      wx.request({
        url: `https://www.javenleung.com/statistic?groupId=${groups[0]._id}&pager=1&count=10`,
        method: 'GET',
        success: function(res){
          console.log('拉取送豆记录', res);
          self.setData({pager: 1, records: res.data, hidden: true});
        },
        fail: function() {
          // fail
        },
        complete: function() {
          // complete
        }
      });
    }
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
  refresh: function () {
    const self = this;
    this.setData({hasRefresh: true});
    const app = getApp();
    const groups = app.globalData.groups; 
    wx.request({
      url: `https://www.javenleung.com/statistic?groupId=${groups[0]._id}&pager=1&count=10`,
      method: 'GET',
      success: function(res){
        // success
        console.log('---refresh done-----');
        self.setData({pager: 1, records: res.data, hasRefresh: false});
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    });
  },
  loadMore: function () {
    console.log('加载更多');
    this.setData({hasMore: true});
    const app = getApp();
    const groups = app.globalData.groups;
    const self = this;
    const oldPager = this.data.pager;
    const pager = oldPager + 1;
    console.log('加载更多请求', `https://www.javenleung.com/statistic?groupId=${groups[0]._id}&pager=${pager}&count=10`);
     wx.request({
      url: `https://www.javenleung.com/statistic?groupId=${groups[0]._id}&pager=${pager}&count=10`,
      method: 'GET',
      success: function(res){
        // success
        console.log('---loadMOre done-----', res.data);
        const newPager = res.data.length ? pager : oldPager;
        const recs = self.data.records;
        self.setData({pager: newPager, records: recs.concat(res.data), hasMore: false});
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    });
  },
  onPullDownRefresh: function () {
    console.log('下拉刷新。。');
  },
  scroll: function () {

  }
})