const path = require('path');

module.exports = {
    entry: {
        app: './src/app.ts'
    },
    output: {
        filename: '[name].js', //.[contenthash]
        path: path.resolve(__dirname, 'dist'),
        clean: true
    },
    mode: 'development', //production
    module: {
        rules: [{
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                loader: "css-loader",
                options: {
                    modules: true,
                }
            }
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    }
};