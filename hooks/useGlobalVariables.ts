import { App } from 'vue';

const globalVariables = {
	gapHeight: '10px',
	gapBgcolor: '#fff',
	// 其他全局样式变量...
}

export default function provideGlobalVariables(app: App) {
	// 提供全局样式变量
	app.provide('globalVariables', globalVariables)
}
