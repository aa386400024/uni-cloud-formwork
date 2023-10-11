import type { Uni as _Uni } from '@dcloudio/types';

declare global {
	/**
	* 拓展全局变量Uni
	*/
	interface Uni extends _Uni {
		vk : {
			// 添加泛型参数
			callFunction<TReq, TRes>(options : {
				url : string;
				title ?: string;
				data : TReq;
				loading ?: boolean | object;
				success : (data : TRes) => void;
				fail(error : any) : void;
			}) : void;
		};
	}
	var vk : {
		navigateTo(url : string) : void;
		pubfn : {
			timeFormat(date : Date | string | number, format : string) : string;
			// ...如果pubfn还有其他方法或属性，也可以在这里添加
		};
		// ...其他方法和属性
	};
}