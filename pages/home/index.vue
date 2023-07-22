<template>
	<scroll-view style="height: 100vh;" scroll-y @scroll="handleScroll">
		<view class="top-banner"></view>
		<view class="page-container">
			<u-navbar :placeholder="false" :bgColor="navbarBgColor">
				<template #left>
					<view>
						<u-icon name="home" size="20"></u-icon>
					</view>
				</template>
				<template #center>
					<view>
						<u--input
							placeholder="请输入内容" 
							prefixIcon="search"
							border="surround" 
							shape="circle" 
							:readonly="true" 
							:prefixIconStyle="`font-size: 22px; color: ${textColor};`"
							:placeholderStyle="`color: ${textColor};`"
							:color="textColor"
							:customStyle="customStyle"
						></u--input>
					</view>
				</template>
			</u-navbar>

			<u-button type="warning" text="月落" @click="callVKFunction"></u-button>
			{{sumVal}}
			<text>{{navbar.top}}</text>
			{{storageData}}
			{{os}}
			<view style="height: 2000px;"></view>
		</view>
	</scroll-view>
</template>

<script lang="ts" setup>
	import { computed, onMounted, ref, reactive, toRefs } from 'vue';
	import { useGlobalAPI } from '@/hooks/useGlobalAPI'

	const { apiWrapper, config } = useGlobalAPI()
	const navbar = apiWrapper.navbar;

	const myData = reactive({
		sumVal: 0,
		storageData: '',
		capsultBottom: 0,
		customStyle: {
			height: '',
			marginRight: '40px',
		},
		navbarBgColor: 'transparent',
		textColor: '#fff',
	})
	const os = uni.$u.os()
	console.log(typeof os);
	const { sumVal, storageData, customStyle, capsultBottom, navbarBgColor, textColor } = toRefs(myData)

	// 微信小程序的胶囊信息
	const capsuleInfo = () => {
		const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
		const systemInfo = uni.getSystemInfoSync() || {};
		const capsuleHeight = menuButtonInfo.height;
		myData.customStyle.height = capsuleHeight + 'px';
		myData.capsultBottom = menuButtonInfo.bottom;
	}

	const handleScroll = async () => {
		await apiWrapper.getBoundingRect('.top-banner').then(res => {
			const { bottom } = res;
			if (bottom <= capsultBottom.value) {
				navbarBgColor.value = '#fff';
				textColor.value = '#000';
			} else {
				navbarBgColor.value = 'transparent';
				textColor.value = '#fff';
			}
		}).catch(error => {
			console.error('Error:', error);
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
			},
			fail: (error) => {
				console.error(error);
			}
		});
	};

	// 如果在组件外要是有这个方法，需要defineExpose导出
	defineExpose({
		callVKFunction,
	});
	onMounted(async () => {
		capsuleInfo()
	});
</script>

<style lang="scss" scoped>
	.top-banner {
		position: relative;
		height: 500rpx;
		background-color: #ffaa00;
	}
</style>