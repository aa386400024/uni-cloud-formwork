<template>
	<view class="page-container">
		<u-action-sheet :list="list" v-model="show"></u-action-sheet>
		<u-button type="warning" text="月落"></u-button>
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
	
	const show = ref(true);
	onMounted(async () => {
		
	});
</script>