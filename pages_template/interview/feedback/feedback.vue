<template>
	<view class="container">
		<view class="header-section">
			<image class="image-container" mode="widthFix" :src="headerSectionUrl"></image>
			<view class="header-content">
				<text class="position-name">{{ interviewInfo.position_name }} - {{ interviewInfo.industry_name }}</text>
				<view class="info-box">
					<view class="info-item" v-for="(item, index) in infoItems" :key="index">
						<view class="info-content">
							<!-- <image src="/path/to/your/icon.png" class="info-icon" /> -->
							<view class="text-content">
								<text class="label">{{ item.label }}</text>
								<text class="value">{{ item.value }}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		{{interviewInfo}}
	</view>
</template>

<script setup lang="ts">
	import { reactive, toRefs, onMounted, computed } from 'vue';
	import { onLoad } from "@dcloudio/uni-app";
	import { fetchIvFeedback } from '@/api/interview';

	interface interviewInfoType {
		session_id?: string;
		position_name: string;
		industry_name: string;
		interview_started_at: string;
		interview_ended_at: string;
		interview_duration: string;
		interview_level_name: string;
		interview_style_name: string;
	}

	const myData = reactive({
		interviewInfo: {} as interviewInfoType,
		headerSectionUrl: "https://mp-43f7552d-29af-4d0a-8672-7a2fcdd00dc7.cdn.bspapp.com/interview/feedback/feedback-header-report.png",
		feedbacksList: [
			// 从您的数据中获取
		],
	})

	const { interviewInfo, headerSectionUrl, feedbacksList } = toRefs(myData);

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

	const infoItems = computed(() => {
		return [
			{ label: '面试时间', value: interviewInfo.value.interview_started_at },
			{ label: '面试时长', value: interviewInfo.value.interview_duration },
			{ label: '面试难度', value: interviewInfo.value.interview_level_name },
			{ label: '面试风格', value: interviewInfo.value.interview_style_name }
		];
	});

	onLoad((option: any) => {
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
		height: 100%;
		background-color: #8084FA;

		.header-section {
			position: relative;
			align-items: flex-start;

			.image-container {
				width: 100%;
				background-color: #eeeeee;
			}

			.header-content {
				position: absolute;
				left: 0;
				right: 0;
				bottom: 40rpx;

				.position-name {
					margin-top: 20rpx;
					padding: 0 20rpx;
					font-weight: bold;
					color: #fff;
				}

				.info-box {
					display: flex;
					flex-wrap: wrap;
					margin: 10rpx;
				}

				.info-item {
					flex: 1 0 42%; // 这样保证一行显示2个
					padding: 16rpx 20rpx;
					margin: 10rpx;
					font-size: 20rpx;
					display: flex;
					flex-direction: column; // 设置为列方向，使文本显示在不同的行上
					// border: 2rpx solid #fff;
					background-color: rgba(202, 215, 255, 0.3);
					border-radius: 14rpx;
					color: #fff;

					.info-content {
						display: flex;
						align-items: flex-start; // 这将使图标和文本内容顶部对齐
					}

					.text-content {
						display: flex;
						flex-direction: column;
					}

					.info-icon {
						width: 20rpx; // 或者您想要的任何大小
						height: 20rpx; // 或者您想要的任何大小
						margin-right: 10rpx; // 这将在图标和文本之间添加一些空间
					}
				}
			}
		}
	}
</style>