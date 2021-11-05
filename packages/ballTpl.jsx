/**
 * 作者：Hyhello
 * 时间：2021-01-20
 * 描述：ballTpl
 */

const CLASS_PREFIX = '__PREFIX__-ball';

const INNER_CLASS = `.${CLASS_PREFIX}__inner`;

export default {
	name: 'Ball',
	data() {
		return {
			dropBalls: []
		};
	},
	beforeDestroy() {
		this.dropBalls = [];
	},
	methods: {
		beforeEnter(el) {
			let count = this.balls.length;
			const inner = el.querySelector(INNER_CLASS);
			while (count--) {
				const ball = this.balls[count];
				if (ball.show && !ball.animate) {
					ball.animate = true;
					const { left, top } = ball.fromElPos;
					el.style.display = '';
					el.style.webkitTransform = `translate3d(0, ${top}px, 0)`;
					el.style.transform = `translate3d(0, ${top}px, 0)`;
					inner.style.webkitTransform = `translate3d(${left}px, 0, 0)`;
					inner.style.transform = `translate3d(${left}px, 0, 0)`;
				}
			}
		},
		enter(el, done) {
			const len = this.dropBalls.length;
			const ball = this.dropBalls[len - 1];
			/* eslint-disable no-unused-vars */
			const offsetH = el.offsetHeight;
			const inner = el.querySelector(INNER_CLASS);
			const duration = this.duration / 1000;
			const { easing } = this;
			this.$nextTick(() => {
				const rect = ball.toElPos;
				const inRect = {
					width: inner.offsetWidth,
					height: inner.offsetHeight
				};
				const left = rect.left + (rect.width - inRect.width) / 2;
				const top = rect.top + (rect.height - inRect.height) / 2;
				el.style.webkitTransform = `translate3d(0, ${top}px,0)`;
				el.style.transform = `translate3d(0, ${top}px,0)`;
				el.style.transition = `all ${duration}s ${easing}`;
				inner.style.transition = `all ${duration}s linear`;
				inner.style.webkitTransform = `translate3d(${left}px, 0,0)`;
				inner.style.transform = `translate3d(${left}px, 0,0)`;
				el.ontransitionend = done;
			});
		},
		afterEnter(el) {
			const ball = this.dropBalls.shift();
			if (ball) {
				// eslint-disable-next-line no-multi-assign
				ball.animate = ball.show = false;
				el.style.display = 'none';
				this.done();
			}
		}
	},
	render() {
		const { balls, beforeEnter, enter, afterEnter, $slots } = this;
		return (
			<div class={CLASS_PREFIX} role="alert" tabindex="-1" aria-hidden="true">
				{balls.map((ball, key) => (
					<transition
						name="ball"
						key={key}
						onBeforeEnter={beforeEnter}
						onEnter={enter}
						onAfterEnter={afterEnter}
						type="transition"
					>
						<div
							class={[`${CLASS_PREFIX}__outer`]}
							{...{ directives: [{ name: 'show', value: ball.show }] }}
						>
							<div class={[`${CLASS_PREFIX}__inner`]}>{$slots.default}</div>
						</div>
					</transition>
				))}
			</div>
		);
	}
};
