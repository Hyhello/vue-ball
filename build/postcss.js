/**
 * 作者：yeshengqiang
 * 时间：2021-06-17
 * 描述：postcss
 */
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');
const postcss = require('rollup-plugin-postcss');

// 导出
module.exports = function getPostCssPlugin() {
	const basePlugins = [require('./postcss-prefix'), autoprefixer];
	const prefix = process.env.NODE_ENV === 'production' ? '.min' : '';
	return postcss({
        inject: true,
		plugins: prefix ? basePlugins.concat(cssnano) : basePlugins,
		sourceMap: !prefix,
		extensions: ['.sass', '.scss', '.css'],
		extract: false // 输出路径,
	});
};
