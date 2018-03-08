// var amapFile = require('..­/..­/libs/amap-wx.js');//如：..­/..­/libs/amap-wx.js
const API_URL = "http://localhost:8082/websites/list"
const tla = 39.979370;
const tlng = 116.489170;//途家39.979370,116.489170
const dla = 39.956120;
const dlng = 116.477220;//大鱼39.956120,116.477220


function getDistance(lat1, lng1, lat2, lng2) {
  var radLat1 = lat1 * Math.PI / 180.0;
  var radLat2 = lat2 * Math.PI / 180.0;
  var a = radLat1 - radLat2;
  var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
  var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
  s = s * 6378.137;
  s = Math.round(s * 10000) / 10000;
  return s
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    code: '',
    data: '',
    latitude: '',
    longitude: '',
    stujia: ' ',
    sdayu:''

  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {

    const that = this;
    wx.request({
      url: API_URL,
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {

        const data = res.data;
        console.log(data);
        that.setData({
          code: data.code,
          data: data
        });

        wx.showToast({
          title: data.code.toString(),
          icon: 'loading',
          duration: 1000,
        })
      }
    })

    wx.getLocation({
      success: function (res) {
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude,
          stujia: getDistance(res.latitude, res.longitude, tla, tlng),
          sdayu: getDistance(res.latitude, res.longitude, dla, dlng),
        });
        console.log("stujia"+getDistance(res.latitude, res.longitude,tla,tlng))
        console.log("sdayu" + getDistance(res.latitude, res.longitude, dla, dlng))
        console.log("当前位置："+res.latitude + "," + res.longitude)
        
      },
    })



  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})