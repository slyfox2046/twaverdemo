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