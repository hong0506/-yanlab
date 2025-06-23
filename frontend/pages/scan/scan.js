// Page({
//   data: {
//     canIUse: wx.canIUse('button.open-type.getUserInfo'),
//     hasUserInfo: false,
//     userInfo: {},
//     showCamera: false,
//     imageSrc: '',
//     analysisResult: null,
//     loading: false
//   },

//   onLoad() {
//     // 检查用户授权状态
//     wx.getSetting({
//       success: res => {
//         if (res.authSetting['scope.userInfo']) {
//           wx.getUserInfo({
//             success: res => {
//               this.setData({
//                 userInfo: res.userInfo,
//                 hasUserInfo: true
//               })
//             }
//           })
//         }
//       }
//     })
//   },

//   // 获取用户信息
//   getUserInfo(e) {
//     this.setData({
//       userInfo: e.detail.userInfo,
//       hasUserInfo: true
//     })
//   },

//   // 开启相机
//   startCamera() {
//     this.setData({
//       showCamera: true
//     })
//   },

//   // 拍照
//   takePhoto() {
//     const ctx = wx.createCameraContext()
//     ctx.takePhoto({
//       quality: 'high',
//       success: (res) => {
//         this.setData({
//           imageSrc: res.tempImagePath,
//           showCamera: false
//         })
//         this.analyzeSkin(res.tempImagePath)
//       },
//       fail: (err) => {
//         wx.showToast({
//           title: '拍照失败',
//           icon: 'error'
//         })
//       }
//     })
//   },

//   // 从相册选择
//   chooseImage() {
//     wx.chooseImage({
//       count: 1,
//       sizeType: ['compressed'],
//       sourceType: ['album'],
//       success: (res) => {
//         const tempFilePath = res.tempFilePaths[0]
//         this.setData({
//           imageSrc: tempFilePath
//         })
//         this.analyzeSkin(tempFilePath)
//       }
//     })
//   },

//   // 皮肤分析 (模拟AI分析)
//   analyzeSkin(imagePath) {
//     this.setData({ loading: true })

//     // 模拟分析过程
//     setTimeout(() => {
//       const mockAnalysis = this.generateMockAnalysis()
//       this.setData({
//         analysisResult: mockAnalysis,
//         loading: false
//       })

//       // 保存到历史记录
//       const app = getApp()
//       app.globalData.analysisHistory.unshift({
//         date: new Date().toLocaleDateString(),
//         image: imagePath,
//         result: mockAnalysis
//       })
//     }, 2000)
//   },

//   // 生成模拟分析结果
//   generateMockAnalysis() {
//     const issues = [
//       { name: '痘痘', severity: Math.floor(Math.random() * 3) + 1, description: '面部T区有轻微痘痘' },
//       { name: '黑眼圈', severity: Math.floor(Math.random() * 3) + 1, description: '眼部周围有轻度黑眼圈' },
//       { name: '细纹', severity: Math.floor(Math.random() * 2) + 1, description: '眼角有细微表情纹' },
//       { name: '肤色不均', severity: Math.floor(Math.random() * 2) + 1, description: '整体肤色较为均匀' }
//     ]

//     const selectedIssues = issues.filter(() => Math.random() > 0.3)

//     return {
//       overallScore: Math.floor(Math.random() * 30) + 70, // 70-100分
//       skinType: ['干性', '油性', '混合性', '敏感性'][Math.floor(Math.random() * 4)],
//       issues: selectedIssues,
//       recommendations: this.generateRecommendations(selectedIssues)
//     }
//   },

//   // 生成护肤建议
//   generateRecommendations(issues) {
//     const productDB = {
//       '痘痘': [
//         { name: '水杨酸洁面乳', brand: '理肤泉', price: '￥180', description: '深层清洁，控制油脂分泌' },
//         { name: '祛痘精华', brand: '薇诺娜', price: '￥280', description: '温和祛痘，修复肌肤' }
//       ],
//       '黑眼圈': [
//         { name: '维C眼霜', brand: 'SK-II', price: '￥680', description: '淡化黑眼圈，紧致眼部' },
//         { name: '咖啡因眼膜', brand: '兰蔻', price: '￥320', description: '消除浮肿，提亮眼周' }
//       ],
//       '细纹': [
//         { name: '抗皱精华', brand: '雅诗兰黛', price: '￥580', description: '减少细纹，紧致肌肤' },
//         { name: '胶原蛋白面膜', brand: '森田', price: '￥89', description: '补充胶原蛋白，抗衰老' }
//       ],
//       '肤色不均': [
//         { name: '美白精华', brand: '资生堂', price: '￥450', description: '均匀肤色，提亮肌肤' },
//         { name: 'VC面膜', brand: '美迪惠尔', price: '￥120', description: '补充维C，改善暗沉' }
//       ]
//     }

//     const recommendations = []
//     issues.forEach(issue => {
//       if (productDB[issue.name]) {
//         recommendations.push(...productDB[issue.name])
//       }
//     })

//     return {
//       skincare: recommendations.slice(0, 4),
//       routine: [
//         '早晨：温和洁面 → 爽肤水 → 精华 → 乳液 → 防晒',
//         '晚间：卸妆 → 深层清洁 → 爽肤水 → 精华 → 面霜',
//         '每周2-3次面膜护理',
//         '注意防晒，多喝水，保持充足睡眠'
//       ]
//     }
//   },

//   // 查看历史记录
//   viewHistory() {
//     wx.navigateTo({
//       url: '/pages/history/history'
//     })
//   },

//   // 重新分析
//   reAnalyze() {
//     this.setData({
//       imageSrc: '',
//       analysisResult: null
//     })
//   }
// })


Page({
  data: {
    imageSrc: '',
    result: ''
  },

  chooseImage() {
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      success: (res) => {
        this.setData({ imageSrc: res.tempFiles[0].tempFilePath });
      }
    });
  },

  analyzeImage() {
    const that = this;
    wx.uploadFile({
      url: 'http://127.0.0.1:8000/analyze-face',
      filePath: this.data.imageSrc,
      name: 'file',
      success(res) {
        const result = JSON.parse(res.data);
        that.setData({ result: result.message });
      },
      fail(err) {
        console.error("分析失败", err);
      }
    });
  }
});
