// pages/details/details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    title: '标题',
    date: '',
    source: '',
    readCount: 0,
    content: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
    })
    this.getDetails()
  
  },
  /* 获得新闻详情 */
  getDetails(){
    wx.request({
      url: 'https://test-miniprogram.com/api/news/detail',
      data: {
        id: this.data.id
      },
      success: res => {
        console.log(res)
        if(res.data.code === 200){
          let result = res.data.result
          result.source = result.source === "" ? result.source = "网络媒体" : result.source
          result.date = result.date.substr(0,10) + " " + result.date.substr(11,5) + " "
          this.setData({
            ...result,
            source: result.source,
            date: result.date
          })
        }
      }
    })
  }
})