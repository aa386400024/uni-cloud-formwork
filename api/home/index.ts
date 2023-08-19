// api/home/index.ts

import { request, RequestOptions } from '@/utils/api/request'

// 行业数据接口
export async function fetchIndustries(): Promise<any> {
	const options: RequestOptions = {
		url: 'client/industries/pub/getList',
		cloudFunction: true,
		loading: false,
	}
	const response = await request(options)
	return response.data
}

// 职位数据接口
export async function fetchPositions(data: any): Promise<any> {
	const options: RequestOptions = {
		url: 'client/positions/pub/getList',
		data,
		cloudFunction: true,
		title: '请求中...'
	}
	const response = await request(options)
	return response.data
}