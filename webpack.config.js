const {resolve}=require('path');
const HtmlWebpackPlugin=require('html-webpack-plugin');
module.exports={
	mode:'development',
	entry: './src/main.js',
	output: {
		filename: 'bundle.js',
		path: resolve('./dist')
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ["@babel/preset-env","@babel/preset-react"],
						plugins:["@babel/plugin-proposal-class-properties"]
					}
				},
				exclude: /node_modules/,
				
			},
			{test: /\.css$/,use: ['style-loader','css-loader']},
			{test: /\.less$/,use: ['style-loader','css-loader','less-loader']},
			{test: /\.(jpg|png|gif)$/,use: 'url-loader'},
		]
	},
	devtool: 'sourcemap',
	plugins: [
		new HtmlWebpackPlugin({
			template:'./src/index.html'
		})
	]
}