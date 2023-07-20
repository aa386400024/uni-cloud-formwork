export function setupGlobalMethodsAndVariables(appOrPrototype : any) {
	appOrPrototype.$myMethod = function () {
		console.log('This is a global method.')
	}
	console.log(appOrPrototype, 'appOrPrototype');
	appOrPrototype.$myVariable = 'This is a global variable.'
}