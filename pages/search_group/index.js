// pages/search_group/index.js
const pageConfig = {
  data:{
    results:[],
    searching: false
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
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
  onSearchGroup: function (e) {
    const kw = e.detail.value.trim();
    console.log('输入群名', kw);
    const self = this;
    const searching = this.searching;
    if (!kw) {
      this.setData({results: [], searching: false});
      return;
    }
    if (!searching) {
      this.setData({searching: true});
      wx.request({
        url: 'https://www.javenleung.com/group/search_group',
        data: {
          groupName: kw
        },
        method: 'POST',
        success: function(res) {
          console.log('搜索出来的群组', res);
          self.setData({results: res.data, searching: false});
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
  onJoin: function (e) {
    const data = e.currentTarget.dataset;
    console.log('加群data===', e);
    wx.navigateTo({
      url: `../join_group/index?groupId=${data.id}`,
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
};

Page(pageConfig);
