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
							:prefixIconStyle="prefixIconStyle"
							:placeholderStyle="`color: ${placeholderStyle};`"
							:color="inputTextColor" 
							:customStyle="customStyle"
						></u--input>
					</view>
				</template>
			</u-navbar>

			<u-button type="warning" text="月落" @click="callVKFunction"></u-button>
			<u-button @click="clickHandler">获取存储</u-button>
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
		inputTextColor: '#fff',
		prefixIconStyle: { fontSize: '22px', color: '#fff' },
		placeholderStyle: '#fff'
	})
	const os = uni.$u.os()
	console.log(typeof os);
	const { sumVal, storageData, customStyle, capsultBottom, navbarBgColor, prefixIconStyle, placeholderStyle, inputTextColor } = toRefs(myData)

	// 微信小程序的胶囊信息
	const capsuleInfo = () => {
		const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
		const systemInfo = uni.getSystemInfoSync() || {};
		const capsuleHeight = menuButtonInfo.height;
		myData.customStyle.height = capsuleHeight + 'px';
		myData.capsultBottom = menuButtonInfo.bottom;
	}

	const clickHandler = async () => {
		await apiWrapper.getBoundingRect('.navbar').then(res => {
			console.log(res, 'aaaaa');
		}).catch(error => {
			console.error('Error:', error);
		});
	}

	const handleScroll = async () => {
		console.log('aaaaa')
		await apiWrapper.getBoundingRect('.top-banner').then(res => {
			const { bottom } = res;
			if (bottom <= capsultBottom.value) {
				navbarBgColor.value = '#fff';
				inputTextColor.value = "#000";
				placeholderStyle.value = '#000';
				prefixIconStyle.value.color = '#000';
			} else {
				navbarBgColor.value = 'transparent';
				inputTextColor.value = "#fff";
				placeholderStyle.value = '#fff';
				prefixIconStyle.value.color = '#fff';
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
		clickHandler
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