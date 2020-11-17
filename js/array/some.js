Array.prototype.myEvery = function(fn) {
	if(!this.length) return false
	
	for (let i=0;i<this.length;i++) {
		if(fn(this[i],i,this)) {
			return true
		}
	}
	return false
}
let arr = [3,6,8,10,15]

let arr1 = arr.myEvery((item,i,arr) => {
	// console.log(this)
	// console.log(item,i,arr)
	return item > 8
})
let arr2 = arr.some((item,i,arr) => {
	// console.log(this)
	// console.log(item,i,arr)
	return item > 8
})

console.log('arr1:', arr1)
console.log('arr2:', arr2)