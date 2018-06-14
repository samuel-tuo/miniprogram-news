const newsTypeMap = [
  {id: "gn", key: "国内"},
  {id: "gj", key: "国际"},
  {id: "cj", key: "财经"},
  {id: "yl", key: "娱乐"},
  {id: "js", key: "军事"},
  {id: "ty", key: "体育"},
  {id: "other", key: "其他"}
]

Page({
  /* 页面初始化 */
  data: {
    newsTypeMap: newsTypeMap,
    newsType: '',
    currentTab: 0,
  },

  /* 加载页面 */
  onLoad(){
    this.data.newsType = this.data.newsTypeMap[0].id
    this.getNews()
  },

  /* 下拉刷新 */
  onPullDownRefresh(){
    this.getNews(()=>{ wx.stopPullDownRefresh()})
  },
  
  /* 请求新闻api */
  getNews(callback) {
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list',
      data: {
        type: this.data.newsType
      },
      success: res => {
        let mainNew = ""
        let newsList = []
        let info = res.data.result
        mainNew = info[0]
        this.handleNewsInfo(info, newsList,mainNew)
        this.setData({
          mainNew: mainNew,
          newsList: newsList
        })
      },
      complete: ()=>{
        callback && callback()
      }
    })
  },
  /* 标签切换 */
  switchType: function(event) {
    let currentNewsType = event.target.dataset.id;
    if(this.data.currentTab === event.target.dataset.current){
      return false;
    }else{
      this.getNews()
      this.setData({
        newsType: currentNewsType,
        currentTab: event.target.dataset.current,
      })
    }
  },
  /* 新闻数据处理 */
  handleNewsInfo: function(info,newsList,mainNew){
    for (let i = 0; i < info.length; i++) {
      info[i].date = info[i].date.substr(0, 10) + ' ' + info[i].date.substr(11, 5)
      if (info[i].source === "") {
        info[i].source = "网络媒体";
      }
      if (info[i].firstImage === ""){
        info[i].firstImage = "/images/default_icon.jpg"
      }
      if(i===0){
        mainNew = info[i]
      }else{
        newsList[i - 1] = info[i]
      }
    }
  },
  /* 点击跳转新闻详情页面 */
  onTapNewsDetail: function(event){
    wx.navigateTo({
      url: '/pages/details/details?id=' + event.currentTarget.dataset.news.id,
    })

  }
})
