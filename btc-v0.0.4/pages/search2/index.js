const app = getApp();
Page({
  onShareAppMessage: function () {
    return {
      title: '比特松鼠币币对比',
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
    inputValue: '',
    bindSource: [],//绑定到页面的数据，根据用户输入动态变化
    toast: false,
    hotShow: true
  },
  onLoad: function (option) {
    var that = this
    if (option.first) {
      that.setData({
        first: JSON.parse(option.first),
      })
    }
    if (option.compare) {
      // console.log('对比页进入搜索', JSON.parse(option.compare))
      that.setData({
        compare: JSON.parse(option.compare)
      })
    }

  },
  onReady: function () {
    var that = this
    wx.getStorage({
      key: 'default1',
      success: function (res) {
        that.setData({
          show: res.data
        })
      }
    })
    wx.getStorage({
      key: 'hot',
      success: function (res) {
        that.setData({
          hot: res.data
        })
      },
    })
  },
  cancle: function (e) {
    this.setData({
      inputValue: '',
      bindSource: [],
      hotShow: true
    })
  },
  searchBtn: function (e) {
    wx.showToast({
      title: '没有结果',
      icon: 'none'
    })
  },

  //当键盘输入时，触发input事件
  bindinput: function (e) {
    // var that = this
    var prefix = e.detail.value//用户实时输入值
    var newSource = []//匹配的结果
    if (prefix.toUpperCase() != "") {
      this.data.show.slice(0).forEach(function (e) {
        if (e.symbol.toLowerCase().indexOf(prefix) != -1 || e.symbol.indexOf(prefix) != -1) {
          newSource.push(e)
        }
      })
    }
    this.setData({
      prefix: e.detail.value,
    })
    if (newSource.length != 0) {
      this.setData({
        bindSource: newSource,
        hotShow: false
      })

    } else {
      this.setData({
        bindSource: [],
        hotShow: false
      })
    }
  },
  itemtap: function (e) {
    var that = this
    this.setData({
      inputValue: e.target.id,
      // bindSource: []
    })
    var show = that.data.bindSource.length > 0 && that.data.hot ? that.data.bindSource : that.data.hot;
    var arr = getCurrentPages()
    var id = e.currentTarget.dataset.id >= 0 ? e.currentTarget.dataset.id : e.currentTarget.dataset.check
    if (arr[arr.length - 2].route == 'pages/index/index') {
      wx.navigateBack({
        delta: 1,
        success: function (res) {
          arr[arr.length - 2].setData({
            show2: show[id],
            searchTwo: true,
            hiddenLoading: true
          })

          app.func.req('api/web/symbol/compare', { guid: that.data.first[0].guid, guid_be: show[id].guid, guid_symbol: that.data.first[0].symbol, guid_be_symbol: show[id].symbol }, function (res) {
            arr[arr.length - 2].setData({
              right: res.data.guid_be,
              topRight: res.data.top.guid_be
            })
          })
        }
      })
    }
    else {
      wx.navigateBack({
        delta: 1,
        success: function (res) {
          arr[arr.length - 2].setData({
            searchTwo: true,
            hiddenLoading: false
          })

          app.func.req('api/web/symbol/compare', { guid: that.data.compare.guid.guid, guid_be: show[id].guid, guid_symbol: that.data.compare.guid.symbol, guid_be_symbol: show[id].symbol }, function (res) {
            arr[arr.length - 2].setData({
              compare: res.data,
              show1: res.data.guid,
              show2: res.data.guid_be,
              right: res.data.guid_be,
              topRight: res.data.top.guid_be
            })
          })

        }
      })
    }
  },
})