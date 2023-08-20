<template>
	<view>
		面试过程
	</view>
</template>

<script setup lang="ts">
	import { reactive, toRefs, computed, onMounted } from 'vue';
	import { onShow } from "@dcloudio/uni-app"
	import { useInterviewStore } from '@/stores';
	const interviewStore = useInterviewStore();
	const flowNavTitle = computed(() => interviewStore.flowNavTitle);
	const myData = reactive({
		
	})
	const { 
		
	} = toRefs(myData)
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
	@import '@/common/css/mixins.scss';
	
</style> 
