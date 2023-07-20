<template>
	<top-nav-bar :show="true" title="首页"></top-nav-bar>
	<view class="page-container">
		<u-action-sheet :list="list" v-model="show"></u-action-sheet>
		<u-button type="warning" text="月落" @click="callVKFunction"></u-button>
		
		{{sumVal}}
		<text>{{$myApi}}</text>
	</view>
</template>

<script lang="ts" setup>
	import { computed, onMounted, ref } from 'vue';
	import TopNavBar from '@/components/Custom/TopNavBar.vue';
	import { useGlobalProperties } from '@/hooks/useGlobalProperties';
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
	const sumVal = ref(null);
	const { $myApi } = useGlobalProperties()
	
	 console.log($myApi, 'globalPropsglobalProps')
	
	const callVKFunction = () => {
		vk.callFunction<{ x: number; y: number; }, { z: number; }>({
		    url: 'client/pub.user.calc',
		    title: '请求中...',
		    data: {
		        x: 1,
		        y: 2
		    },
		    success: (data) => {
		        const { z } = data;
		        sumVal.value = z;
		    }
		});
	};
	
	// 如果在组件外要是有这个方法，需要defineExpose导出
	defineExpose({
		callVKFunction
	});
	onMounted(async () => {
		
	});
</script>