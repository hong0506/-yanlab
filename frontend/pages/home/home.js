Page({
  data: {
    userName: '',
    avatarUrl: '',
    beautyScore: 0,
    lastUpdated: ''
  },
  onLoad() {
    // 第一步：POST 提交数据
    wx.request({
      url: 'http://127.0.0.1:8000/submit-profile',
      method: 'POST',
      data: {
        userName: 'Alice',
        avatarUrl: '/assets/avatar.png',
        beautyScore: 85
      },
      success: (res) => {
        console.log('数据提交成功:', res.data);

        // 第二步：提交成功后再 GET 最新数据
        wx.request({
          url: 'http://127.0.0.1:8000/user-profile',
          method: 'GET',
          success: (res) => {
            console.log('读取用户数据成功:', res);
            const data = res.data;
            this.setData({
              userName: data.userName,
              avatarUrl: data.avatarUrl,
              beautyScore: data.beautyScore,
              lastUpdated: data.lastUpdated
            });
          },
          fail: (err) => {
            console.log("获取用户数据失败：", err);
          }
        });

      },
      fail: (err) => {
        console.log('数据提交失败:', err);
      }
    });
  },
  handleViewTips() {
    wx.navigateTo({
      url: '/pages/tips/tips'
    });
  },
});
