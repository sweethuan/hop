let obj = {
	name: 'jack Ma',
	age: 58,
	hobbie: ['唱', '跳', 'rap', '篮球'],
	gender: [{
		mide: 'nan',
		heigth: 180
	}, {
		mide: 'nv',
		heigth: 160
	}]
}

let ad = 'sf'

// function deepClone(target) {
// 	if (typeof target === 'object') {
// 		let cloneTarget = Array.isArray(target) ? [] : {}
// 		for (const key in target) {
// 			cloneTarget[key] = deepClone(target[key])
// 		return cloneTarget
// 	} else {
// 		return target
// 	}
// }
let a = deepClone(obj)
//console.log(a)

function deepClone(target) {
	if (typeof target === 'object') {
		let cloneTarget = Array.isArray(target) ? [] : {}
		for (let key in target) {
			cloneTarget[key] = deepClone(target[key])
		}
		return cloneTarget
	} else {
		return target
	}
}

