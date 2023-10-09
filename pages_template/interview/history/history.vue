<template>
	<z-paging ref="paging" v-model="interviewsList" @query="queryList">
		<template #top>
			<!-- 标题和筛选按钮 -->
			<view class="padding-md">
				<u-search placeholder="请输入面试日期/面试职位" shape="round" :showAction="false" :disabled="true"
					@click="handleSearchInput"></u-search>
			</view>
		</template>
		<!-- 面试记录列表 -->
		<view class="card-list">
			<view v-for="interview in interviewsList" :key="interview.session_id" class="interview-card">
				<!-- 报告生成的状态显示 -->
				<view class="status-indicator">
					{{interview.status.is_feedback_generated ? '已生成' : '生成中'}}
				</view>

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
					<u-button type="primary" shape="circle" text="查看报告" size="small"
						@click="toViewReport(interview.session_id)"></u-button>
				</view>
			</view>
		</view>
	</z-paging>
</template>

<script lang="ts" setup>
	import { reactive, toRefs, computed, onMounted } from 'vue';
	import { fetchInterviews } from '@/api/interview';

	type PagingType = {
		complete : (rows : any[]) => void;
		// ... 其他你需要的属性和方法
	};
	const myData = reactive({
		paging: {
			complete: (rows : any[]) => {
				console.log("Completed with rows:", rows);
			}
			// ... 其他你需要的属性和方法
		} as PagingType,
		interviewsList: [] as Interviews[]
	})
	const {
		paging,
		interviewsList
	} = toRefs(myData);
	
	// 点击input事件
	const handleSearchInput = () => {

	};
	
	// 获取面试历史数据
	const fetchInterviewsApi = async (pageNo : number, pageSize : number) => {
		try {
			let params = {
				pageNo,
				pageSize
			}
			const res = await fetchInterviews(params);  // 假设您有一个叫 fetchInterviews 的函数与 API 交互
			interviewsList.value = res.rows || [];
			paging.value?.complete(res.rows);
		} catch (error) {
			console.error('Error during fetchInterviews:', error);
			// 可以在这里添加更多的错误处理逻辑，比如设置一个标志，让用户知道出现了错误
		}
	};

	// 计算面试持续时间
	const getDuration = (start : string, end : string) => {
		const startTime = new Date(start);
		const endTime = new Date(end);
		const durationMinutes = Math.round((endTime.getTime() - startTime.getTime()) / (1000 * 60));
		return durationMinutes;
	};
	
	// 跳转到面试报告详情页
	const toViewReport = (id : string) => {
		console.log("Viewing details for interview with ID:", id);
	};

	// @query所绑定的方法不要自己调用！！需要刷新列表数据时，只需要调用paging.value.reload()即可
	const queryList = (pageNo : number, pageSize : number) => {
		fetchInterviewsApi(pageNo, pageSize);
	}

	onMounted(() => {

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
			position: relative;

			.status-indicator {
				position: absolute;
				top: 0;
				right: 0;
				background-color: rgba(0, 0, 0, 0.7);
				color: #ffffff;
				padding: 6rpx 15rpx;
				font-size: 22rpx;
				border-radius: 0 20rpx 0 20rpx;
				z-index: 1;
			}

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