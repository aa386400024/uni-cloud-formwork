import APIWrapper from '@/common/js/apiWrapper';
import config from '@/uni-starter.config.js';

export function setupGlobalMethodsAndVariables(appOrPrototype : any) {
	appOrPrototype.$myApi = new APIWrapper();
	appOrPrototype.$myConfig = config;
}