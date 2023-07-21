// hooks/useGlobalAPI.ts
import APIWrapper from '@/common/js/apiWrapper'
import config from '@/uni-starter.config'

export function useGlobalAPI() {
	const apiWrapper = new APIWrapper()
	return {
		apiWrapper, // 这样你就可以在组件中使用 APIWrapper 的所有方法
		config, // 这样你就可以在组件中使用配置信息
	}
}
