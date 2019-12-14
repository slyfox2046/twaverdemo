/*
 * @Author: your name
 * @Date: 2019-10-08 10:36:39
 * @LastEditTime: 2019-12-14 20:34:05
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \twaverdemo\test\代码格式化文件.js
 */
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

function recursiveIssuer(m) {
    if (m.issuer) {
        return recursiveIssuer(m.issuer);
    } else if (m.name) {
        return m.name;
    } else {
        return false;
    }
}

module.exports = {
    entry: {
        foo: path.resolve(__dirname, 'src/foo'),
        bar: path.resolve(__dirname, 'src/bar'),
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                fooStyles: {
                    name: 'foo',
                    test: (m, c, entry = 'foo') =>
                        m.constructor.name === 'CssModule' && recursiveIssuer(m) === entry,
                    chunks: 'all',
                    enforce: true,
                },
                barStyles: {
                    name: 'bar',
                    test: (m, c, entry = 'bar') =>
                        m.constructor.name === 'CssModule' && recursiveIssuer(m) === entry,
                    chunks: 'all',
                    enforce: true,
                },
            },
        },
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),
    ],
    module: {
        rules: [{
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader'],
        }, ],
    },
};