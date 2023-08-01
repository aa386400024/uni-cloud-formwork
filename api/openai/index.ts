// api/open/index.ts

import { request, RequestOptions } from '@/utils/api/request'

export async function completions(data: any): Promise<any> {
	const options: RequestOptions = {
		url: '/v1/chat/completions',
		method: 'POST',
		headers: {
			'Authorization': 'Bearer sk-PS3wc3mAs3FleXwLWjnvmnhqNXqzIbVwhGFuYpQx4gBplJdF', // replace with your actual OpenAI API key
			'Content-Type': 'application/json'
		},
		data,
		cloudFunction: false,
	}
	const response = await request(options)
	return response.data
}