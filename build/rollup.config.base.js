import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import vue from 'rollup-plugin-vue'
import css from 'rollup-plugin-css-porter'
// import stylus from 'rollup-plugin-stylus-css-modules'
import cjs from 'rollup-plugin-commonjs'
import replace from 'rollup-plugin-replace'

const config = require('../package.json')

export default {
	input: 'src/index.js',
	name: 'vue-googlemaps',
	plugins: [
		resolve({
			jsnext: true,
			main: true,
			browser: true,
		}),
		cjs(),
		vue({
			autoStyles: false,
			styleToImports: true,
		}),
		// stylus({
		// 	sourceMap: false,
		// 	// output (css) {
		// 	// 	console.log(css)
		// 	// },
		// }),
		css({
			minified: 'dist/vue-googlemaps.css',
			raw: false,
		}),
		babel({
			exclude: 'node_modules/**',
			'plugins': [
				'external-helpers',
			],
		}),
		replace({
			VERSION: JSON.stringify(config.version),
		}),
	],
	watch: {
		include: 'src/**',
	},
}