# 快速开始

## @hyhello/vue-ball

@hyhello/vue-ball 基于 vue2.0 的购物车动画。

## Examples

[codepen.io](https://codepen.io/vue-book/pen/VwMZJJE)

## Use Setup

### install @hyhello/vue-ball

```javascript
npm install @hyhello/vue-ball --save
```

### Vue mount

```vuejs
// global use
import Vue from 'vue';
import vueBall from '@hyhello/vue-ball';

// use  @params：支持 options 全局配置, 默认：{ zIndex: 2000 }
Vue.use(vueBall, [options]);

// or Local use
import { Ball } from '@hyhello/vue-ball';

// 配置zIndex， 默认为2000
Ball.configure(options);

export default {
    components: { Ball }
};
```

### Use in SPA

```html
<style>
	html,
	body,
	.app {
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
		background-color: blue;
	}
	.c-btn {
		position: fixed;
		top: 20%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.chat {
		position: fixed;
		bottom: 30px;
		right: 30px;
	}

	.chat-icon {
		font-size: 45px;
	}

	.is-heartBeat {
		animation-name: heartBeat;
		animation-duration: 1s;
		animation-timing-function: ease-in-out;
	}

	@keyframes heartBeat {
		0% {
			-webkit-transform: scale(1);
			transform: scale(1);
		}

		14% {
			-webkit-transform: scale(1.3);
			transform: scale(1.3);
		}

		28% {
			-webkit-transform: scale(1);
			transform: scale(1);
		}

		42% {
			-webkit-transform: scale(1.3);
			transform: scale(1.3);
		}

		70% {
			-webkit-transform: scale(1);
			transform: scale(1);
		}
	}
</style>
<template>
	<div class="app">
		<el-button type="primary" class="c-btn" @click="action">
			<i class="el-icon-shopping-cart-full"></i>
			加入购物车
		</el-button>
		<vue-ball ref="ball" :duration="600" @after-enter="afterEnter">
			<el-card class="chat">
				<div class="chat-icon" :class="{'is-heartBeat': heartBeat}" @animationend="transitioned">
					<i class="el-icon-shopping-cart-full"></i>
				</div>
			</el-card>
			<i slot="icon" class="el-icon-shopping-cart-full"></i>
		</vue-ball>
	</div>
</template>
<script>
	import { Button: ElButton, Message } from 'element-ui';
	import { Ball as vueBall } from '@hyhello/vue-ball';

	// *******此处可设置 zIndex，默认zIndex： 2000
	// vueBall.configure({
	//     zIndex: 2000
	// });

	export default {
	    components: { vueBall, ElButton },
	    data () {
	        return {
	            heartBeat: false
	        };
	    },
	    methods: {
	        // 加入球之后
	        transitioned() {
	            this.heartBeat = false;
	        },
	        // 此处为使用入口
	        action(ev) {
	            // action 返回的是Promise， resolve结果跟afterEnter效果一致
	            this.$refs.ball.action(ev.target).then(() => {
	                this.heartBeat = true;
	                Message.success('成功加入购物车！');
	            });
	        },
	        // 求进入后
	        afterEnter() {
	            console.log('成功加入购物车!');
	        }
	    }
	}
</script>
```

以上代码运行效果如下（如果查看不了，请下载包，点击里面 demo.gif 即可）：

![demo.gif](https://github.com/Hyhello/vue-ball/blob/master/demo.gif)

## Api

### Attributes

| 参数     | 说明                 | 类型   | 可选值 | 默认值                                |
| -------- | -------------------- | ------ | ------ | ------------------------------------- |
| ballNums | 允许运动的球的总数   | number | —      | 5                                     |
| duration | 球运动持续时长(毫秒) | number | —      | 1000                                  |
| easing   | 控制球运动的动画函数 | string | —      | cubic-bezier(0.49, -0.35, 0.75, 0.41) |

### Events

| 事件名      | 说明             | 回调参数 |
| ----------- | ---------------- | -------- |
| after-enter | 球运动完成后触发 | -        |

### Slots

| 名称 | 说明     |
| ---- | -------- |
| icon | 自定义球 |
