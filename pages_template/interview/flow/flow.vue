<template>
	<view class="img-body">
		<u-image :showLoading="false" :src="customUrl" :width="customImgWidth" mode="aspectFit"></u-image>
	</view>
	<view class="page-container page-custom">
		<view class="level-body border-radius-large margin-bottom-xl">
			<view class="title">选择难度</view>
			<view class="level-tag">
				<view class="tag-item margin-right-xl" v-for="(item, index) in levelRadios" :key="index">
					<u-tag 
						:text="item.name" 
						:plain="!item.checked" 
						size="large" 
						type="warning" 
						:name="index"
						@click="radioClick"
					>
					</u-tag>
				</view>
			</view>
		</view>
		<view class="skill-body border-radius-large">
			<view class="title">选择技术栈</view>
			<view class="skill-tag">
				<view class="tag-item margin-right-xl margin-bottom-lg" v-for="(item, index) in skillRadios" :key="index">
					<u-tag 
						:text="item.name" 
						:plain="!item.checked" 
						size="large" 
						type="warning" 
						:name="index"
						@click="skillRadiosClick"
					>
					</u-tag>
				</view>
			</view>
		</view>
		<view class="start-interview-body">
			<u-button 
				shape="circle" 
				type="primary" 
				size="large" 
				text="开始面试"
				:customStyle="interviewBtnCustomStyle"
				@click="startInterviewClick" 
			></u-button>
		</view>
	</view>
</template>

<script setup lang="ts">
	import { reactive, toRefs, computed, onMounted } from 'vue';
	import { onShow } from "@dcloudio/uni-app"
	import { useInterviewStore } from '@/stores';
	const interviewStore = useInterviewStore();
	const flowNavTitle = computed(() => interviewStore.flowNavTitle);
	const myData = reactive({
		customUrl: 'https://mp-43f7552d-29af-4d0a-8672-7a2fcdd00dc7.cdn.bspapp.com/interview/custom-interview-subject.png',
		customImgWidth: 0,
		levelRadios: [
			{ checked: true, name: '初级' },
			{ checked: false, name: '中级' },
			{ checked: false, name: '高级' }
		],
		skillRadios: [
			{ checked: true, name: 'html' },
			{ checked: false, name: 'css' },
			{ checked: false, name: 'javascript' },
			{ checked: false, name: 'vue' },
			{ checked: false, name: 'react' },
			{ checked: false, name: 'angular' },
			{ checked: false, name: 'webpack' },
			{ checked: false, name: 'vite' },
		],
		interviewBtnCustomStyle: {
			fontSize: "20px !important"
		}
	})
	const { customUrl, customImgWidth, levelRadios, skillRadios, interviewBtnCustomStyle } = toRefs(myData)
	// 自定义导航标题
	const customNavTitle = () => {
		uni.setNavigationBarTitle({
			title: flowNavTitle.value
		})
	}
	
	// 获取当前设备宽度
	const setCustomImgWidth = () => {
		const systemInfo = uni.getSystemInfoSync();
		customImgWidth.value = systemInfo.windowWidth
	}
	
	const radioClick = (name: number) => {
		levelRadios.value.forEach((item, index) => {
		    item.checked = index === name;
		});
	}
	
	const skillRadiosClick = (name: number) => {
		skillRadios.value[name].checked = !skillRadios.value[name].checked;
	};
	
	const startInterviewClick = () => {
		
	}
	
	onMounted(async () => {
		setCustomImgWidth()
		customNavTitle()
	});
</script>

<style lang="scss" scoped>
	@import '@/common/css/mixins.scss';
	.img-body {
		background-color: $uni-bg-color;
	}
	.page-custom {
		height: auto !important;
		padding: 40rpx !important;
		.level-body, .skill-body {
			background-color: #fff;
			.title {
				font-size: 34rpx;
				font-weight: 500;
				padding: 40rpx 40rpx 30rpx;
			}
			.level-tag, .skill-tag {
				@include flex-layout(start, row);
				flex-wrap: wrap;
				padding: 0 40rpx 40rpx;
				.tag-item {
					
				}
			}
			.skill-tag {
				padding-bottom: 10rpx !important;
			}
		}
		.start-interview-body {
			margin-top: 40rpx;
		}
	}
	
	
</style> 
