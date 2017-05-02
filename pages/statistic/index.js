// pages/logs/index.js
Page({
  data: {
    pager: 1,
    records: [],
    windowHeight: 0,
    isRefreshing: true,
    hidden: false,
    hasMore: false
  },
  onLoad: function (options) {
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
        success: function (res) {
          groups = res.data;
          wx.request({
            url: `https://www.javenleung.com/statistic?groupId=${groups[0]._id}&pager=1&count=10`,
            method: 'GET',
            success: function (res) {
              console.log('拉取送豆记录', res);
              self.setData({pager: 1, records: res.data, hidden: true});
            },
            fail: function () {
              // fail
            },
            complete: function () {
              // complete
            }
          });
        },
        fail: function () {
          // fail
        },
        complete: function () {
          // complete
        }
      });
    } else {
      wx.request({
        url: `https://www.javenleung.com/statistic?groupId=${groups[0]._id}&pager=1&count=10`,
        method: 'GET',
        success: function (res) {
          console.log('拉取送豆记录', res);
          self.setData({pager: 1, records: res.data, hidden: true});
        },
        fail: function () {
          // fail
        },
        complete: function () {
          // complete
        }
      });
    }
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示

  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  onReachBottom: function () {
    console.log('加载更多');
    this.setData({isRefreshing: false, hasMore: true});
    const app = getApp();
    const groups = app.globalData.groups;
    const self = this;
    const oldPager = this.data.pager;
    const pager = oldPager + 1;
    console.log('加载更多请求', `https://www.javenleung.com/statistic?groupId=${groups[0]._id}&pager=${pager}&count=10`);
    wx.request({
      url: `https://www.javenleung.com/statistic?groupId=${groups[0]._id}&pager=${pager}&count=10`,
      method: 'GET',
      success: function (res) {
        // success
        console.log('---loadMOre done-----', res.data);
        const newPager = res.data.length ? pager : oldPager;
        const recs = self.data.records;
        self.setData({pager: newPager, records: recs.concat(res.data), hasMore: false});
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    });
  },
  onPullDownRefresh: function () {
    const self = this;
    const app = getApp();
    const groups = app.globalData.groups;
    const start = Date.now();
    wx.request({
      url: `https://www.javenleung.com/statistic?groupId=${groups[0]._id}&pager=1&count=10`,
      method: 'GET',
      success: function (res) {
        // success
        console.log('---refresh done-----');
        const end = Date.now();
        if (end - start > 1000) {
          self.setData({pager: 1, records: res.data});
          wx.stopPullDownRefresh();
        } else {
          setTimeout(() => {
            self.setData({pager: 1, records: res.data});
            wx.stopPullDownRefresh();
          }, 1000 - (end - start));
        }
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    });
  },
  scroll: function () {

  }
});
