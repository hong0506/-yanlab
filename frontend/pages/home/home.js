Page({
  data: {
    userName: '',
    avatarUrl: '',
    beautyScore: 0,
    lastUpdated: ''
  },
  onLoad() {
    wx.request({
      url: 'http://127.0.0.1:8000/user-profile', // 本机开发时使用
      // url: 'http://192.168.x.x:8000/user-profile', // 真机调试时使用
      success: (res) => {
        console.log('API 请求成功', res);  // 在控制台查看请求数据
        const data = res.data;
        this.setData({
          userName: data.userName,
          avatarUrl: data.avatarUrl,
          beautyScore: data.beautyScore,
          lastUpdated: data.lastUpdated
        });
        console.log("请求成功");
      },
      fail: (err) => {
        console.log("请求失败：", err);
      }
    });
  },
  handleViewTips() {
    wx.navigateTo({
      url: '/pages/tips/tips'
    });
  },
});
