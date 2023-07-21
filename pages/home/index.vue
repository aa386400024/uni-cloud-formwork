<template>
	<top-nav-bar :show="true" title="首页"></top-nav-bar>
	<view class="page-container">
		<u-action-sheet :list="list" v-model="show"></u-action-sheet>
		<u-button type="warning" text="月落" @click="callVKFunction"></u-button>
		<u-button @click="clickHandler('myKey')">获取存储</u-button>
		{{sumVal}}
		<text>{{navbar}}</text>
		{{storageData}}
		{{os}}
	</view>
</template>

<script lang="ts" setup>
	import { computed, onMounted, ref, reactive, toRefs } from 'vue';
	import TopNavBar from '@/components/Custom/TopNavBar.vue';
	import { useGlobalAPI } from '@/hooks/useGlobalAPI'

	const { apiWrapper, config } = useGlobalAPI()
	const navbar = apiWrapper.navbar;

	const myData = reactive({
		list: [
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
		],
		show: true,
		sumVal: 0,
		storageData: ''
	})
	const os = uni.$u.os()
	console.log(typeof os);
	const { list, show, sumVal, storageData } = toRefs(myData)

	const clickHandler = () => {
		const selector = '.page-container';
		apiWrapper.getBoundingRect(selector, (res) => {
			// 在这里处理位置信息，可以使用res.left, res.top, res.width, res.height等属性
			console.log('Element position:', res);
		}); 
	} 

	const callVKFunction = () => {
		uni.vk.callFunction<{ x : number; y : number; }, { z : number; }>({
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
		callVKFunction,
		clickHandler
	});
	onMounted(async () => {

	});
</script>