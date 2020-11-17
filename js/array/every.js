Array.prototype.myEvery = function(fn) {
	let flag = false
	if(!this.length) return true
	for (let i=0;i<this.length;i++) {
		if(fn(this[i],i,this)) {
			flag = true
		}else {
			return false
		}
	}
	return flag
}
let arr = [3,6,8,10,15]

let arr1 = arr.myEvery((item,i,arr) => {
	// console.log(this)
	// console.log(item,i,arr)
	return item > 8
})
let arr2 = arr.every((item,i,arr) => {
	// console.log(this)
	//console.log(item,i,arr)
	return item > 8
})

console.log('arr1:', arr1)
console.log('arr2:', arr2)