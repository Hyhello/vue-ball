module.exports = {
	__PREFIX__: 'vue',
	dev: {
		port: 9527,
		open: true,
		host: 'localhost',
		outputType: 'iife'
	},
	prod: {
		outputDir: 'lib',
		outputTypeList: ['umd', 'esm', 'cjs']
	}
};
