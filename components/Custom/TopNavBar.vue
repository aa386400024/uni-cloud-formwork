<template>
	<view v-if="iShow">
		<view class="use-navbar w-full pos-t-full" style="padding-bottom: 6px;"
			:style="{ background: bgColor, opacity: bgOpacity }"
			:class="{ fixed: fixed, 'bg-main': type == 'white', 'bg-drak': type == 'gray' }">
			<view class="w-full" :style="{ height: menuButtonInfo.top + 'px' }"></view>

			<!-- 头部导航 -->
			<view class="dflex-b border-radius-lg padding-lr w-full use-hover"
				:style="{ height: navbarTitleHeight + 'px' }">
				<view class="wpre-30 dflex">
					<view v-if="back" class="iconfont fwbd" :class="leftIconfont" @click="toback"></view>
					<block v-else>
						<slot name="left" />
					</block>
				</view>
				<view>
					<block v-if="type == 'custom'">
						<slot />
					</block>
					<block v-else>
						<text class="fwbd fs">{{ apptitle }}</text>
					</block>
				</view>
				<view class="wpre-30">
					<slot name="right" />
				</view>
			</view>
		</view>

		<!-- 头部组件占位符 -->
		<view v-if="fixed && placeholder" :style="{ height: navbarHeight + 'px' }"></view>
	</view>
</template>

<script lang="ts" setup>
	import { ref, watch, computed, onMounted, toRaw } from 'vue'
	import { useGlobalAPI } from '@/hooks/useGlobalAPI'
	const { apiWrapper, config } = useGlobalAPI()
	const props = defineProps({
		fixed: {
			type: [Number, Boolean],
			default: true,
		},
		placeholder: {
			type: [Number, Boolean],
			default: true,
		},
		back: {
			type: Boolean,
			default: true,
		},
		title: {
			type: String,
			default: '',
		},
		type: {
			type: String,
			default: 'gray',
		},
		leftIcon: {
			type: String,
			default: 'iconfanhui',
		},
		bgColor: {
			type: String,
			default: '#f5f5f5',
		},
		bgOpacity: {
			type: Number,
			default: 0.97,
		},
		show: {
			type: Boolean,
			default: null,
		},
	})

	let apptitle = ref('')
	apptitle.value = props.title || config.about.appName

	const menuButtonInfo = computed(() => apiWrapper.navbar)
	const navbarTitleHeight = computed(() => apiWrapper.navbar.height)
	const navbarHeight = computed(() => {
		if (iShow.value) {
			return apiWrapper.navbar.height + 12
		}

		return 0
	})

	const leftIconfont = computed(() => {
		const pageArrs = getCurrentPages();
		if (!pageArrs.length) return ''
		const lastPage = pageArrs[pageArrs.length - 1];
		if (lastPage && lastPage.route && lastPage.route.indexOf('/tabbar/') !== -1) {
			return ''
		}

		if (pageArrs.length < 2) {
			return 'iconshouye- fs-xl'
		}

		return props.leftIcon
	})



	// For config, you should have a composition function or just import it from the file
	// const config = computed(() => getConfig())

	const iShow = computed(() => {

		return props.show !== null ? props.show : config.about.navbar == 'custom'
	})

	function toback() {
		if (getCurrentPages().length < 2) {
			// apiWrapper.tohome()
			return
		}

		uni.navigateBack({
			delta: 1,
		})
	}
</script>

<style lang="scss" scoped>
	.use-navbar-placeholder {
		min-height: 44px;
	}

	.use-navbar {
		min-height: 44px;
		z-index: 99999;
	}

	.use-search {
		height: 70rpx;
		line-height: 70rpx;

		text {
			color: #c0c0c0;
		}

		.iconfont {
			// font-size: $font-base + 6upx;
			color: #c0c0c0;
		}
	}
</style>