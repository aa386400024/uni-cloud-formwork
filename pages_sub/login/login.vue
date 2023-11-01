<template>
	<view>
		<u-toast ref="uToastRef" position="top"></u-toast>
		<view class="header-container">
			<view class="header-content">
				<view class="header-title">面试无忧</view>
				<view class="header-subtitle">锦程与你同行</view>
			</view>
		</view>
		<view class="login-sections padding-xl">
			<view class="form-view">
				<view class="form-item username">
					<u-input clearable placeholder="请输入您的用户名/手机号" border="surround" shape="circle"
						placeholderStyle="font-size: 16px;" maxlength="30" :customStyle="customStyle"
						v-model="loginForm.username"></u-input>
				</view>
				<view class="form-item password">
					<u-input clearable placeholder="请输入您的密码" border="surround" type="password" shape="circle"
						placeholderStyle="font-size: 16px;" maxlength="30" :customStyle="customStyle"
						v-model="loginForm.password"></u-input>
				</view>
			</view>
			<view class="additional-actions">
				<view class="action-item" @click="goToRegister">
					<text class="iconfont icon-zhuce"> 去注册</text>
				</view>
				<view class="action-item" @click="resetPassword">
					<text class="iconfont icon-tianchongxing-"> 忘记密码</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts" setup>
	import { reactive, toRefs, ref, onMounted, computed } from 'vue';

	const myData = reactive({
		loginForm: {
			username: "",
			password: ""
		},
		customStyle: {
			height: "50px",
			paddingLeft: "20px",
		}
	})

	const { loginForm, customStyle } = toRefs(myData);
	
	// 跳转到注册页
	const goToRegister = () => {
		uni.navigateTo({
			url: '/pages_sub/register/register'
		})
	}
	
	// 跳转到忘记密码页
	const resetPassword = () => {
		uni.navigateTo({
			url: '/pages_sub/reset-password/reset-password'
		})
	}
</script>

<style lang="scss" scoped>
	.header-container {
		width: 100%;
		height: 450rpx;
		background-color: #ccc;
		position: relative;

		.header-content {
			position: absolute;
			bottom: 60rpx;
			left: 60rpx;
			font-size: 40rpx;
			font-weight: bold;
			color: $uni-text-color;

			.header-title {
				margin-bottom: 20rpx;
			}

			.header-subtitle {
				// 一些关于 header-subtitle 的样式
			}
		}
	}

	.login-sections {
		.form-view {
			.form-item {
				margin-bottom: 40rpx;

			}
		}
	}

	.additional-actions {
		display: flex;
		justify-content: space-between;
		margin-top: 20rpx;

		.action-item {
			display: flex;
			align-items: center;
			color: $uni-text-color-grey;
			font-size: 16px;

			.icon-zhuce, .icon-tianchongxing- {
				
			}
		}
	}
</style>