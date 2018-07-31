Page({
  data: {
    compare: '',
    hiddenLoading: false,
  },
  onLoad: function (option) {
    var that = this
    that.setData({
      compare: JSON.parse(option.compare),
      left: JSON.parse(option.compare).guid,
      right: JSON.parse(option.compare).guid_be,
      topLeft: JSON.parse(option.compare).top.guid,
      topRight: JSON.parse(option.compare).top.guid_be,
    })
  },
  onShow() {
    var that = this

    setTimeout(() => {
      that.setData({
        hiddenLoading: true,
        compare: that.data.compare,
      })
    
    }, 800)
  },
  onUnload: function () {
    var that = this
    var pages = getCurrentPages()
    var prevPage = pages[pages.length - 2]
    prevPage.setData({
      show1:that.data.compare.guid,
      show2: that.data.compare.guid_be,
      num:0
    })
  },
  onShareAppMessage: function (res) {
    var that = this
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {

      title: that.data.left.symbol + "和" + that.data.right.symbol + "哪个更值得买，快来看看对比结果!",
      path: '/pages/details/index?compare=' + JSON.stringify(that.data.compare),
      // path: '/pages/index/index',
      // imageUrl: '../../img/group.png',
      success(e) {
        wx.showShareMenu({
          withShareTicket: true
        })
      }
    }
  },
  searchOne: function (e) {
    var that = this
    wx.navigateTo({
      url: '../search1/index?compare=' + JSON.stringify(that.data.compare)
    })
  },
  searchTwo: function (e) {
    var that = this
    wx.navigateTo({
      url: '../search2/index?compare=' + JSON.stringify(that.data.compare)
    })
  },
  toHelp: function () {
    wx.navigateTo({
      url: '../help/index'
    })
  }
})