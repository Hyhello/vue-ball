// 判断是否是个元素
export const isElement = (el) => {
	return typeof el === 'object' && el.nodeType === 1;
};

// 小驼峰 aa-b -> aaB , -a => A
export const camelize = (str) => {
	return str.replace(/-+(.)?/g, (match, chr) => {
		return chr ? chr.toUpperCase() : '';
	});
};

// 配置number convert to array
export const rangeArr = (n, initialValue) => {
	// eslint-disable-next-line no-unused-vars
	return Array.apply(Array, {
		length: n
	}).map(() => initialValue);
};

// 获取当前size
export const getOffset = (root) => {
	const rect = root.getBoundingClientRect();
	const stl = document.defaultView.getComputedStyle(root);
	// eslint-disable-next-line no-bitwise
	const left = (rect.left + parseInt(stl.paddingLeft, 10)) | 0;
	// eslint-disable-next-line no-bitwise
	const top = (rect.top + parseInt(stl.paddingTop, 10)) | 0;
	return {
		left,
		top
	};
};
