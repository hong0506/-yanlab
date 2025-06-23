Page({
  data: {
    tips: []
  },
  onLoad() {
    // 模拟获取今日建议内容
    const todayTips = [
      '保持皮肤水分，每日饮水不少于 1500ml',
      '清晨用温水洗脸，避免刺激皮脂膜',
      '使用含抗氧化成分的护肤品，如维C精华',
      '晚上 11 点前尽量入睡，促进皮肤修复'
    ]
    this.setData({
      tips: todayTips
    })
  },
  goBack() {
    wx.navigateBack()
  }
})
