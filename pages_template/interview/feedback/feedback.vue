<template>
	<view class="container">
		<view class="header-section">
			<u-image :show-loading="false" :src="headerSectionUrl" width="100%"></u-image>
			<text class="position-name">{{ interviewInfo.position_name }} - {{ interviewInfo.industry_name }}</text>
			<view class="info-box">
				<text class="info-item">用户名：张春龙</text>
				<text class="info-item">面试时间：{{ interviewInfo.interview_started_at }}</text>
				<text class="info-item">面试时长：2分钟11秒</text>
				<text class="info-item">面试难度：初级</text>
				<text class="info-item">面试风格：技术面试</text>
				<text class="info-item">评估技能：{{ interviewInfo.interview_skills.join('、') }}</text>
			</view>
		</view>
		{{interviewInfo}}
	</view>
</template>

<script setup lang="ts">
	import { reactive, toRefs, onMounted } from 'vue';
	import { onLoad } from "@dcloudio/uni-app";
	import { fetchIvFeedback } from '@/api/interview';

	interface interviewInfoType {
		session_id ?: string;
		position_name : string;
		industry_name : string;
	}

	const myData = reactive({
		interviewInfo: {} as interviewInfoType,
		headerSectionUrl: "https://mp-43f7552d-29af-4d0a-8672-7a2fcdd00dc7.cdn.bspapp.com/interview/feedback/feedback-header.png",
		feedbacksList: [
			// 从您的数据中获取
		],
		answers: [
			// 从您的数据中获取
		]
	})

	const { interviewInfo, headerSectionUrl, feedbacksList, answers } = toRefs(myData);

	// 获取面试反馈数据
	const fetchIvFeedbackApi = async (session_id : string) => {
		try {
			let params = {
				session_id
			}
			const res = await fetchIvFeedback(params);
			feedbacksList.value = res.rows || [];
		} catch (error) {
			console.error('Error during fetchIvHistory:', error);
			// 可以在这里添加更多的错误处理逻辑，比如设置一个标志，让用户知道出现了错误
		}
	};

	onLoad((option) => {
		if (option.params) {
			interviewInfo.value = JSON.parse(decodeURIComponent(option.params));
		}
	});

	onMounted(() => {
		if (interviewInfo.value.session_id) {
			fetchIvFeedbackApi(interviewInfo.value.session_id);
		}
	});
</script>

<style lang="scss" scoped>
	.container {
		.position-name {
			margin-top: 20rpx;
			padding: 10rpx;
			font-weight: bold;
		}

		.info-box {
			display: flex;
			flex-wrap: wrap;
			margin-top: 20rpx;
			border: 2rpx solid #e0e0e0;
			padding: 10rpx;
		}

		.info-item {
			flex: 1 0 50%; // 这样保证一行显示2个
			padding: 10rpx;
			font-size: 20rpx;
		}
	}
</style>

