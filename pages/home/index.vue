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
			<custom-gap></custom-gap>
			<u-tabs
				:list="tabsList"
				lineWidth="20"
				lineHeight="7"
				:lineColor="`url(${lineBg}) 100% 100%`"
				:activeStyle="{
					color: '#303133',
					fontWeight: 'bold',
					transform: 'scale(1.05)'
				}"
				:inactiveStyle="{
					color: '#606266',
					transform: 'scale(1)'
				}"
				itemStyle="padding-left: 15px; padding-right: 15px; height: 34px;"
				@click="handleTabClick"
			>
				<template #right>
					<view
						style="padding-left: 4px;"
						@tap="$u.toast('插槽被点击')"
					>
						<u-icon
								name="list"
								size="21"
								bold
						></u-icon>
					</view>
				</template>
			</u-tabs>
			<u-gap :height="globalVariables.gapHeight" :bgColor="globalVariables.gapBgcolor"></u-gap>
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
	import { computed, onMounted, ref, reactive, toRefs, inject } from 'vue';
	import { useGlobalAPI } from '@/hooks/useGlobalAPI'

	const { apiWrapper, config } = useGlobalAPI()
	const navbar = apiWrapper.navbar;
	const globalVariables = inject('globalVariables');

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
		tabsList: [
			{
				name: '行业名称', // 行业名称
				name_en: 'Industry Name', // 行业名称的英文
				description: '行业描述', // 行业描述
				icon: '行业图标的URL', // 行业图标的URL
				jobs: [ // 行业下的职业列表
					{
						name: '职业名称', // 职业名称
						name_en: 'Job Name', // 职业名称的英文
						description: '职业描述', // 职业描述
						icon: '职业图标的URL', // 职业图标的URL
						interviewPage: '面试页面的URL或者标识', // 面试页面的URL或者标识
						// 可能还有其他属性
					},
					// 更多职业...
				],
			},
			{ name: '推荐', badge: { isDot: true }}, 
			{ name: '电影', }, 
			{ name: '科技' },
			{ name: '音乐' }, 
			{ name: '美食' },
			{ name: '文化' }, 
			{ name: '财经' },
			{ name: '手工' },
		],
		gapBgColor: '$uni-color-error'
	})
	const os = uni.$u.os()
	console.log(typeof os);
	const { sumVal, storageData, customStyle, capsultBottom, navbarBgColor, textColor, tabsList, gapBgColor } = toRefs(myData)
	const lineBg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAOCAYAAABdC15GAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFxSURBVHgBzZNRTsJAEIb/WTW+lpiY+FZPIDew3ABP4GJ8hxsI9zBpOYHeQDwBPQI+mRiRvpLojtPdYhCorQqF/6GdbGd2vvwzBXZcNAt4oj1ANeUoAT5iqkUjbEFLHNmhD1YPEvpZ3ghkGlVDCkc94/BmHMq998I5ONiY1ZBfpKAyuOtgAc5yOEDmYEWNh32BHF91sGHZHmwW4azciN9aQwnz3SJEgOmte+R2tdLprTYoa50mvuomlLpD4Y3oQZnov6D2RzCqI93bWOHaEmAGqQUyRBlZR1WfarcD/EJ2z8DtzDGvsMCwpm8XOCfDUsVOCYhiqRxI/CTQo4UOvjzO7Pow18vfywneuUHHUUxLn55lLw5JFpZ8bEUcY8oXdOLWiHLTxvoGpLqoUmy6dBT15o/ox3znpoycAmxUsiJTbs1cmxeVKp+0zmFIS7bGWiVghC7Vwse8jFKAX9eljh4ggKLLv7uaQvG9/F59Oo2SouxPu7OTCxN/s8wAAAAASUVORK5CYII=";

	const handleTabClick = (item) => {
	    console.log('当前选中的行业:', item.name);
	    // 在这里你可以根据选中的行业获取对应的职业数据
	}

	
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