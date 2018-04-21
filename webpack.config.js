const path = require('path');

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: './js/app.jsx',
    output: {
        filename: 'app.bundle.js',
        path: path.resolve(__dirname, './build')
    },
    module: {
        rules: [
            // First Rule
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.html$/,
                loader: "html-loader"
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
};