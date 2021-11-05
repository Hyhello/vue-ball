const vue = require('rollup-plugin-vue');
const postCssPlugin = require('./postcss');
const json = require('@rollup/plugin-json');
const alias = require('@rollup/plugin-alias');
const eslint = require('@rollup/plugin-eslint');
const { babel } = require('@rollup/plugin-babel');
const replace = require('@rollup/plugin-replace');
const commonjs = require('@rollup/plugin-commonjs');
// const typescript = require('@rollup/plugin-typescript');
const { nodeResolve } = require('@rollup/plugin-node-resolve');

const aliass = require('./alias');
const config = require('../config');
const packageJson = require('../package.json');

const name = packageJson.name.split('/')[1];
const version = process.env.VERSION || packageJson.version;
const env = process.env.NODE_ENV || 'development';

const baseConfig = {
    input: 'src/index.js',
    external: ['vue'],
    plugins: [
        alias(Object.assign({}, aliass)),
        eslint({
			formatter: require('eslint-friendly-formatter'),
			include: ['src/**/*.{js|jsx|vue}', 'packages/**/*.{js|jsx|vue}']
		}),
        nodeResolve({
            extensions: aliass.resolve
        }),
        commonjs(),
        postCssPlugin(),
        json({
            exclude: ['node_modules/**']
        }),
        babel({ babelHelpers: 'runtime' }),
        vue({
            target: 'browser'
        }),
        // typescript(),
		replace({
            preventAssignment: true,
            values: {
                __VERSION__: version,
                __NAME__: name,
                __PREFIX__: config.__PREFIX__,
                'process.env.NODE_ENV': JSON.stringify(env)
		    }
        })
    ]
};

module.exports = baseConfig;
