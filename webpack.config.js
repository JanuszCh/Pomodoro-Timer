module.exports = {
    entry: './js/app.js',
    output: {
        path: __dirname + '/dist/js',
        filename: 'app.js'
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: 'style!css'
            }, {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },
    watch: true
};
