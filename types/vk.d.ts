import type { Uni as _Uni } from '@dcloudio/types';

declare global {
	/**
	* 拓展全局变量Uni
	*/
	interface Uni extends _Uni {
		vk: {
			// 添加泛型参数
			callFunction<TReq, TRes>(options: {
				url: string;
				title?: string;
				data: TReq;
				success: (data: TRes) => void;
				fail(error: any): void;
			}): void;
		};
	}
}
