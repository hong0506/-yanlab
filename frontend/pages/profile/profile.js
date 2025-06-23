// profile.js
Page({
  data: {
    userName: '',
    avatarUrl: ''
  },
  onGetUserInfo(e) {
    const userInfo = e.detail.userInfo;
    this.setData({
      userName: userInfo.nickName,
      avatarUrl: userInfo.avatarUrl
    });

    // 可在此发起 POST 请求到后端保存
    wx.request({
      url: 'http://127.0.0.1:8000/submit-profile',
      method: 'POST',
      data: {
        userName: userInfo.nickName,
        avatarUrl: userInfo.avatarUrl,
        beautyScore: 85 // 假设这里来自皮肤分析结果
      },
      success: res => {
        console.log('提交成功:', res);
      }
    });
  }
});
