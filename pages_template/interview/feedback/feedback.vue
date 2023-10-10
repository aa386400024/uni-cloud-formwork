<template>
	<view class="container">
		{{params}}
		<view class="title-section">
			<text class="position-name">{{ position_name }}</text>
			<text class="industry-name">{{ industry_name }}</text>
		</view>
		<view v-for="(feedbackItem, index) in feedbacksList" :key="index" class="feedback-item">
			<view class="question-section">
				<text>{{ feedbackItem.question }}</text>
			</view>
			<video :src="answers[index].video_url" controls></video>
			<view class="user-answer-section">
				<text>{{ feedbackItem.userAnswer }}</text>
			</view>
			<view class="feedback-section">
				<text>{{ feedbackItem.feedback }}</text>
			</view>
			<view class="suggested-answer-section">
				<text>{{ feedbackItem.recommendedAnswer }}</text>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
	import { ref, reactive, toRefs, onMounted } from 'vue';
	import { onLoad } from "@dcloudio/uni-app";
	import { fetchIvFeedback } from '@/api/interview';
	
	interface ParamsType {
	    session_id?: string;  // 假设 session_id 是一个可选的字符串，您可以根据实际情况调整
	    // 其他可能的属性
	}

	const myData = reactive({
		params: {} as ParamsType,
		position_name: "前端开发工程师", // 从您的数据中获取
		industry_name: "互联网", // 从您的数据中获取
		feedbacksList: [
			// 从您的数据中获取
		],
		answers: [
			// 从您的数据中获取
		]
	})

	const { params, position_name, industry_name, feedbacksList, answers } = toRefs(myData);
	
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
	        params.value = JSON.parse(decodeURIComponent(option.params));
	    }
	    console.log("页面B onLoad:", params.value);
	});
	
	onMounted(() => {
	    fetchIvFeedbackApi(params.value.session_id)
	});
</script>

<style scoped>
	/* 你可以在这里添加 CSS 样式来匹配你的设计 */
	.container {
		/* 样式 */
	}

	.title-section {
		/* 样式 */
	}

	.position-name {
		/* 样式 */
	}

	.industry-name {
		/* 样式 */
	}

	.feedback-item {
		/* 样式 */
	}

	.question-section {
		/* 样式 */
	}

	.user-answer-section {
		/* 样式 */
	}

	.feedback-section {
		/* 样式 */
	}

	.suggested-answer-section {
		/* 样式 */
	}
</style>