import Vue from 'vue';

declare module 'vue/types/vue' {
	interface Vue {
		$u : {
			os() : string;
			guid() : string;
			platform : string;
			toast(message : string) : void;
			// ...其它可能的方法和属性
		};
	}
}