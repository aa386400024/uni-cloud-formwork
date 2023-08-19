import { defineStore } from 'pinia'

interface interviewState {
	flowNavTitle: string
}

export const useInterviewStore = defineStore('interview', {
	state: (): interviewState => {
		return { flowNavTitle: '' } // 初始化 flowNavTitle
	},
	actions: {
		increment(this: interviewState): void {},
	},
})

// 定义需要持久化的状态键
export const interviewPersistStateKeys = [{ storeId: 'interview', key: 'flowNavTitle' }]
