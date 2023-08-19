<template>
	<view>
		
	</view>
</template>

<script setup lang="ts">
	import { computed, onMounted } from 'vue';
	import { onShow } from "@dcloudio/uni-app"
	import { useInterviewStore } from '@/stores';
	const interviewStore = useInterviewStore();
	const flowNavTitle = computed(() => interviewStore.flowNavTitle);
	
	// 自定义导航标题
	const customNavTitle = () => {
		uni.setNavigationBarTitle({
			title: flowNavTitle.value
		})
	}
	onMounted(async () => {
		customNavTitle()
	});
</script>

<style lang="scss" scoped>

</style>
