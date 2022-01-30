const path = require('path')
module.exports = {
    mode: "production",
    entry: { //入口文件
        index: './index.js',
    },
    output: { //出口文件
        publicPath: './', //模板、样式、脚本、图片等资源的路径中统一会加上额外的路径
        path: path.resolve(__dirname, './'),
        filename: './prod.min.js'
    },
    node: {
        Buffer: false
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            loader: "ts-loader"
        }]
    },
    externals: {
    },
    plugins: [
    ]
};