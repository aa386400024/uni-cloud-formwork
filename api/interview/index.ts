// api/interview/index.ts

import { request, RequestOptions } from '@/utils/api/request'

// 行业数据接口
export async function fetchInterviews(): Promise<any> {
	const options: RequestOptions = {
		url: 'client/interview/kh/ivHistoryList',
		cloudFunction: true,
		title: '请求中...'
	}
	const response = await request(options)
	return response.data
}