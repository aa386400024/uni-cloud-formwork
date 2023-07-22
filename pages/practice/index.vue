<template>
	<view class="page-container">
		<u-navbar
			class="navbar"
			:placeholder="true"
		>
			<template #left>
				<view>
					<u--input
						placeholder="请输入内容"
						border="surround"
					></u--input>
				</view>
			</template>
		</u-navbar>
		<text>Count: {{ count }}</text>
		<text>Double Count: {{ doubleCount }}</text>
		<button @tap="increment">Increment</button>
		<button @click="incrementApi">Increment</button>
		<text>API Result: {{ apiResult }}</text>
	</view>
</template>

<script lang="ts" setup>
	import { computed, onMounted, ref } from 'vue';
	import { useCounterStore } from '@/stores';
	import { todos } from '@/api';
	import { fetchTodosCloud } from '@/api/todos';
	import { useGlobalAPI } from '@/hooks/useGlobalAPI'
	const { apiWrapper, config } = useGlobalAPI()
	
	const apiResult = ref(null);
	const incrementApi = async () => {
		try {
			const response = await fetchTodosCloud();
			apiResult.value = response;
			console.log(apiResult.value, 'responseresponseresponse');
		} catch (error) {
			console.error('Error during fetchTodosCloud:', error);
			// 可以在这里添加更多的错误处理逻辑，比如设置一个标志，让用户知道出现了错误
		}
	};
	
	const rightClick = () => {
		
	} 
	const navbarRect = () => {
		const selector = '.navbar';
		apiWrapper.getBoundingRect(selector, (res) => {
			// 在这里处理位置信息，可以使用res.left, res.top, res.width, res.height等属性
			console.log('Element position:', res);
		}); 
	} 

	// import { useRouter } from 'uni-mini-router'

	// let router = useRouter()
	// console.log(router, 'routerrouter')

	const counterStore = useCounterStore();

	const count = computed(() => counterStore.count);
	const doubleCount = computed(() => counterStore.doubleCount);
	const increment = counterStore.increment;


	onMounted(async () => {
		navbarRect()
		const todoList = await todos.fetchTodos();
	});
</script>