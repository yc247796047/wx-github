// var amapFile = require('..­/..­/libs/amap-wx.js');//如：..­/..­/libs/amap-wx.js
const API_URL = "http://localhost:8082/demo/superadmin/areas/"


Page({

  /**
   * 页面的初始数据
   */
  data: {
    area: '',


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
          area: data.areaList
        });

        wx.showToast({
          title: "加载中。。",
          icon: 'loading',
          duration: 1000,
        })
        console.log(data.areaList)      
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
    const that = this;
    wx.request({
      url: API_URL ,
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {

        const data = res.data;
        console.log(data);
        that.setData({
          area: data.areaList
        });

        wx.showToast({
          title: "加载中。。",
          icon: 'loading',
          duration: 1000,
        })
        console.log(data.areaList)
      }
    })
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

  addArea:function(){
    wx.navigateTo({
      url: '../operation/operation',
    })
  },

  deleteArea:function(e){
    var that = this;
    console.log(e.target)
    wx.showModal({
      title: '提示',
      content: '确定要删除【'+e.target.dataset.areaname+'】吗？',
      success:function(sm){
        if(sm.confirm)
        wx.request({
          url: API_URL + e.target.dataset.areaid,
          data:{},
          method:'DELETE',
          success:function(res){
            console.log(API_URL + e.target.dataset.areaid)
            console.log(res.data)
            var result =res.data.success;
            var toastText = "删除成功!"; 
            if(result=='0'){
              that.data.area.splice(e.target.dataset.index,1)
              that.setData({
                area: that.data.area
              })
              console.log('删除成功')
            }else{
              toastText = "删除失败"
            }
            wx.showToast({
              title: toastText,
              icon: 'loading',
              duration: 1000
            })
          }
        })
      }
    })
  }
})