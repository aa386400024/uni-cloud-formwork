// api/interview/index.ts

import { request, RequestOptions } from '@/utils/api/request'

// 行业数据接口
export async function fetchInterviews(data: IvHsitory): Promise<any> {
	const options: RequestOptions = {
		url: 'client/interview/kh/ivHistoryList',
		cloudFunction: true,
		title: '请求中...',
		data
	}
	const response = await request(options)
	return response.data
}