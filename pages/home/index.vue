<template>
	<view class="page-container">
		<u-action-sheet :list="list" v-model="show"></u-action-sheet>
		<u-button type="warning" text="月落" @click="callVKFunction"></u-button>
	</view>
</template>

<script lang="ts" setup>
	import { computed, onMounted, ref } from 'vue';
	const list = ref([
		{
			text: '点赞',
			color: 'blue',
			fontSize: 28
		}, 
		{
			text: '分享'
		}, 
		{
			text: '评论'
		}
	]);
	const callVKFunction = () => {
		vk.callFunction({
			url: 'client/pub.user.calc',
			title: '请求中...',
			data: {
				x: 2,
				y: 4
			},
			success: (data) => {
				// 在这里处理成功的响应
			}
		});
	};
	const show = ref(true);
	defineExpose({
		callVKFunction
	});
	onMounted(async () => {
		
	});
</script>