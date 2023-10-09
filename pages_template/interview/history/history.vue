<template>
	<view>
		<!-- 标题和筛选按钮 -->
		<view class="padding-md">
			<u-search placeholder="请输入面试日期/面试职位" shape="round" :showAction="false" :disabled="true"
				@click="handleSearchInput"></u-search>
		</view>

		<!-- 面试记录列表 -->
		<view class="card-list">
			<view v-for="interview in interviews" :key="interview.session_id" class="interview-card">
				<view class="left-content">
					<view class="card-title-wrapper">
						<text class="card-title">{{ interview.position_name }}</text>
					</view>
					<view class="info-text-wrapper">
						<text class="info-text">面试时间: {{ interview.interview_started_at }}</text>
					</view>
					<view class="info-text-wrapper">
						<text class="info-text">持续时间:
							{{ getDuration(interview.interview_started_at, interview.interview_ended_at) }} 分钟</text>
					</view>
				</view>
				<view>
					<u-button 
						type="primary" 
						shape="circle" 
						text="查看报告"
						size="small"
						@click="toViewReport(interview.session_id)" 
					></u-button>
				</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts" setup>
	import { ref, reactive, toRefs, computed, onMounted } from 'vue';
	import { fetchInterviews } from '@/api/interview';

	const myData = reactive({
		interviews: [] as interviews[]
	})
	const {
		interviews
	} = toRefs(myData);

	const handleSearchInput = () => {

	};

	const fetchInterviewsApi = async () => {
		try {
			const res = await fetchInterviews();  // 假设您有一个叫 fetchInterviews 的函数与 API 交互
			interviews.value = res.rows || [];
		} catch (error) {
			console.error('Error during fetchInterviews:', error);
			// 可以在这里添加更多的错误处理逻辑，比如设置一个标志，让用户知道出现了错误
		}
	};

	const getDuration = (start : string, end : string) => {
		const startTime = new Date(start);
		const endTime = new Date(end);
		const durationMinutes = Math.round((endTime.getTime() - startTime.getTime()) / (1000 * 60));
		return durationMinutes;
	};

	const toViewReport = (id : string) => {
		console.log("Viewing details for interview with ID:", id);
	};

	onMounted(() => {
		fetchInterviewsApi(); // 当组件加载时调用 API
	});
</script>

<style lang="scss">
	.card-list {
		padding: 10rpx 20rpx;

		.interview-card {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 30rpx;
			margin-bottom: 24rpx;
			background-color: #ffffff;
			border: 2rpx solid #e5e5e5;
			border-radius: 20rpx;
			box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.1);

			.left-content {
				flex: 1;
				margin-right: 20rpx;

				.card-title-wrapper,
				.info-text-wrapper {
					display: block;
				}

				.card-title {
					font-size: 36rpx;
					font-weight: bold;
					color: #333;
					display: block;
					margin-bottom: 20rpx;
				}

				.info-text {
					font-size: 26rpx;
					color: #777;
					display: block;
					margin-bottom: 14rpx;

					&::before {
						content: '';
						display: inline-block;
						width: 26rpx;
						height: 26rpx;
						margin-right: 16rpx;
						background-size: contain;
					}
				}
			}
		}
	}
</style>