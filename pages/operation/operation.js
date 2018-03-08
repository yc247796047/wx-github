// var amapFile = require('..­/..­/libs/amap-wx.js');//如：..­/..­/libs/amap-wx.js
const API_URL = "http://localhost:8082/demo/superadmin/areas/"


Page({

  /**
   * 页面的初始数据
   */
  data: {
    areaId: undefined,
    area: '',





  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this;
    console.log(options)
    this.setData({
      areaId: options.areaId
    });

    if (options.areaId == undefined) {
      return;
    }
    wx.request({
      url: API_URL + options.areaId,
      data: {},
      method: 'GET',
      success: function (res) {
        console.log(API_URL + options.areaId)
        console.log("res.data:" + res.data)
        console.log("that.data.area.priority:" + res.data.area.priority)
        var result = res.data.success;
        var toastText = "获取数据成功!";
        if (result == '0') {
          that.setData({
            area: res.data.area
          })
          console.log('获取数据成功')
        } else {
          toastText = "获取数据失败"
        }
        wx.showToast({
          title: toastText,
          icon: 'loading',
          duration: 1000
        })
      }
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

  },

  formSubmit: function (e) {
    var that = this;
    var method ;
    var formData = e.detail.value;
    if(that.data.areaId != undefined){
      //编辑
      method = "PUT"
    }else{
      method = "POST"
    }
    console.log(formData)
    wx.request({
      url: API_URL,
      data: JSON.stringify(formData),
      method: method,
      success: function (res) {
        var result = res.data.success;
        var toastText = "操作成功!";
        if (result == '0') {
          console.log('操作成功')
          wx.showToast({
            title: toastText,
            icon: '',
            duration: 1000
          })
          if (result == '0') {
            wx.navigateBack({
              url: '../area/area',
            })
          }
        } else {
          toastText = "操作失败"
          wx.showModal({
            content: toastText,
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              }
            }
          });
        }
      }
    })
  }

})