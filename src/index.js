import './skin/index.scss';
import Ball from 'pkg/index';
import _joinPrefix from './utils/prefix';

const components = {
	Ball
};

const install = function (Vue, options = {}) {
	if (install.installed) return;
	install.installed = true;
	Object.keys(components).forEach((key) => {
		const name = _joinPrefix(key);
		const component = components[key];
		component.configure(options);
		Vue.component(name, {
			...component,
			name
		});
	});
};

// window 部分
if (typeof window !== 'undefined' && window.Vue) {
	install(window.Vue);
}

export default {
	v: '__VERSION__',
	install,
	...components
};

export { Ball };
