/**
 * 作者：Hyhello
 * 时间：2020-07-05
 * 描述：prefix插件
 */
const config = require('../config');

const reg = /(__PREFIX__)/g;

const parseSelector = function(opts = {}) {
	return {
        postcssPlugin: 'postcss-parse-selector',
        Rule (node) {
            node.selector = node.selector.replace(reg, function(match, chr) {
                return `${config.__PREFIX__}`;
            });
        }
    };
};

parseSelector.postcss = true;

module.exports = parseSelector;
