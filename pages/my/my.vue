<template>
	<uni-sign-in ref="signIn"></uni-sign-in>
	<official-account v-if="showOfficial"></official-account>
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
		    <view class="stat-item" v-for="stat in statsList" :key="stat.id" @click="handleStatClick(stat)">
		        <text class="stat-number">{{ stat.number }}</text>
		        <text class="stat-description">{{ stat.description }}</text>
		    </view>
		</view>
		<view class="membership-container" @click="openMembership"></view>

	</view>
	<view class="page-container">
		<view class="card">
			<view class="card-item left-card border-radius-large margin-right-sm" @click="openInterviewHistory"></view>
			<view class="card-item right-card border-radius-large margin-left-sm" @click="handleShareAppBtn"></view>
		</view>
		<view class="grid border-radius-large">
			<text class="title-h2 margin-left-xl">常用功能</text>
			<u-grid
				:border="false"
			>
				<u-grid-item
					v-for="(item, index) in gridList"
					:key="index"
					@click="handleGridClick(item)"
				>
					<u-icon
						:customStyle="{paddingTop:20+'rpx'}"
						:name="item.name"
						:size="22"
					></u-icon>
					<text class="grid-text">{{item.title}}</text>
				</u-grid-item>
			</u-grid>
		</view>
		
		  
	</view>
</template>

<script lang="ts" setup>
	import { onMounted, reactive, toRefs, computed } from 'vue';
	import { store as storeOriginal, mutations } from '@/uni_modules/uni-id-pages/common/store.js';
	const myData = reactive({
		offsetTop: 0,
		statsList: [
			{ id: 1, number: 10, description: '面试次数' },
			{ id: 2, number: 85, description: '平均得分' },
			{ id: 3, number: 5, description: '连续学习' },
			{ id: 4, number: 3, description: '邀请好友' }
		],
		showOfficial: false,
		gridList: [
			{
				name: 'photo',
				title: '公众号'
			},
			{
				name: 'lock',
				title: '交流群'
			},
			{
				name: 'star',
				title: '简历诊断'
			},
			{
				name: 'star',
				title: '每日签到'
			},
			{
				name: 'hourglass',
				title: '面试日记'
			},
			{
				name: 'hourglass',
				title: '新手指南'
			},
			{
				name: 'hourglass',
				title: '联系客服'
			},
			{
				name: 'home',
				title: '意见反馈'
			},
			{
				name: 'star',
				title: '系统设置'
			},
		],
	})
	const { offsetTop, statsList, gridList, showOfficial } = toRefs(myData)
	const { userInfo, hasLogin } = toRefs(storeOriginal);
	
	// 微信小程序获取胶囊区域距离顶部的位置
	const capsuleInfo = () => {
		const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
		const systemInfo = uni.getSystemInfoSync() || {};
		const capsuleHeight = menuButtonInfo.height;
		offsetTop.value = systemInfo.statusBarHeight! + capsuleHeight + 2
	}
	
	// 点击统计事件
	const handleStatClick = (stat: Stat) => {
		console.log('Clicked on:', stat.description);
		// 在这里，你可以根据点击的统计项执行其他操作，例如导航到另一个页面、显示详细信息等。
	}
	
	// 点击九宫格事件
	const handleGridClick = (grid: Grid) => {
		console.log(`点击了第${grid.name}个`);
		if (grid.title === '公众号') {
			showOfficial.value = true;
		}
	}
	
	// 前往会员开通页
	const openMembership = () => {
		vk.navigateTo('/pages_template/extras/vip/vip');
	}
	
	// 前往面试历史页
	const openInterviewHistory = () => {
		vk.navigateTo('/pages_template/interview/history/history');
	}
	
	// 点击分享应用按钮
	const handleShareAppBtn = () => {
		
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
			width: calc(100% - 40rpx);
		    background-color: #f3f3f3; /* 可以使用任何颜色值 */
		    background: url('https://mp-43f7552d-29af-4d0a-8672-7a2fcdd00dc7.cdn.bspapp.com/interview/activate_member.png') no-repeat center center / cover;
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
	.card {
		@include flex-layout(between, row);
		margin-top: 60rpx !important;
		.card-item {
			height: 150rpx;
			width: 50%;
			background-color: #fff;
		}
		.left-card {
			background-color: #fff; /* 可以使用任何颜色值 */
			background: url('https://mp-43f7552d-29af-4d0a-8672-7a2fcdd00dc7.cdn.bspapp.com/interview/iv_history.png') no-repeat center center / cover;
		}
		.right-card {
			background-color: #fff; /* 可以使用任何颜色值 */
			background: url('https://mp-43f7552d-29af-4d0a-8672-7a2fcdd00dc7.cdn.bspapp.com/interview/share_app.png') no-repeat center center / cover;
		}
	}
	.grid {
		margin-top: 20rpx !important;
		padding: 30rpx 0 40rpx;
		background-color: #fff;
		::v-deep .u-grid-item {
			margin: 15rpx 0;
		}
		.grid-text {
			margin-top: 10rpx;
			font-size: $uni-font-size-md;
		}
	}
	
</style>
