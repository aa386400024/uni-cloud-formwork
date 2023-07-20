import { ComponentCustomProperties } from 'vue'
declare global {
  namespace NodeJS {
    interface Global {
      uniEnv: {
        ENV: string;
        TIMEOUT: number;
        BASE_URL: string;
        STORAGE_KEY: string;
      };
      vk: {
        callFunction<TData = any, TResponse = any>(options: {
          url: string,
          title: string,
          data: TData,
          success: (data: TResponse) => void
        }): void;
        // 在这里添加其他需要的函数和方法
      };
    }
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $myApi: typeof import('@/common/js/apiWrapper').default; // 调整为你实际的路径和类型
	$myConfig: typeof import('@/uni-starter.config').default;
  }
}

export {};
