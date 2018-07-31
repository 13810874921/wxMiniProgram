// var rootDocment = 'https://api2.fbssql.com/';//测试服务器  300
var rootDocment = 'https://sql.fbssql.com/';//正式服务器  1000
function req(url, data, cb) {
  wx.request({
    url: rootDocment + url,
    data: data,
    method: 'POST',
    header: { "Content-Type": "application/x-www-form-urlencoded" },
    success: function (res) {
      return typeof cb == "function" && cb(res.data)
    },
    fail: function () {
      return typeof cb == "function" && cb(false)
    }
  })
}
module.exports = {
  req: req
} 