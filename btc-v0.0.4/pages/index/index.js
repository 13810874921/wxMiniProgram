const app = getApp();
Page({
  onShareAppMessage: function () {
    return {
      title: '哪个币值得买，比一比才知道',
      path: '/pages/index/index',
      imageUrl: '../../img/group.png',
      success: function (e) {
        wx.showShareMenu({
          withShareTicket: true
        })
      },
      fail: function () { }
    }
  },
  data: {
    charts: [{
      id: 'pie',
      name: '饼图'
    }],
    hiddenLoading: false,
    searchOne: false,
    searchTwo: false,
    list: [],
    num: 0,
    default1: '',
    show1: { guid: "augur", name: "augur", symbol: "REP", img_url: "" },
    show2:{ guid: "bancor", name: "bancor", symbol: "BNT", img_url: "" }
  },

  onLoad: function (option) {
    var that = this
    app.func.req('api/web/symbol/list', {}, function (res) {
      that.setData({
        first: [res.data.list[0], res.data.list[1]],
      })
      wx.setStorageSync('default1', res.data.list)
      wx.setStorageSync('hot', res.data.hot)
    })
  },
  onReady() {
  },
  onShow: function () {
    var that = this
    
    setTimeout(() => {
      that.setData({
        hiddenLoading: true,
      })
    }, 500)
  },
  open: function (e) {
    wx.navigateTo({
      url: '../' + e.target.dataset.chart.id + '/index'
    });
  },
  searchOne: function (e) {
    var that = this
    that.setData({
      hiddenLoading: false,
      num: 0
    })
    wx.navigateTo({
      url: '../search1/index?first=' + JSON.stringify(that.data.first)
    })
  },
  searchTwo: function (e) {
    var that = this
    that.setData({
      hiddenLoading: false,
      num: 0
    })
    wx.navigateTo({
      url: '../search2/index?first=' + JSON.stringify(that.data.first)
    })
  },
  compare: function () {
    var that = this
    if (that.data.num == 0) {
      that.setData({
        num: 1
      })
      app.func.req('api/web/symbol/compare', { guid: that.data.show1.guid, guid_be: that.data.show2.guid, guid_symbol: that.data.show1.symbol, guid_be_symbol: that.data.show2.symbol }, function (res) {
        that.setData({
          compare: res.data,
          hiddenLoading: false
        })
        wx.navigateTo({
          url: '/pages/details/index?compare=' + JSON.stringify(that.data.compare),
        })
      })
    }
  }
});
