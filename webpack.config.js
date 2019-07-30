const path = require('path');

module.exports = function (env) {
    return {

        mode: env || 'production',
        entry: './src/index.js',
        output: {
            filename: 'index.js',
            path: path.resolve(__dirname, 'dist'),
            library: 'tably',
            libraryTarget: 'umd',
        },
        devtool: 'source-map',
        resolve: {
            extensions: ['.js']
        },
        module: {
            rules: [
                { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
            ]
        }
    };
};
