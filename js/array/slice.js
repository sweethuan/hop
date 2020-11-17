Array.prototype.mySlice = function() {
	// if(!arguments.length) return this
	/* start ? start = start : start = 0
	end ? end = end : end = this.length
	end > this.length ? end = this.length  : end = end */
	
	let start = arguments[0] || 0
	let end = arguments[1] || this.length
	end > this.length ? end = this.length  : end = end
	
	let temp = []
	for (start;start<end;start++) {
		temp[temp.length] = this[start]
	}
	return temp
}
let arr = [3,6,8,10,15]

let arr1 = arr.mySlice(2,10)
console.log('arr1:', arr1)

let arr2 = arr.slice(2,10)
console.log('arr2:', arr2)
// console.log('arr:', arr)