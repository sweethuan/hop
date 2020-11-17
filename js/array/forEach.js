Array.prototype.myForEach = function(fn) {
	for (let i=0;i<this.length;i++) {
		fn(this[i],i,this)
	}
}
let arr = [3,6,8,10,15]
let arr5 = []
let arr6 = []
let arr1 = arr.myForEach((item,i,arr) => {
	// console.log(this)
	// console.log(item,i,arr)
	arr5.push(item + 8)
})
let arr2 = arr.forEach((item,i,arr) => {
	// console.log(this)
	// console.log(item,i,arr)
	
	arr6.push(item + 8)
})

console.log('arr5:', arr5)
console.log('arr6:', arr6)
console.log('arr:', arr)