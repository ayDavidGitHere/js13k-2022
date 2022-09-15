// webpack.config.js
var webpack = require('webpack');
module.exports = {
    entry: {
        //'js/CDraw.js': (__dirname+'/js/CDraw.js'),
        //'js/CodeHelps.js': (__dirname+'/js/CodeHelps.js'),
        //'js/index.js': (__dirname+'/js/index.js'),
        'js/Game.js': (__dirname+'/js/Game.js'),
        //9'index.html': (__dirname+'/index.html'),
    },
    output: {
        path: (__dirname+'/dist'),
        filename: '[name]'
    },
    module: {
		rules: [{
			// Only run `.js` files through Babel
			test: /\.m?js$/,
			exclude: /(node_modules)/,
			use: {
				loader: 'babel-loader',
				options: {
					presets: ['@babel/preset-env']
				}
			}
		}]
	},
}