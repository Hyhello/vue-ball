/**
 * 作者：Hyhello
 * 时间：2021-01-19
 * 描述：ball
 */
import Vue from 'vue';
import ballTpl from './ballTpl';
import { warn } from '@/utils/debug';
import { isElement, rangeArr, getOffset } from '@/utils/utils';

// 当前ball id
let id = 1;

// z-index
let zIndex = 0x7d0;

const Transfr = Vue.extend(ballTpl);

export default {
	name: 'Ball',
	configure(options = {}) {
		zIndex = options.zIndex || zIndex;
	},
	props: {
		ballNums: {
			type: Number,
			default: 5
		},
		// css动画持续时长
		duration: {
			type: Number,
			default: 1000
		},
		// css 动画
		easing: {
			type: String,
			default: 'cubic-bezier(0.49, -0.35, 0.75, 0.41)'
		}
	},
	data() {
		return {
			instance: null,
			promiseList: [] // 完成的promiseList
		};
	},
	mounted() {
		this._appendToBody();
	},
	beforeDestroy() {
		if (this.instance) {
			document.body.removeChild(this.instance.$el);
			this.instance = null;
		}
	},
	methods: {
		_appendToBody() {
			if (this.instance) return;
			const instance = new Transfr({
				data: {
					balls: rangeArr(this.ballNums).map(() => ({
						show: false,
						animate: false
					})),
					duration: this.duration,
					easing: this.easing,
					done: this.done
				}
			});
			if (this.$slots.icon) {
				instance.$slots.default = this.$slots.icon;
			}
			this.instance = instance.$mount();
			document.body.appendChild(instance.$el);
			instance.$el.setAttribute('data-dom-id', id++);
			instance.$el.style.zIndex = zIndex++;
		},
		// el：HTMLElement，代表起点
		action(el) {
			if (!isElement(el)) return warn('component method action arguments type must be HTMLElement');
			return new Promise((resolve) => {
				const { balls } = this.instance;
				const { dropBalls } = this.instance;
				for (let i = 0, len = balls.length; i < len; i++) {
					const ball = balls[i];
					if (!ball.show) {
						ball.show = true;
						ball.fromElPos = getOffset(el);
						ball.toElPos = this.$el.getBoundingClientRect();
						dropBalls.push(ball);
						break;
					}
				}
				this.promiseList.push(resolve);
			});
		},
		done() {
			const afterEnter = this.promiseList.shift();
			// eslint-disable-next-line no-unused-expressions
			afterEnter && afterEnter();
			this.$emit('after-enter');
		}
	},
	render() {
		try {
			return this.$slots.default[0];
		} catch (e) {
			warn('component must contain element');
			return null;
		}
	}
};
