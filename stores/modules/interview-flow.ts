import { defineStore } from 'pinia'

interface interviewState {
	currentJobInfo: {
		name?: string,
		position_id?: string
	}
}

export const useInterviewStore = defineStore('interview', {
	state: (): interviewState => {
		return { currentJobInfo: {} } // 初始化 currentJobInfo
	},
	actions: {
		increment(this: interviewState): void {},
	},
})

// 定义需要持久化的状态键
export const interviewPersistStateKeys = [{ storeId: 'interview', key: 'currentJobInfo' }]
