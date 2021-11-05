/**
 * 作者：Hyhello
 * 时间：2019-06-26
 * 描述：别名
 */
const { convertSep, pathResolve } = require('./utils');

module.exports = {
    resolve: ['.vue', '.js', '.jsx', '.json', '.scss'],
    entries: {
        '@': convertSep(pathResolve('./src'), '/'),
	    pkg: convertSep(pathResolve('./packages'), '/')
    }
};
