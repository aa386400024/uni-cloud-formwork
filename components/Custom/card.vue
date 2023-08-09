<template>
	<view class="card padding-md margin-bottom-md" @click="handleClick">
		<image class="card-image margin-right-md" :src="position.img" />
		<view class="card-content">
			<view class="card-title margin-bottom-xs">{{ position.name }}</view>
			<view class="card-description margin-bottom-xs">{{ position.description }}</view>
			<view class="card-interviews">
				<image class="margin-right-xs" src="/static/interview-icon.png" />
				<text>{{ position.interviewed_count }} 模拟面试</text>
			</view>
		</view>
	</view>
</template>

<script lang="ts" setup>
	import { defineProps } from 'vue';

	// 定义props
	const props = defineProps({
		position: Object,
	});

	// 定义emit
	const emits = defineEmits(["click"]);

	const handleClick = () => {
		emits('click', props.position);
	};
</script>

<style lang="scss" scoped>
	@import '@/common/css/mixins.scss'; // 导入你的mixin文件

	.card {
		@include flex-layout('start');
		border: 1px solid #eee;
		border-radius: 20rpx;
		background-color: #fff;

		.card-image {
			width: 180rpx;
			height: 180rpx;
		}

		.card-content {
			flex: 1;
			flex-direction: column;

			.card-title {
				font-size: 18px;
				font-weight: bold;
			}

			.card-description {
				font-size: 14px;
				color: #666;
			}

			.card-interviews {
				@include flex-layout('start');

				image {
					width: 16px;
					height: 16px;
				}
			}
		}
	}
</style>