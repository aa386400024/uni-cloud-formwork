'use strict'

let menuButtonInfo = {
	top: 6,
	width: 0,
	height: 30,
}
// #ifdef MP-WEIXIN
// 获取微信小程序的菜单按钮位置信息
menuButtonInfo = uni.getMenuButtonBoundingClientRect()
// #endif

// #ifdef H5
// H5平台的菜单按钮位置信息
menuButtonInfo.top = 6
// #endif

// #ifdef H5-WEIXIN
// 微信H5平台的菜单按钮位置信息
menuButtonInfo.top = 6
// #endif

console.log(menuButtonInfo, 'menuButtonInfo')

class APIWrapper {
	// 明确声明类属性
	navbar: typeof menuButtonInfo
	menuButtonInfo: typeof menuButtonInfo
	navbarTitleHeight: number
	navbarHeight: number

	constructor() {
		this.navbar = menuButtonInfo // 导航栏信息
		this.menuButtonInfo = menuButtonInfo // 菜单按钮信息
		this.navbarTitleHeight = menuButtonInfo.height // 导航栏标题高度
		this.navbarHeight = menuButtonInfo.top + menuButtonInfo.height + 6 // 导航栏总高度

		console.log('menuButtonInfo', menuButtonInfo)
	}

	// 获取本地存储的数据
	getStorageSync(key: string) {
		console.log('sdsdsd')
		return uni.getStorageSync(key)
	}

	// 设置本地存储的数据
	setStorageSync(key: string, data: any) {
		return uni.setStorageSync(key, data)
	}

	// 清空本地存储的数据
	clearStorageSync() {
		return uni.clearStorageSync()
	}

	// 移除本地存储的某个数据
	removeStorageSync(key: string) {
		return uni.removeStorageSync(key)
	}

	// 创建选择器查询对象
	createSelectorQuery() {
		return uni.createSelectorQuery()
	}
}

export default APIWrapper
