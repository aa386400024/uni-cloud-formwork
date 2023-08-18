<template>
	<scroll-view enable-flex style="height: 100vh;" scroll-y @scroll="handleScroll">
		<view class="top-banner"></view>
		<u-sticky v-if="offsetTop || platform === 'h5'" :offsetTop="offsetTop" bgColor="#fff">
			<u-tabs
				:list="industriesList"
				lineWidth="20"
				lineHeight="7"
				:lineColor="`url(${lineBg}) 100% 100%`"
				:activeStyle="activeStyle"
				:inactiveStyle="inactiveStyle"
				:itemStyle="itemStyle"
				@click="handleTabClick"
			>
				<template #right>
					<view
						style="padding-left: 4px; margin-right: 4px;"
						@tap="$u.toast('插槽被点击')"
					>
						<u-icon
							name="list"
							size="24"
							bold
						></u-icon>
					</view>
				</template>
			</u-tabs>
		</u-sticky>
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
			<job-card
				class="margin-bottom-md job-card"
				v-for="(item, index) in positions"
				:key="index"
				:position="item"
				@click="goToInterview"
			></job-card>
			
			<custom-gap></custom-gap>
			
		</view>
		<u-popup
			mode="bottom" 
			round="10"
			:show="showPopup" 
			:customStyle="popupCustomStyle"
			@close="closePopup" 
			@open="openPopup"
		>
			<view class="drawer-container">
				<!-- 抽屉头部 -->
				<view class="drawer-header">
					<text class="title">权限请求</text>
					<text @click="closePopup" class="close-btn">关闭</text>
				</view>
				
				<!-- 抽屉主体 -->
				<view class="drawer-body">
					<text class="description">为了确保模拟面试过程中的通信质量，我们需要以下权限：</text>
					
					<!-- 权限列表 -->
					<view class="permission-item" v-for="permission in permissions" :key="permission.type">
						<image :src="permission.icon" class="permission-icon"></image>
						<text class="permission-title">{{ permission.title }}</text>
						<image :src="permission.granted ? 'path/to/green-check-icon.png' : 'path/to/red-cross-icon.png'" class="status-icon"></image>
						<button v-if="!permission.granted" @click="requestPermission(permission.type)">请求权限</button>
					</view>
				</view>
				
				<!-- 抽屉底部 -->
				<view class="drawer-footer">
					<u-button v-if="allPermissionsGranted" @click="startMockInterview" text="开始模拟面试"></u-button>
					<u-button v-else @click="requestAllPermissions" text="一键授权"></u-button>
					<u-button @click="closeDrawer" text="稍后"></u-button>
				</view>
			</view>
		</u-popup>
	</scroll-view>
</template>

<script lang="ts" setup>
	import { onMounted, reactive, toRefs, computed } from 'vue';
	import { useGlobalAPI } from '@/hooks/useGlobalAPI'
	import { fetchIndustries, fetchPositions } from '@/api/home';
	import JobCard from '@/components/custom/card.vue';
	const { apiWrapper } = useGlobalAPI()

	const myData = reactive({
		capsultBottom: 0,
		offsetTop: 0,
		customStyle: {
			height: '',
			marginRight: '40px',
		},
		navbarBgColor: 'transparent',
		textColor: '#fff',
		industriesList: [],
		activeStyle: {
			color: '#303133',
			fontWeight: 'bold',
			transform: 'scale(1.2)'
		},
		inactiveStyle: {
			color: '#606266',
			transform: 'scale(1.1)'
		},
		itemStyle: {
			paddingLeft: '15px', 
			paddingRight: '15px', 
			height: '36px',
		},
		positions: [],
		platform: uni.$u.platform, // 获取当前运行的平台名称
		showPopup: false,
		popupCustomStyle: {
			backgroundColor: "#fff"
		},
		permissions: [
			{ type: 'microphone', title: '麦克风', granted: false, icon: 'path/to/mic-icon.png' },
			{ type: 'camera', title: '摄像头', granted: false, icon: 'path/to/camera-icon.png' },
			{ type: 'network', title: '网络', granted: true, icon: 'path/to/network-icon.png' } // 根据实际情况调整
		]
	})
	const {
		customStyle, 
		capsultBottom, 
		offsetTop,
		navbarBgColor, 
		textColor, 
		industriesList,
		activeStyle,
		inactiveStyle,
		itemStyle,
		positions,
		platform,
		showPopup,
		popupCustomStyle,
		permissions
	} = toRefs(myData)
	const lineBg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAOCAYAAABdC15GAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFxSURBVHgBzZNRTsJAEIb/WTW+lpiY+FZPIDew3ABP4GJ8hxsI9zBpOYHeQDwBPQI+mRiRvpLojtPdYhCorQqF/6GdbGd2vvwzBXZcNAt4oj1ANeUoAT5iqkUjbEFLHNmhD1YPEvpZ3ghkGlVDCkc94/BmHMq998I5ONiY1ZBfpKAyuOtgAc5yOEDmYEWNh32BHF91sGHZHmwW4azciN9aQwnz3SJEgOmte+R2tdLprTYoa50mvuomlLpD4Y3oQZnov6D2RzCqI93bWOHaEmAGqQUyRBlZR1WfarcD/EJ2z8DtzDGvsMCwpm8XOCfDUsVOCYhiqRxI/CTQo4UOvjzO7Pow18vfywneuUHHUUxLn55lLw5JFpZ8bEUcY8oXdOLWiHLTxvoGpLqoUmy6dBT15o/ox3znpoycAmxUsiJTbs1cmxeVKp+0zmFIS7bGWiVghC7Vwse8jFKAX9eljh4ggKLLv7uaQvG9/F59Oo2SouxPu7OTCxN/s8wAAAAASUVORK5CYII=";

	const allPermissionsGranted = computed(() => {
		return permissions.value.every(permission => permission.granted);
	});
	const handleTabClick = (item: any) => {
	    console.log('当前选中的行业:', item);
		const data = {
			industry_id: item.industry_id
		}
	    fetchPositionApi(data)
	}
	
	// 获取行业数据
	const fetchIndustriesApi = async () => {
		try {
			const res = await fetchIndustries();
			industriesList.value = res.rows || []
		} catch (error) {
			console.error('Error during fetchTodosCloud:', error);
			// 可以在这里添加更多的错误处理逻辑，比如设置一个标志，让用户知道出现了错误
		}
	};
	
	// 获取职位数据
	const fetchPositionApi = async (data: any) => {
		try {
			const res = await fetchPositions(data);
			positions.value = res.rows || []
		} catch (error) {
			console.error('Error during fetchTodosCloud:', error);
			// 可以在这里添加更多的错误处理逻辑，比如设置一个标志，让用户知道出现了错误
		}
	};
	
	// 微信小程序的胶囊信息
	const capsuleInfo = () => {
		const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
		const systemInfo = uni.getSystemInfoSync() || {};
		const capsuleHeight = menuButtonInfo.height;
		customStyle.value.height = capsuleHeight + 'px';
		capsultBottom.value = menuButtonInfo.bottom;
		offsetTop.value = systemInfo.statusBarHeight! + capsuleHeight + 6
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
	
	// 跳转到面试页
	const goToInterview = (job) => {
		console.log('job', job)
		showPopup.value = true
	  // 这里添加跳转到模拟面试页面的代码
	  // 你可以使用job参数来获取被点击的职位的信息
	}
	
	// 关闭弹出层
	const closePopup = () => {
		showPopup.value = false
	}
	
	// 开启弹出层
	const openPopup = () => {
		
	}
	
	// 请求权限
	const requestPermission = (type: string) => {
		// 这里，你可以调用API来请求特定类型的权限，并更新`permissions`数组。
		// 假设请求成功，你可以做如下操作：
		const permission = permissions.value.find(p => p.type === type);
		if (permission) permission.granted = true;
	};
	
	// 一键授权
	const requestAllPermissions = () => {
		// 这里，你可以调用API来请求所有权限，并更新`permissions`数组。
		// 假设请求成功，你可以做如下操作：
		permissions.value.forEach(permission => permission.granted = true);
	};

	// 稍后授权
	const closeDrawer = () => {
		closePopup();
	};
	
	// 当所有权限都授予时，开始模拟面试
	const startMockInterview = () => {
		// 这里，你可以开始模拟面试的操作。
		// 确保所有必要的权限都已授予。
		console.log("Starting mock interview...");
	};
	
	onMounted(async () => {
		// #ifdef MP-WEIXIN
		capsuleInfo()
		// #endif
		
		fetchIndustriesApi().then(() => {
			const data = {
				industry_id: '001'
			}
			fetchPositionApi(data)
		})
	});
</script>

<style lang="scss" scoped>
	.top-banner {
		position: relative;
		height: 500rpx;
		background-color: #ffaa00;
	}
	.drawer-container {
	    width: 100%;
	    height: auto;  // 根据实际需要调整
	    background-color: #fff;
	
	    .drawer-header {
	        display: flex;
	        justify-content: space-between;
	        align-items: center;
	        padding: 10px;
	        background-color: #f5f5f5;
	
	        .title {
	            font-weight: bold;
	        }
	
	        .close-btn {
	            color: #999;
	        }
	    }
	
	    .drawer-body {
	        padding: 20px;
	
	        .description {
	            margin-bottom: 20px;
	        }
	
	        .permission-item {
	            display: flex;
	            align-items: center;
	            justify-content: space-between;
	            padding: 10px 0;
	            border-bottom: 1px solid #eee;
	
	            .permission-icon {
	                width: 24px;
	                height: 24px;
	            }
	
	            .permission-title {
	                flex: 1;
	                margin-left: 10px;
	            }
	
	            .status-icon {
	                width: 20px;
	                height: 20px;
	                margin-right: 10px;
	            }
	        }
	    }
	
	    .drawer-footer {
	        padding: 20px;
	        display: flex;
	        justify-content: space-between;
	
	        button {
	            padding: 10px 20px;
	            background-color: #007AFF;
	            color: white;
	            border: none;
	            border-radius: 5px;
	        }
	    }
	}
</style>