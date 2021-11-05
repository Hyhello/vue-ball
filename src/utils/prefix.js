/**
 * 作者：Hyhello
 * 时间：2020-07-05
 * 描述：组件前缀
 */
import { camelize } from './utils';

/**
 * @param { string } name // 需添加的名字
 * @return { string } // 返回添加prefix之后的name， 小驼峰
 */
const _joinPrefix = (name) => {
	return camelize(`__PREFIX__-${name}`);
};

export default _joinPrefix;
