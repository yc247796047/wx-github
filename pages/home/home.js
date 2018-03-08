const API_URL = "https://api.github.com/users/"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    github:[],
    values:''
  },
  search:function(e){
    console.log("-----"+e.detail.value)
    console.log(e)
    const tt = this;
    tt.setData({
      values: e.detail.value
    });
    if(!e.detail.value){
      retrun ;
    }
      wx.showToast({
        title: '加载中',
        icon: 'loading',
        duration: 5000,
      })
      const that = this;
      wx.request({
        url: API_URL + e.detail.value,
        data: {},
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          wx.hideToast();
          const data = res.data;
          console.log(data);
          that.setData({
            github: data,
          });
        }
      })
    }
})