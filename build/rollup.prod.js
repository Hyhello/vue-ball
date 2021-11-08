const rollup = require('rollup');
const config = require('../config');
const rollupConfig = require('./rollup.base');
const packageJson = require('../package.json');
const filesize = require('rollup-plugin-filesize');
const { terser } = require('rollup-plugin-terser');
const { toCamel, del, pathResolve } = require('./utils');

const name = toCamel(packageJson.name.split('/')[1]);

// 获取banaer
const author = packageJson.author || 'Hyhello';
const version = process.env.VERSION || packageJson.version;
const banner =
    '/*!\n' +
    ` * ${packageJson.name} v${version}\n` +
    ` * @license (c) 2018-${new Date().getFullYear()} ${author}\n` +
    ' * Released under the MIT License.\n' +
    ' */';

const terserPlugin = terser({
	output: {
		ascii_only: true, // 仅支持ascii字符，非ascii字符将转成\u格式
		comments: function(node, comment) {
			var text = comment.value;
			var type = comment.type;
			if (type == 'comment2') {
				// multiline comment
				return /@preserve|@license|@(c)/i.test(text);
			}
		}
	},
	compress: {
		pure_funcs: ['func', 'console.log'] // 去掉console.log函数
	}
});

rollupConfig.plugins.push(terserPlugin, filesize());

// 构建所有
function buildEntry() {
    const { outputDir, outputTypeList } = config.prod;
	del([outputDir]);
    rollup
        .rollup(rollupConfig)
        .then(bundle => {
            outputTypeList.forEach(type => {
                bundle.write({
                    format: type,
                    name: name,
                    banner,
                    file: `${outputDir}/index.${type}.js`,
                    sourcemap: false,
                    // exports: type === 'umd' ? 'default' : 'named',   // 因为要适用于esm，故去掉了
                    exports: 'named',
                    globals: {
                        vue: 'Vue'
                    }
                });
            });
        });
}
buildEntry();
