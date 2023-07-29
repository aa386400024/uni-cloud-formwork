// api/home/index.ts

import { request, RequestOptions } from '@/utils/api/request'

// 下面是使用了cloud的方式的封装
export async function fetchIndustries(): Promise<any> {
	const options: RequestOptions = {
		url: 'client/industries/pub/getList',
		cloudFunction: true,
	}
	const response = await request(options)
	return response.data
}

export async function fetchPositions(data: any): Promise<any> {
	const options: RequestOptions = {
		url: 'client/positions/pub/getList',
		data,
		cloudFunction: true,
	}
	const response = await request(options)
	return response.data
}