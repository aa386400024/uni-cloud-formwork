<template>
	<view class="top-nav padding-md">
		<view class="user-info" :style="{paddingTop: offsetTop + 'px'}">
			<view class="left">
				<u-avatar
					v-if="hasLogin&&userInfo.avatar_file&&userInfo.avatar_file.url"
					:src="userInfo.avatar_file.url"
				></u-avatar>
				<u-avatar size="45"></u-avatar>
				<view class="logo-title">
					<view v-if="hasLogin">
						<text class="uer-name" v-if="hasLogin">{{userInfo.nickname||userInfo.username||userInfo.mobile}}酷酷的张大炮</text>
						<text class="iconfont icon-VIP1 not-logged-prompt margin-top-xs"> 开通会员，享受更多特权！</text>
					</view>
					<view v-else>
						<text class="uer-name" >{{$t('mine.notLogged')}}</text>
						<text class="not-logged-prompt margin-top-xs">登录后可体验更多服务 > </text>
					</view>
				</view>
			</view>
			<view class="right">
				>
			</view>
		</view>
		<view class="stats-container">
		    <view class="stat-item" v-for="stat in stats" :key="stat.id" @click="handleStatClick(stat)">
		        <text class="stat-number">{{ stat.number }}</text>
		        <text class="stat-description">{{ stat.description }}</text>
		    </view>
		</view>
		<view class="membership-container" @click="openMembership">
		    <text>开通会员</text>
		    <text>享受更多特权！</text>
		</view>

	</view>
	<view class="page-container">
		<uni-sign-in ref="signIn"></uni-sign-in>
		  
	</view>
</template>

<script lang="ts" setup>
	import { onMounted, reactive, toRefs, computed } from 'vue';
	import { store as storeOriginal, mutations } from '@/uni_modules/uni-id-pages/common/store.js';
	const myData = reactive({
		offsetTop: 0,
		stats: [
			{ id: 1, number: 10, description: '面试次数' },
			{ id: 2, number: 85, description: '平均得分' },
			{ id: 3, number: 5, description: '连续学习' },
			{ id: 4, number: 3, description: '邀请好友' }
		]
	})
	const { offsetTop, stats } = toRefs(myData)
	const { userInfo, hasLogin } = toRefs(storeOriginal);
	console.log(userInfo, hasLogin, 'userInfo, hasLoginuserInfo, hasLogin')
	
	// 微信小程序获取胶囊区域距离顶部的位置
	const capsuleInfo = () => {
		const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
		const systemInfo = uni.getSystemInfoSync() || {};
		const capsuleHeight = menuButtonInfo.height;
		offsetTop.value = systemInfo.statusBarHeight! + capsuleHeight + 2
	}
	
	const handleStatClick = (stat: Stat) => {
		console.log('Clicked on:', stat.description);
		// 在这里，你可以根据点击的统计项执行其他操作，例如导航到另一个页面、显示详细信息等。
	}
	
	const openMembership = () => {
	    // 使用uni.navigateTo或者其他方式来导航到会员开通页面
	    // 如: uni.navigateTo({url: '/pages/membership/membership'})
	    // 或者你可以在这里弹出一个开通会员的弹窗
	    console.log("Open Membership");
	}
	
	onMounted(async () => {
		// #ifdef MP-WEIXIN
		capsuleInfo()
		// #endif
	});
</script>

<style lang="scss" scoped>
	@import '@/common/css/mixins.scss';
		
	.top-nav {
		// background-image: url(../../static/uni-center/headers.png);
		position: relative;
		padding-bottom: 0;
		background-color: #f0ad4e;
		.user-info {
			@include flex-layout(between);
			.left {
				@include flex-layout(start);
				.logo-title {
					margin-left: 20rpx;
					.uer-name {
						color: #fff;
						font-size: $uni-font-size-xxl;
						font-weight: bold;
					}
					.not-logged-prompt {
						color: #fff;
						font-size: $uni-font-size-md;
					}
				}
			}
			.right {
				color: #fff;
			}
		}
		.stats-container {
			width: 100%;
			@include flex-layout(between, row);
			padding: 50rpx 0 130rpx;
			
			.stat-item {
				width: 24%; // 设置为固定的百分比宽度
				margin-right: 1%; // 添加间距
				@include flex-layout(center, column);
				
				.stat-number {
					font-size: 22px;
					font-weight: bold;
					color: #fff;
					margin-bottom: 5rpx;
				}
				
				.stat-description {
					font-size: 12px;
					color: #fff;
				}
			}
		}
		
		.membership-container {
			@include flex-layout(center, column);
			position: absolute;
			bottom: -60rpx; 
			left: 50%;
			transform: translateX(-50%);
			height: 160rpx;
			width: calc(100% - 30rpx);
		    background-color: #fff;
		    border-radius: 20rpx;
		    text-align: center;
		    text {
		        color: red;
		        font-size: $uni-font-size-md;
		        
		        &:last-child {
		            margin-top: 5rpx;
		        }
		    }
		}

	}
	
</style>
