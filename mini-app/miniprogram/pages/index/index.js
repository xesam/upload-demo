const app = getApp()

Page({
    data: {},

    onLoad(query) {

    },
    onTapWxUpload() {
        wx.chooseImage({
            success(res) {
                const tempFilePaths = res.tempFilePaths
                wx.uploadFile({
                    url: 'http://127.0.0.1:3000/upload', //仅为示例，非真实的接口地址
                    filePath: tempFilePaths[0],
                    name: 'single',
                    formData: {
                        'name': 'xiao',
                        'age': 18
                    },
                    success(res) {
                        const data = res.data
                        console.log(data);
                    }
                })
            }
        })
    },
    onTapRequestUpload() {
    }
})
