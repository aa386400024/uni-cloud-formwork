<template>
	<view :style="{minHeight: windowHeight + 'px', backgroundColor: '#f3f4f6'}">
		<view class="img-body">
			<u-image :showLoading="false" :src="customUrl" :width="customImgWidth" mode="aspectFit"></u-image>
		</view>
		<view class="page-custom">
			<view class="style-body border-radius-large margin-bottom-lg">
				<view class="title">面试风格</view>
				<view class="style-tag">
					<view class="tag-item margin-right-xl" v-for="(item, index) in styleRadios" :key="index">
						<u-tag 
							:text="item.name" 
							:plain="!item.checked" 
							size="large" 
							type="warning" 
							:name="index"
							@click="styleRadioClick"
						>
						</u-tag>
					</view>
				</view>
			</view>
			<view class="level-body border-radius-large margin-bottom-lg">
				<view class="title">面试难度</view>
				<view class="level-tag">
					<view class="tag-item margin-right-xl" v-for="(item, index) in levelRadios" :key="index">
						<u-tag 
							:text="item.name" 
							:plain="!item.checked" 
							size="large" 
							type="warning" 
							:name="index"
							@click="levelRadioClick"
						>
						</u-tag>
					</view>
				</view>
			</view>
			<view class="skill-body border-radius-large">
				<view class="title">技术栈</view>
				<view class="skill-tag">
					<view class="margin-right-xl margin-bottom-lg" v-for="(item, index) in skillRadios" :key="index">
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
	</view>
</template>

<script setup lang="ts">
	import { reactive, toRefs, computed, onMounted } from 'vue';
	const myData = reactive({
		customUrl: 'https://mp-43f7552d-29af-4d0a-8672-7a2fcdd00dc7.cdn.bspapp.com/interview/custom-interview-subject.png',
		customImgWidth: 0,
		windowHeight: 0,
		styleRadios: [
			{ checked: true, name: '技术面' },
			{ checked: false, name: '行为面' },
			{ checked: false, name: '混合面' }
		],
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
	const { 
		customUrl, 
		windowHeight,
		customImgWidth, 
		styleRadios,
		levelRadios, 
		skillRadios, 
		interviewBtnCustomStyle 
	} = toRefs(myData)
	
	// 获取当前设备宽度
	const setCustomImgWidth = () => {
		const systemInfo = uni.getSystemInfoSync();
		windowHeight.value = systemInfo.safeArea!.height;
		customImgWidth.value = systemInfo.safeArea!.width
	}
	
	// 面试风格tag点击事件
	const styleRadioClick = (name: number) => {
		styleRadios.value.forEach((item, index) => {
		    item.checked = index === name;
		});
	}
	
	// 面试难度tag点击事件
	const levelRadioClick = (name: number) => {
		levelRadios.value.forEach((item, index) => {
		    item.checked = index === name;
		});
	}
	
	// 技术栈tag点击事件
	const skillRadiosClick = (name: number) => {
		skillRadios.value[name].checked = !skillRadios.value[name].checked;
	};
	
	const startInterviewClick = () => {
		vk.navigateTo('/pages_template/interview/flow/flow');
	}
	
	onMounted(async () => {
		setCustomImgWidth()
	});
</script>

<style lang="scss" scoped>
	@import '@/common/css/mixins.scss';
	.page-custom {
		padding: 30rpx !important;
		.style-body, .level-body, .skill-body {
			background-color: #fff;
			.title {
				font-size: 34rpx;
				font-weight: 500;
				padding: 30rpx 40rpx;
			}
			.style-tag, .level-tag, .skill-tag {
				@include flex-layout(start, row);
				flex-wrap: wrap;
				padding: 0 40rpx 40rpx;
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
